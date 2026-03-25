// ============================================================
// SHARED INDIAN AIRPORT DATA - used uniformly across all pages
// 5 Real Indian Airports: DEL, BOM, BLR, MAA, CCU
// ============================================================

const INDIAN_AIRPORTS = {
  DEL: {
    code: 'DEL', iata: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'New Delhi', state: 'Delhi',
    lat: 28.5562, lng: 77.1000,
    runways: 3, terminals: 3,
    dailyFlights: 1247, capacity: 1400,
    activeFlights: 142,
    color: '#f97316'
  },
  BOM: {
    code: 'BOM', iata: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai', state: 'Maharashtra',
    lat: 19.0896, lng: 72.8656,
    runways: 2, terminals: 2,
    dailyFlights: 980, capacity: 1100,
    activeFlights: 118,
    color: '#3b82f6'
  },
  BLR: {
    code: 'BLR', iata: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bengaluru', state: 'Karnataka',
    lat: 13.1986, lng: 77.7066,
    runways: 2, terminals: 2,
    dailyFlights: 712, capacity: 850,
    activeFlights: 87,
    color: '#10b981'
  },
  MAA: {
    code: 'MAA', iata: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai', state: 'Tamil Nadu',
    lat: 12.9941, lng: 80.1709,
    runways: 2, terminals: 2,
    dailyFlights: 548, capacity: 700,
    activeFlights: 63,
    color: '#8b5cf6'
  },
  CCU: {
    code: 'CCU', iata: 'CCU',
    name: 'Netaji Subhas Chandra Bose International Airport',
    city: 'Kolkata', state: 'West Bengal',
    lat: 22.6520, lng: 88.4463,
    runways: 2, terminals: 2,
    dailyFlights: 420, capacity: 550,
    activeFlights: 51,
    color: '#ec4899'
  }
};

const AIRPORT_LIST = Object.values(INDIAN_AIRPORTS);

// Shared airlines operating in India
const AIRLINES = [
  { name: 'IndiGo', code: '6E', color: '#1a56db' },
  { name: 'Air India', code: 'AI', color: '#e63946' },
  { name: 'SpiceJet', code: 'SG', color: '#ff6b35' },
  { name: 'Vistara', code: 'UK', color: '#5c6bc0' },
  { name: 'GoFirst', code: 'G8', color: '#2ecc71' },
  { name: 'AirAsia India', code: 'I5', color: '#e74c3c' }
];

// Hourly traffic pattern (same for all pages - Indian peak hours)
const HOURLY_TRAFFIC = [
  { hour: '00:00', volume: 0.3 }, { hour: '01:00', volume: 0.2 },
  { hour: '02:00', volume: 0.1 }, { hour: '03:00', volume: 0.1 },
  { hour: '04:00', volume: 0.2 }, { hour: '05:00', volume: 0.6 },
  { hour: '06:00', volume: 1.4 }, { hour: '07:00', volume: 2.1 },
  { hour: '08:00', volume: 2.4 }, { hour: '09:00', volume: 2.2 },
  { hour: '10:00', volume: 1.8 }, { hour: '11:00', volume: 1.6 },
  { hour: '12:00', volume: 1.7 }, { hour: '13:00', volume: 1.8 },
  { hour: '14:00', volume: 1.9 }, { hour: '15:00', volume: 2.0 },
  { hour: '16:00', volume: 2.1 }, { hour: '17:00', volume: 2.3 },
  { hour: '18:00', volume: 2.5 }, { hour: '19:00', volume: 2.4 },
  { hour: '20:00', volume: 1.9 }, { hour: '21:00', volume: 1.5 },
  { hour: '22:00', volume: 1.0 }, { hour: '23:00', volume: 0.6 }
];

// Congestion levels by airport
const CONGESTION = {
  DEL: { level: 'Critical', pct: 91, delayAvg: 28 },
  BOM: { level: 'High',     pct: 78, delayAvg: 21 },
  BLR: { level: 'Moderate', pct: 62, delayAvg: 14 },
  MAA: { level: 'Low',      pct: 44, delayAvg: 8  },
  CCU: { level: 'Low',      pct: 38, delayAvg: 6  }
};

// Weather data per airport (current season - March)
const WEATHER = {
  DEL: { condition: 'Haze',  temp: 31, wind: 12, humidity: 52, severity: 'Medium', delayRisk: 35, icon: '🌫️' },
  BOM: { condition: 'Clear', temp: 33, wind: 18, humidity: 64, severity: 'Low',    delayRisk: 8,  icon: '☀️' },
  BLR: { condition: 'Clear', temp: 27, wind: 10, humidity: 48, severity: 'Low',    delayRisk: 5,  icon: '☀️' },
  MAA: { condition: 'Humid', temp: 35, wind: 14, humidity: 78, severity: 'Low',    delayRisk: 10, icon: '🌤️' },
  CCU: { condition: 'Storm', temp: 29, wind: 28, humidity: 85, severity: 'High',   delayRisk: 72, icon: '⛈️' }
};

// Live flights between these 5 airports
const LIVE_FLIGHTS = [
  { no: '6E-204',  airline: 'IndiGo',       from: 'DEL', to: 'BOM', dep: '06:10', arr: '08:20', status: 'On Time',  delay: null,   type: 'Narrow' },
  { no: 'AI-101',  airline: 'Air India',    from: 'DEL', to: 'BLR', dep: '06:45', arr: '09:05', status: 'Delayed',  delay: '18m',  type: 'Wide'   },
  { no: 'SG-8169', airline: 'SpiceJet',     from: 'BOM', to: 'MAA', dep: '07:00', arr: '08:40', status: 'On Time',  delay: null,   type: 'Narrow' },
  { no: 'UK-827',  airline: 'Vistara',      from: 'BLR', to: 'DEL', dep: '07:30', arr: '09:55', status: 'On Time',  delay: null,   type: 'Wide'   },
  { no: '6E-712',  airline: 'IndiGo',       from: 'MAA', to: 'CCU', dep: '08:00', arr: '10:15', status: 'Delayed',  delay: '35m',  type: 'Narrow' },
  { no: 'AI-764',  airline: 'Air India',    from: 'CCU', to: 'BOM', dep: '08:30', arr: '11:10', status: 'Cancelled',delay: null,   type: 'Wide'   },
  { no: 'I5-1503', airline: 'AirAsia India',from: 'BOM', to: 'BLR', dep: '09:00', arr: '10:10', status: 'On Time',  delay: null,   type: 'Narrow' },
  { no: '6E-917',  airline: 'IndiGo',       from: 'DEL', to: 'MAA', dep: '09:30', arr: '12:00', status: 'Delayed',  delay: '12m',  type: 'Narrow' },
  { no: 'SG-701',  airline: 'SpiceJet',     from: 'BLR', to: 'CCU', dep: '10:00', arr: '12:40', status: 'On Time',  delay: null,   type: 'Narrow' },
  { no: 'UK-818',  airline: 'Vistara',      from: 'MAA', to: 'DEL', dep: '10:30', arr: '13:00', status: 'On Time',  delay: null,   type: 'Wide'   },
  { no: '6E-445',  airline: 'IndiGo',       from: 'CCU', to: 'DEL', dep: '11:15', arr: '13:25', status: 'Delayed',  delay: '22m',  type: 'Narrow' },
  { no: 'AI-657',  airline: 'Air India',    from: 'BOM', to: 'CCU', dep: '11:45', arr: '14:20', status: 'On Time',  delay: null,   type: 'Wide'   }
];

// Aircraft type mix per airport
const AIRCRAFT_MIX = {
  DEL: [
    { type: 'Narrow Body', count: 68, pct: 54 },
    { type: 'Wide Body',   count: 42, pct: 34 },
    { type: 'Cargo',       count: 20, pct: 12 },
    { type: 'Regional',    count: 12, pct: 0  }
  ],
  BOM: [
    { type: 'Narrow Body', count: 55, pct: 55 },
    { type: 'Wide Body',   count: 38, pct: 38 },
    { type: 'Cargo',       count: 18, pct: 0  },
    { type: 'Regional',    count: 7,  pct: 7  }
  ],
  BLR: [
    { type: 'Narrow Body', count: 48, pct: 62 },
    { type: 'Wide Body',   count: 22, pct: 28 },
    { type: 'Cargo',       count: 10, pct: 0  },
    { type: 'Regional',    count: 7,  pct: 10 }
  ],
  MAA: [
    { type: 'Narrow Body', count: 35, pct: 65 },
    { type: 'Wide Body',   count: 15, pct: 28 },
    { type: 'Cargo',       count: 7,  pct: 0  },
    { type: 'Regional',    count: 6,  pct: 7  }
  ],
  CCU: [
    { type: 'Narrow Body', count: 28, pct: 62 },
    { type: 'Wide Body',   count: 12, pct: 27 },
    { type: 'Cargo',       count: 7,  pct: 0  },
    { type: 'Regional',    count: 4,  pct: 11 }
  ]
};

// ============================================================
// ML: Naive Bayes Delay Predictor (runs in-browser)
// ============================================================
const DELAY_TRAINING_DATA = [
  // [congestionPct, windSpeed, humidity, hour, delayMinutes]
  [91, 12, 52, 8,  28], [78, 18, 64, 8,  15], [62, 10, 48, 8,  8],
  [44, 14, 78, 8,  6],  [38, 28, 85, 8,  32], [91, 12, 52, 18, 35],
  [78, 18, 64, 18, 20], [62, 10, 48, 18, 10], [44, 14, 78, 18, 8],
  [38, 28, 85, 18, 45], [91, 12, 52, 3,  5],  [78, 18, 64, 3,  4],
  [62, 10, 48, 3,  2],  [44, 14, 78, 3,  1],  [38, 28, 85, 3,  10],
  [91, 25, 70, 8,  45], [78, 30, 90, 18, 55], [62, 8,  45, 12, 5],
  [44, 5,  55, 12, 3],  [38, 35, 92, 18, 65], [91, 10, 50, 7,  22],
  [78, 20, 68, 7,  18], [62, 12, 50, 7,  9],  [44, 10, 72, 7,  5],
  [38, 22, 80, 7,  28]
];

function predictDelay(airportCode, hourOfDay) {
  const airport = INDIAN_AIRPORTS[airportCode];
  const congestion = CONGESTION[airportCode];
  const weather = WEATHER[airportCode];
  if (!airport || !congestion || !weather) return null;

  const congPct  = congestion.pct;
  const wind     = weather.wind;
  const humidity = weather.humidity;
  const hour     = hourOfDay;

  // k-NN style: find 3 nearest training points
  const distances = DELAY_TRAINING_DATA.map(row => {
    const d = Math.sqrt(
      Math.pow((row[0]-congPct)/100, 2) +
      Math.pow((row[1]-wind)/40, 2) +
      Math.pow((row[2]-humidity)/100, 2) +
      Math.pow((row[3]-hour)/24, 2)
    );
    return { d, delay: row[4] };
  });
  distances.sort((a, b) => a.d - b.d);
  const k = 3;
  const knn = distances.slice(0, k);
  const predicted = Math.round(knn.reduce((s, x) => s + x.delay, 0) / k);
  
  const confidence = Math.max(40, Math.min(95, 100 - distances[0].d * 200));
  const label = predicted <= 5 ? 'On Time' : predicted <= 20 ? 'Minor Delay' : predicted <= 40 ? 'Moderate Delay' : 'Major Delay';
  const riskColor = predicted <= 5 ? '#10b981' : predicted <= 20 ? '#f59e0b' : predicted <= 40 ? '#f97316' : '#ef4444';

  return { predicted, label, confidence: Math.round(confidence), riskColor };
}
