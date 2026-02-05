// Flight data - simulating API response
// In production, this would be fetched from a backend API

export interface Flight {
  flightNo: string;
  airline: string;
  from: string;
  to: string;
  scheduledTime: string;
  delay: number; // in minutes
  status: 'On Time' | 'Delayed' | 'Cancelled';
  aircraftType: 'Narrow Body' | 'Wide Body' | 'Cargo';
  airport: string;
  weatherCondition: string;
  hour: number; // for hourly aggregation
}

export const flights: Flight[] = [
  { flightNo: "AA1234", airline: "American Airlines", from: "JFK", to: "LAX", scheduledTime: "08:00", delay: 0, status: "On Time", aircraftType: "Wide Body", airport: "JFK", weatherCondition: "Clear", hour: 8 },
  { flightNo: "UA567", airline: "United Airlines", from: "ORD", to: "SFO", scheduledTime: "09:30", delay: 25, status: "Delayed", aircraftType: "Narrow Body", airport: "ORD", weatherCondition: "Cloudy", hour: 9 },
  { flightNo: "DL890", airline: "Delta Airlines", from: "ATL", to: "BOS", scheduledTime: "10:15", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "ATL", weatherCondition: "Clear", hour: 10 },
  { flightNo: "SW123", airline: "Southwest", from: "DEN", to: "PHX", scheduledTime: "11:00", delay: 45, status: "Delayed", aircraftType: "Narrow Body", airport: "DEN", weatherCondition: "Rain", hour: 11 },
  { flightNo: "BA456", airline: "British Airways", from: "LHR", to: "JFK", scheduledTime: "12:30", delay: 0, status: "Cancelled", aircraftType: "Wide Body", airport: "LHR", weatherCondition: "Fog", hour: 12 },
  { flightNo: "AA789", airline: "American Airlines", from: "MIA", to: "DFW", scheduledTime: "13:00", delay: 15, status: "Delayed", aircraftType: "Narrow Body", airport: "MIA", weatherCondition: "Storm", hour: 13 },
  { flightNo: "UA234", airline: "United Airlines", from: "SFO", to: "SEA", scheduledTime: "14:15", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "SFO", weatherCondition: "Clear", hour: 14 },
  { flightNo: "DL567", airline: "Delta Airlines", from: "DTW", to: "MSP", scheduledTime: "15:00", delay: 60, status: "Delayed", aircraftType: "Narrow Body", airport: "DTW", weatherCondition: "Snow", hour: 15 },
  { flightNo: "FX101", airline: "FedEx", from: "MEM", to: "ORD", scheduledTime: "06:00", delay: 0, status: "On Time", aircraftType: "Cargo", airport: "MEM", weatherCondition: "Clear", hour: 6 },
  { flightNo: "AA456", airline: "American Airlines", from: "DFW", to: "ORD", scheduledTime: "16:30", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "DFW", weatherCondition: "Clear", hour: 16 },
  { flightNo: "SW789", airline: "Southwest", from: "LAS", to: "OAK", scheduledTime: "17:00", delay: 35, status: "Delayed", aircraftType: "Narrow Body", airport: "LAS", weatherCondition: "Wind", hour: 17 },
  { flightNo: "UA890", airline: "United Airlines", from: "EWR", to: "LAX", scheduledTime: "18:15", delay: 0, status: "On Time", aircraftType: "Wide Body", airport: "EWR", weatherCondition: "Clear", hour: 18 },
  { flightNo: "DL123", airline: "Delta Airlines", from: "LAX", to: "JFK", scheduledTime: "19:00", delay: 0, status: "Cancelled", aircraftType: "Wide Body", airport: "LAX", weatherCondition: "Fog", hour: 19 },
  { flightNo: "JB456", airline: "JetBlue", from: "BOS", to: "FLL", scheduledTime: "20:30", delay: 20, status: "Delayed", aircraftType: "Narrow Body", airport: "BOS", weatherCondition: "Rain", hour: 20 },
  { flightNo: "AA101", airline: "American Airlines", from: "PHX", to: "DEN", scheduledTime: "21:00", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "PHX", weatherCondition: "Clear", hour: 21 },
  { flightNo: "UP789", airline: "UPS", from: "SDF", to: "ONT", scheduledTime: "05:00", delay: 10, status: "Delayed", aircraftType: "Cargo", airport: "SDF", weatherCondition: "Cloudy", hour: 5 },
  { flightNo: "SW234", airline: "Southwest", from: "HOU", to: "AUS", scheduledTime: "07:30", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "HOU", weatherCondition: "Clear", hour: 7 },
  { flightNo: "UA111", airline: "United Airlines", from: "IAD", to: "DEN", scheduledTime: "08:45", delay: 55, status: "Delayed", aircraftType: "Narrow Body", airport: "IAD", weatherCondition: "Storm", hour: 8 },
  { flightNo: "DL222", airline: "Delta Airlines", from: "SLC", to: "PDX", scheduledTime: "09:15", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "SLC", weatherCondition: "Clear", hour: 9 },
  { flightNo: "AA333", airline: "American Airlines", from: "CLT", to: "PHL", scheduledTime: "10:00", delay: 0, status: "Cancelled", aircraftType: "Narrow Body", airport: "CLT", weatherCondition: "Fog", hour: 10 },
  { flightNo: "LH789", airline: "Lufthansa", from: "FRA", to: "JFK", scheduledTime: "11:30", delay: 0, status: "On Time", aircraftType: "Wide Body", airport: "FRA", weatherCondition: "Clear", hour: 11 },
  { flightNo: "AF456", airline: "Air France", from: "CDG", to: "LAX", scheduledTime: "12:00", delay: 40, status: "Delayed", aircraftType: "Wide Body", airport: "CDG", weatherCondition: "Rain", hour: 12 },
  { flightNo: "EK101", airline: "Emirates", from: "DXB", to: "JFK", scheduledTime: "13:30", delay: 0, status: "On Time", aircraftType: "Wide Body", airport: "DXB", weatherCondition: "Clear", hour: 13 },
  { flightNo: "QR202", airline: "Qatar Airways", from: "DOH", to: "LAX", scheduledTime: "14:00", delay: 30, status: "Delayed", aircraftType: "Wide Body", airport: "DOH", weatherCondition: "Wind", hour: 14 },
  { flightNo: "FX202", airline: "FedEx", from: "IND", to: "MEM", scheduledTime: "04:00", delay: 0, status: "On Time", aircraftType: "Cargo", airport: "IND", weatherCondition: "Clear", hour: 4 },
  { flightNo: "JB789", airline: "JetBlue", from: "JFK", to: "SJU", scheduledTime: "15:30", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "JFK", weatherCondition: "Clear", hour: 15 },
  { flightNo: "SW567", airline: "Southwest", from: "MDW", to: "BWI", scheduledTime: "16:00", delay: 25, status: "Delayed", aircraftType: "Narrow Body", airport: "MDW", weatherCondition: "Cloudy", hour: 16 },
  { flightNo: "UA345", airline: "United Airlines", from: "DEN", to: "IAH", scheduledTime: "17:30", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "DEN", weatherCondition: "Clear", hour: 17 },
  { flightNo: "DL678", airline: "Delta Airlines", from: "MSP", to: "ATL", scheduledTime: "18:00", delay: 0, status: "On Time", aircraftType: "Narrow Body", airport: "MSP", weatherCondition: "Clear", hour: 18 },
  { flightNo: "AA999", airline: "American Airlines", from: "ORD", to: "MIA", scheduledTime: "19:30", delay: 70, status: "Delayed", aircraftType: "Wide Body", airport: "ORD", weatherCondition: "Storm", hour: 19 },
];

// Helper function to get unique airlines
export const getAirlines = (): string[] => {
  return [...new Set(flights.map(f => f.airline))].sort();
};

// Helper function to compute statistics
export const getFlightStats = () => {
  const total = flights.length;
  const delayed = flights.filter(f => f.status === 'Delayed').length;
  const cancelled = flights.filter(f => f.status === 'Cancelled').length;
  const onTime = flights.filter(f => f.status === 'On Time').length;
  const avgDelay = Math.round(
    flights.filter(f => f.delay > 0).reduce((acc, f) => acc + f.delay, 0) / 
    flights.filter(f => f.delay > 0).length
  ) || 0;

  return { total, delayed, cancelled, onTime, avgDelay };
};

// Get flights per hour for line chart
export const getFlightsPerHour = () => {
  const hourlyData: { hour: string; flights: number }[] = [];
  for (let i = 4; i <= 21; i++) {
    const count = flights.filter(f => f.hour === i).length;
    hourlyData.push({
      hour: `${i.toString().padStart(2, '0')}:00`,
      flights: count
    });
  }
  return hourlyData;
};

// Get delay distribution
export const getDelayDistribution = () => {
  const onTime = flights.filter(f => f.delay === 0 && f.status !== 'Cancelled').length;
  const under30 = flights.filter(f => f.delay > 0 && f.delay <= 30).length;
  const over30 = flights.filter(f => f.delay > 30).length;
  
  return [
    { category: 'On Time', count: onTime },
    { category: '< 30 min', count: under30 },
    { category: '> 30 min', count: over30 }
  ];
};

// Get delays by airline
export const getDelaysByAirline = () => {
  const airlines = getAirlines();
  return airlines.map(airline => ({
    airline: airline.replace(' Airlines', '').replace(' Airways', ''),
    delays: flights.filter(f => f.airline === airline && f.status === 'Delayed').length,
    cancelled: flights.filter(f => f.airline === airline && f.status === 'Cancelled').length
  })).filter(a => a.delays > 0 || a.cancelled > 0);
};

// Get aircraft type distribution
export const getAircraftTypeDistribution = () => {
  const narrow = flights.filter(f => f.aircraftType === 'Narrow Body').length;
  const wide = flights.filter(f => f.aircraftType === 'Wide Body').length;
  const cargo = flights.filter(f => f.aircraftType === 'Cargo').length;
  
  return [
    { type: 'Narrow Body', count: narrow, color: 'hsl(174, 72%, 46%)' },
    { type: 'Wide Body', count: wide, color: 'hsl(142, 71%, 45%)' },
    { type: 'Cargo', count: cargo, color: 'hsl(38, 92%, 50%)' }
  ];
};
