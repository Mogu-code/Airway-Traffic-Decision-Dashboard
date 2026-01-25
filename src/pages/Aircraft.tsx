import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard, TableCard } from '@/components/dashboard/Cards';
import { FilterBar, FilterSelect } from '@/components/dashboard/Filters';
import { flights, getAirlines, getAircraftTypeDistribution, getFlightsPerHour } from '@/data/flights';
import { airports } from '@/data/airports';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const Aircraft = () => {
  const [aircraftFilter, setAircraftFilter] = useState('all');
  const [airlineFilter, setAirlineFilter] = useState('all');

  const airlines = getAirlines();
  const aircraftTypes = getAircraftTypeDistribution();
  const hourlyTraffic = getFlightsPerHour();

  // Flights per airport
  const flightsPerAirport = useMemo(() => {
    const airportFlights: Record<string, number> = {};
    flights.forEach(f => {
      airportFlights[f.airport] = (airportFlights[f.airport] || 0) + 1;
    });
    return Object.entries(airportFlights)
      .map(([airport, count]) => ({ airport, flights: count }))
      .sort((a, b) => b.flights - a.flights)
      .slice(0, 10);
  }, []);

  // Aggregated table data
  const aircraftData = useMemo(() => {
    const data: Record<string, { type: string; airline: string; flights: number; occupancy: number }> = {};
    
    flights.forEach(f => {
      const key = `${f.aircraftType}-${f.airline}`;
      if (!data[key]) {
        data[key] = {
          type: f.aircraftType,
          airline: f.airline,
          flights: 0,
          occupancy: Math.floor(Math.random() * 30) + 70, // Dummy occupancy
        };
      }
      data[key].flights++;
    });

    return Object.values(data).filter(d => {
      const typeMatch = aircraftFilter === 'all' || d.type === aircraftFilter;
      const airlineMatch = airlineFilter === 'all' || d.airline === airlineFilter;
      return typeMatch && airlineMatch;
    });
  }, [aircraftFilter, airlineFilter]);

  return (
    <DashboardLayout title="Aircraft Traffic & Density">
      {/* Filters */}
      <FilterBar>
        <FilterSelect
          label="Aircraft Type"
          value={aircraftFilter}
          onChange={setAircraftFilter}
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'Narrow Body', label: 'Narrow Body' },
            { value: 'Wide Body', label: 'Wide Body' },
            { value: 'Cargo', label: 'Cargo' },
          ]}
        />
        <FilterSelect
          label="Airline"
          value={airlineFilter}
          onChange={setAirlineFilter}
          options={[
            { value: 'all', label: 'All Airlines' },
            ...airlines.map(airline => ({ value: airline, label: airline }))
          ]}
        />
      </FilterBar>

      {/* Charts Row 1 */}
      <div className="dashboard-grid-2 mb-6">
        <ChartCard title="Aircraft Type Distribution">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aircraftTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="count"
                  nameKey="type"
                >
                  {aircraftTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 18%, 10%)',
                    border: '1px solid hsl(220, 16%, 18%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 20%, 95%)',
                  }}
                />
                <Legend 
                  formatter={(value) => <span className="text-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Flights Per Airport (Top 10)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flightsPerAirport}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                <XAxis 
                  dataKey="airport" 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 18%, 10%)',
                    border: '1px solid hsl(220, 16%, 18%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 20%, 95%)',
                  }}
                />
                <Bar dataKey="flights" fill="hsl(174, 72%, 46%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Hourly Traffic Chart */}
      <ChartCard title="Hourly Traffic Volume" className="mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyTraffic}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(215, 16%, 55%)" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(215, 16%, 55%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 18%, 10%)',
                  border: '1px solid hsl(220, 16%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 20%, 95%)',
                }}
              />
              <Line
                type="monotone"
                dataKey="flights"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(142, 71%, 45%)', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(142, 71%, 45%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Table */}
      <TableCard title="Aircraft Traffic Data">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Aircraft Type</th>
              <th>Airline</th>
              <th>Number of Flights</th>
              <th>Avg Occupancy</th>
            </tr>
          </thead>
          <tbody>
            {aircraftData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <span className={`badge-${row.type === 'Cargo' ? 'warning' : row.type === 'Wide Body' ? 'success' : 'primary'}`}>
                    {row.type}
                  </span>
                </td>
                <td>{row.airline}</td>
                <td className="font-mono">{row.flights}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${row.occupancy}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{row.occupancy}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {aircraftData.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No data matches the selected filters.
          </p>
        )}
      </TableCard>
    </DashboardLayout>
  );
};

export default Aircraft;
