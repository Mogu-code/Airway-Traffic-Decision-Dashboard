import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartCard, TableCard } from '@/components/dashboard/Cards';
import { CongestionBadge } from '@/components/dashboard/Badges';
import { FilterBar, FilterSelect } from '@/components/dashboard/Filters';
import { airports, getCities, getTopCongestedAirports } from '@/data/airports';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const Congestion = () => {
  const [cityFilter, setCityFilter] = useState('all');
  const [congestionFilter, setCongestionFilter] = useState('all');

  const cities = getCities();
  const topCongested = getTopCongestedAirports(5);

  const filteredAirports = useMemo(() => {
    return airports.filter(airport => {
      const cityMatch = cityFilter === 'all' || airport.city === cityFilter;
      const congestionMatch = congestionFilter === 'all' || airport.congestionLevel === congestionFilter;
      return cityMatch && congestionMatch;
    });
  }, [cityFilter, congestionFilter]);

  const chartData = topCongested.map(a => ({
    name: a.code,
    flights: a.activeFlights,
    level: a.congestionLevel,
  }));

  const getBarColor = (level: string) => {
    switch (level) {
      case 'High': return 'hsl(0, 72%, 51%)';
      case 'Medium': return 'hsl(38, 92%, 50%)';
      default: return 'hsl(142, 71%, 45%)';
    }
  };

  return (
    <DashboardLayout title="Airport Congestion">
      {/* Filters */}
      <FilterBar>
        <FilterSelect
          label="City"
          value={cityFilter}
          onChange={setCityFilter}
          options={[
            { value: 'all', label: 'All Cities' },
            ...cities.map(city => ({ value: city, label: city }))
          ]}
        />
        <FilterSelect
          label="Congestion Level"
          value={congestionFilter}
          onChange={setCongestionFilter}
          options={[
            { value: 'all', label: 'All Levels' },
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </FilterBar>

      {/* Chart */}
      <ChartCard title="Top 5 Most Congested Airports" className="mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
              <XAxis 
                type="number" 
                stroke="hsl(215, 16%, 55%)" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="hsl(215, 16%, 55%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 18%, 10%)',
                  border: '1px solid hsl(220, 16%, 18%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 20%, 95%)',
                }}
              />
              <Bar dataKey="flights" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.level)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Table */}
      <TableCard title="Airport Congestion Data">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Airport Name</th>
              <th>City</th>
              <th>Active Flights</th>
              <th>Congestion Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredAirports.map((airport) => (
              <tr key={airport.code}>
                <td className="font-mono text-primary font-medium">{airport.code}</td>
                <td>{airport.name}</td>
                <td className="text-muted-foreground">{airport.city}</td>
                <td className="font-mono">{airport.activeFlights}</td>
                <td>
                  <CongestionBadge level={airport.congestionLevel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAirports.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No airports match the selected filters.
          </p>
        )}
      </TableCard>
    </DashboardLayout>
  );
};

export default Congestion;
