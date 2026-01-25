// Airport data - simulating API response
// In production, this would be fetched from a backend API

export interface Airport {
  code: string;
  name: string;
  city: string;
  activeFlights: number;
  congestionLevel: 'Low' | 'Medium' | 'High';
}

export const airports: Airport[] = [
  { code: "JFK", name: "John F. Kennedy International", city: "New York", activeFlights: 145, congestionLevel: "High" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", activeFlights: 132, congestionLevel: "High" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", activeFlights: 128, congestionLevel: "High" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta", city: "Atlanta", activeFlights: 156, congestionLevel: "High" },
  { code: "DFW", name: "Dallas/Fort Worth International", city: "Dallas", activeFlights: 98, congestionLevel: "Medium" },
  { code: "DEN", name: "Denver International", city: "Denver", activeFlights: 89, congestionLevel: "Medium" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", activeFlights: 76, congestionLevel: "Medium" },
  { code: "SEA", name: "Seattle-Tacoma International", city: "Seattle", activeFlights: 54, congestionLevel: "Low" },
  { code: "MIA", name: "Miami International", city: "Miami", activeFlights: 87, congestionLevel: "Medium" },
  { code: "BOS", name: "Boston Logan International", city: "Boston", activeFlights: 62, congestionLevel: "Low" },
  { code: "PHX", name: "Phoenix Sky Harbor", city: "Phoenix", activeFlights: 45, congestionLevel: "Low" },
  { code: "EWR", name: "Newark Liberty International", city: "Newark", activeFlights: 95, congestionLevel: "Medium" },
  { code: "LHR", name: "London Heathrow", city: "London", activeFlights: 168, congestionLevel: "High" },
  { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris", activeFlights: 142, congestionLevel: "High" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", activeFlights: 118, congestionLevel: "High" },
  { code: "DXB", name: "Dubai International", city: "Dubai", activeFlights: 185, congestionLevel: "High" },
  { code: "DOH", name: "Hamad International", city: "Doha", activeFlights: 92, congestionLevel: "Medium" },
  { code: "SIN", name: "Singapore Changi", city: "Singapore", activeFlights: 78, congestionLevel: "Medium" },
  { code: "HND", name: "Tokyo Haneda", city: "Tokyo", activeFlights: 134, congestionLevel: "High" },
  { code: "IAH", name: "George Bush Intercontinental", city: "Houston", activeFlights: 72, congestionLevel: "Medium" },
];

// Get unique cities
export const getCities = (): string[] => {
  return [...new Set(airports.map(a => a.city))].sort();
};

// Get congested airports count
export const getCongestedAirportsCount = (): number => {
  return airports.filter(a => a.congestionLevel === 'High').length;
};

// Get top congested airports
export const getTopCongestedAirports = (limit: number = 5) => {
  return [...airports]
    .sort((a, b) => b.activeFlights - a.activeFlights)
    .slice(0, limit);
};

// Get airports by congestion level
export const getAirportsByCongestion = () => {
  return {
    high: airports.filter(a => a.congestionLevel === 'High').length,
    medium: airports.filter(a => a.congestionLevel === 'Medium').length,
    low: airports.filter(a => a.congestionLevel === 'Low').length,
  };
};
