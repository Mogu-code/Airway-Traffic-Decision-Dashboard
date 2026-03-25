
const OpenSky = (() => {
  const OPENSKY_USER = '';   // e.g. 'your_username'
  const OPENSKY_PASS = '';   // e.g. 'your_password'
  const POLL_INTERVAL = 60000;

  // ── AIRPORT BOUNDING BOXES ─────────────────────────────────
  // Each box covers the airport + ~80km radius to catch approach/departure
  const AIRPORT_BOUNDS = {
    DEL: { lamin: 27.8,  lomin: 76.3,  lamax: 29.3,  lomax: 77.9  },
    BOM: { lamin: 18.3,  lomin: 72.1,  lamax: 19.8,  lomax: 73.6  },
    BLR: { lamin: 12.4,  lomin: 77.0,  lamax: 13.9,  lomax: 78.5  },
    MAA: { lamin: 12.2,  lomin: 79.5,  lamax: 13.7,  lomax: 81.0  },
    CCU: { lamin: 21.9,  lomin: 87.7,  lamax: 23.4,  lomax: 89.2  },
  };

  // ── INTERNAL STATE ─────────────────────────────────────────
  let _cache     = {};       // { airportCode: { states, ts } }
  let _listeners = [];       // callbacks registered via .onUpdate()
  let _pollTimer = null;
  let _isPolling = false;
  let _requestsToday = 0;
  const MAX_DAILY = OPENSKY_USER ? 4000 : 400;

  // ── OPENSKY STATE VECTOR FIELD INDICES ────────────────────
  // From: https://opensky-network.org/apidoc/rest.html
  const F = {
    icao24:    0,
    callsign:  1,
    origin:    2,
    time_pos:  3,
    last_contact: 4,
    lon:       5,
    lat:       6,
    baro_alt:  7,  // metres
    on_ground: 8,
    velocity:  9,  // m/s
    true_track:10, // degrees
    vertical_rate: 11,
    sensors:   12,
    geo_alt:   13,
    squawk:    14,
    spi:       15,
    pos_src:   16,
  };

  // ── BUILD API URL ──────────────────────────────────────────
  function buildUrl(bounds) {
    const base = 'https://opensky-network.org/api/states/all';
    const params = new URLSearchParams({
      lamin: bounds.lamin,
      lomin: bounds.lomin,
      lamax: bounds.lamax,
      lomax: bounds.lomax,
    });
    if (OPENSKY_USER && OPENSKY_PASS) {
      // Basic auth via URL for browser fetch (works for HTTP; see note below)
      return `https://${OPENSKY_USER}:${OPENSKY_PASS}@opensky-network.org/api/states/all?${params}`;
    }
    return `${base}?${params}`;
  }

  // ── FETCH ONE AIRPORT'S FLIGHTS ────────────────────────────
  async function fetchAirport(code) {
    if (_requestsToday >= MAX_DAILY) {
      console.warn(`[OpenSky] Daily limit reached (${MAX_DAILY}). Using cached data.`);
      return null;
    }

    const bounds = AIRPORT_BOUNDS[code];
    if (!bounds) return null;

    try {
      const res = await fetch(buildUrl(bounds), {
        headers: OPENSKY_USER ? {
          'Authorization': 'Basic ' + btoa(`${OPENSKY_USER}:${OPENSKY_PASS}`)
        } : {}
      });

      if (res.status === 429) {
        console.warn('[OpenSky] Rate limited. Backing off 30s.');
        await new Promise(r => setTimeout(r, 30000));
        return null;
      }

      if (!res.ok) {
        console.warn(`[OpenSky] HTTP ${res.status} for ${code}`);
        return null;
      }

      _requestsToday++;
      const data = await res.json();
      return data.states || [];

    } catch (err) {
      console.warn(`[OpenSky] Fetch failed for ${code}:`, err.message);
      return null;
    }
  }

  // ── PARSE RAW STATE VECTOR → CLEAN OBJECT ─────────────────
  function parseState(sv) {
    if (!sv || sv[F.lat] == null || sv[F.lon] == null) return null;
    const altM  = sv[F.baro_alt] || sv[F.geo_alt] || 0;
    const altFt = Math.round(altM * 3.28084);
    const velMs = sv[F.velocity] || 0;
    const velKts = Math.round(velMs * 1.94384);

    return {
      icao24:    sv[F.icao24],
      callsign:  (sv[F.callsign] || '').trim() || sv[F.icao24],
      origin:    sv[F.origin],
      lat:       sv[F.lat],
      lon:       sv[F.lon],
      altitude:  altFt,
      speed:     velKts,
      heading:   sv[F.true_track] || 0,
      onGround:  sv[F.on_ground],
      vertical:  sv[F.vertical_rate] || 0,
      squawk:    sv[F.squawk],
      lastSeen:  sv[F.last_contact],
    };
  }

  // ── FETCH ALL 5 AIRPORTS IN SEQUENCE ──────────────────────
  // Sequential (not parallel) to avoid simultaneous rate-limit spikes
  async function fetchAll() {
    const codes = Object.keys(AIRPORT_BOUNDS);
    const results = {};
    let anyReal = false;

    for (const code of codes) {
      const raw = await fetchAirport(code);
      if (raw !== null) {
        const flights = raw.map(parseState).filter(Boolean);
        results[code] = { flights, ts: Date.now(), real: true };
        anyReal = true;
        // Small delay between requests to be polite to the API
        await new Promise(r => setTimeout(r, 800));
      } else {
        // Use cached or simulate
        results[code] = _cache[code] || { flights: simulate(code), ts: Date.now(), real: false };
      }
    }

    _cache = results;
    return { results, anyReal };
  }

  // ── SIMULATION FALLBACK ────────────────────────────────────
  // Generates realistic-looking flights when API is unavailable
  function simulate(code) {
    const ap = (typeof INDIAN_AIRPORTS !== 'undefined') ? INDIAN_AIRPORTS[code] : null;
    if (!ap) return [];

    const count = { DEL:28, BOM:22, BLR:16, MAA:12, CCU:10 }[code] || 15;
    const CALLSIGN_PREFIXES = ['6E','AI','SG','UK','G8','I5','EK','QR','SQ','LH'];
    const flights = [];

    for (let i = 0; i < count; i++) {
      const angle   = (Math.random() * 2 * Math.PI);
      const radius  = 0.2 + Math.random() * 1.2;
      const onGround = Math.random() < 0.15;
      const prefix  = CALLSIGN_PREFIXES[Math.floor(Math.random() * CALLSIGN_PREFIXES.length)];
      const num     = Math.floor(Math.random() * 9000) + 1000;

      flights.push({
        icao24:   Math.random().toString(16).substring(2, 8),
        callsign: `${prefix}${num}`,
        origin:   ['India', 'UAE', 'UK', 'Singapore', 'Thailand'][Math.floor(Math.random()*5)],
        lat:      ap.lat + Math.sin(angle) * radius,
        lon:      ap.lng + Math.cos(angle) * radius,
        altitude: onGround ? 0 : Math.floor(2000 + Math.random() * 38000),
        speed:    onGround ? 0 : Math.floor(160 + Math.random() * 320),
        heading:  Math.floor(Math.random() * 360),
        onGround,
        vertical: Math.random() > 0.5 ? Math.random() * 8 : -Math.random() * 8,
        squawk:   Math.floor(1000 + Math.random() * 8999),
        lastSeen: Math.floor(Date.now() / 1000),
        _simulated: true,
      });
    }
    return flights;
  }

  // ── PUBLIC API ─
  return {

    /**
     * Start polling. Calls all listeners with fresh data.
     * Call once on page load.
     */
    start() {
      const run = async () => {
        if (_isPolling) return;
        _isPolling = true;
        try {
          const { results, anyReal } = await fetchAll();
          _listeners.forEach(fn => fn(results, anyReal));
        } finally {
          _isPolling = false;
        }
      };

      run(); // immediate first fetch
      _pollTimer = setInterval(run, POLL_INTERVAL);
    },

    /** Stop polling */
    stop() {
      if (_pollTimer) clearInterval(_pollTimer);
      _pollTimer = null;
    },

    onUpdate(cb) {
      _listeners.push(cb);
    },

    /** Get latest cached data without waiting */
    getCached() {
      return _cache;
    },

    /** Get simulated data for a specific airport (useful for instant render) */
    simulate,

    /** Stats for status bar */
    stats() {
      return {
        requestsToday: _requestsToday,
        dailyLimit: MAX_DAILY,
        pct: Math.round(_requestsToday / MAX_DAILY * 100),
        authenticated: !!(OPENSKY_USER && OPENSKY_PASS),
      };
    },

    /**
     * Build live stats from cached results (used by predictor page)
     * Returns per-airport: { activeCount, groundCount, avgAlt, avgSpeed, airborne }
     */
    buildAirportStats(results) {
      const out = {};
      for (const [code, data] of Object.entries(results)) {
        const flights = data.flights || [];
        const airborne = flights.filter(f => !f.onGround && f.altitude > 100);
        const ground   = flights.filter(f => f.onGround);
        out[code] = {
          activeCount: flights.length,
          airborneCount: airborne.length,
          groundCount: ground.length,
          avgAlt:   airborne.length ? Math.round(airborne.reduce((s,f)=>s+f.altitude,0)/airborne.length) : 0,
          avgSpeed: airborne.length ? Math.round(airborne.reduce((s,f)=>s+f.speed,0)/airborne.length) : 0,
          flights,
          ts: data.ts,
          real: data.real,
        };
      }
      return out;
    },

    POLL_INTERVAL,
    AIRPORT_BOUNDS,
  };
})();
