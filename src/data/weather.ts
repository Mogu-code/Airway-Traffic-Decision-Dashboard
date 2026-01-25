// Weather data - simulating API response
// In production, this would be fetched from a backend API

export interface WeatherData {
  airport: string;
  condition: 'Clear' | 'Cloudy' | 'Rain' | 'Storm' | 'Fog' | 'Snow' | 'Wind';
  severity: 'Low' | 'Medium' | 'High';
  delayProbability: number;
  affectedFlights: number;
}

export const weatherData: WeatherData[] = [
  { airport: "JFK", condition: "Clear", severity: "Low", delayProbability: 5, affectedFlights: 2 },
  { airport: "LAX", condition: "Fog", severity: "Medium", delayProbability: 35, affectedFlights: 15 },
  { airport: "ORD", condition: "Storm", severity: "High", delayProbability: 75, affectedFlights: 42 },
  { airport: "ATL", condition: "Rain", severity: "Medium", delayProbability: 30, affectedFlights: 18 },
  { airport: "DFW", condition: "Clear", severity: "Low", delayProbability: 8, affectedFlights: 3 },
  { airport: "DEN", condition: "Snow", severity: "High", delayProbability: 65, affectedFlights: 28 },
  { airport: "SFO", condition: "Fog", severity: "High", delayProbability: 55, affectedFlights: 22 },
  { airport: "SEA", condition: "Cloudy", severity: "Low", delayProbability: 12, affectedFlights: 5 },
  { airport: "MIA", condition: "Storm", severity: "High", delayProbability: 80, affectedFlights: 35 },
  { airport: "BOS", condition: "Rain", severity: "Medium", delayProbability: 28, affectedFlights: 12 },
  { airport: "PHX", condition: "Clear", severity: "Low", delayProbability: 3, affectedFlights: 1 },
  { airport: "EWR", condition: "Wind", severity: "Medium", delayProbability: 40, affectedFlights: 20 },
  { airport: "LHR", condition: "Fog", severity: "High", delayProbability: 60, affectedFlights: 45 },
  { airport: "CDG", condition: "Rain", severity: "Medium", delayProbability: 32, affectedFlights: 25 },
  { airport: "FRA", condition: "Cloudy", severity: "Low", delayProbability: 10, affectedFlights: 6 },
  { airport: "DXB", condition: "Clear", severity: "Low", delayProbability: 2, affectedFlights: 1 },
  { airport: "DOH", condition: "Wind", severity: "Medium", delayProbability: 25, affectedFlights: 10 },
  { airport: "SIN", condition: "Storm", severity: "Medium", delayProbability: 45, affectedFlights: 18 },
  { airport: "HND", condition: "Clear", severity: "Low", delayProbability: 6, affectedFlights: 4 },
  { airport: "IAH", condition: "Storm", severity: "High", delayProbability: 70, affectedFlights: 30 },
];

// Get weather icons mapping
export const getWeatherIcon = (condition: string): string => {
  const icons: Record<string, string> = {
    Clear: '☀️',
    Cloudy: '☁️',
    Rain: '🌧️',
    Storm: '⛈️',
    Fog: '🌫️',
    Snow: '❄️',
    Wind: '💨',
  };
  return icons[condition] || '🌤️';
};

// Get weather summary
export const getWeatherSummary = () => {
  const fog = weatherData.filter(w => w.condition === 'Fog').length;
  const storm = weatherData.filter(w => w.condition === 'Storm').length;
  const highSeverity = weatherData.filter(w => w.severity === 'High').length;
  const avgVisibility = 100 - Math.round(weatherData.reduce((acc, w) => acc + w.delayProbability, 0) / weatherData.length);
  
  return {
    fogRisk: fog,
    stormRisk: storm,
    windLevel: weatherData.filter(w => w.condition === 'Wind').length,
    visibilityIndex: avgVisibility,
    highSeverityCount: highSeverity,
  };
};

// Get delay by weather condition
export const getDelayByWeather = () => {
  const conditions = ['Clear', 'Cloudy', 'Rain', 'Storm', 'Fog', 'Snow', 'Wind'];
  return conditions.map(condition => {
    const items = weatherData.filter(w => w.condition === condition);
    const avgDelay = items.length > 0 
      ? Math.round(items.reduce((acc, w) => acc + w.delayProbability, 0) / items.length)
      : 0;
    return { condition, delayProbability: avgDelay };
  }).filter(d => d.delayProbability > 0);
};

// Get unique conditions
export const getWeatherConditions = (): string[] => {
  return [...new Set(weatherData.map(w => w.condition))].sort();
};
