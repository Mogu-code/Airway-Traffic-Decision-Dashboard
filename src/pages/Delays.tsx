import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard, ChartCard, TableCard } from '@/components/dashboard/Cards';
import { StatusBadge } from '@/components/dashboard/Badges';
import { FilterBar, FilterSelect } from '@/components/dashboard/Filters';
import { flights, getAirlines, getFlightStats, getDelaysByAirline } from '@/data/flights';
import { Clock, XCircle, Timer } from 'lucide-react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

const Delays = () => {
  const [airlineFilter, setAirlineFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [minDelay, setMinDelay] = useState('0');

  const airlines = getAirlines();
  const stats = getFlightStats();
  const delaysByAirline = getDelaysByAirline();

  const filteredFlights = useMemo(() => {
    return flights.filter(flight => {
      const airlineMatch = airlineFilter === 'all' || flight.airline === airlineFilter;
      const statusMatch = statusFilter === 'all' || flight.status === statusFilter;
      const delayMatch = flight.delay >= parseInt(minDelay);
      return airlineMatch && statusMatch && delayMatch;
    });
  }, [airlineFilter, statusFilter, minDelay]);

  const statusDistribution = [
    { name: 'On Time', value: stats.onTime, color: 'hsl(142, 71%, 45%)' },
    { name: 'Delayed', value: stats.delayed, color: 'hsl(38, 92%, 50%)' },
    { name: 'Cancelled', value: stats.cancelled, color: 'hsl(0, 72%, 51%)' },
  ];

  return (
    <DashboardLayout title="Delays & Cancellations">
      {/* Stats */}
      <div className="dashboard-grid-3 mb-6">
        <StatCard
          title="Delayed Flights"
          value={stats.delayed}
          subtitle={`${Math.round((stats.delayed / stats.total) * 100)}% of total flights`}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Cancelled Flights"
          value={stats.cancelled}
          subtitle={`${Math.round((stats.cancelled / stats.total) * 100)}% of total flights`}
          icon={XCircle}
          variant="danger"
        />
        <StatCard
          title="Average Delay"
          value={`${stats.avgDelay} min`}
          subtitle="For delayed flights"
          icon={Timer}
          variant="default"
        />
      </div>

      {/* Filters */}
      <FilterBar>
        <FilterSelect
          label="Airline"
          value={airlineFilter}
          onChange={setAirlineFilter}
          options={[
            { value: 'all', label: 'All Airlines' },
            ...airlines.map(airline => ({ value: airline, label: airline }))
          ]}
        />
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'On Time', label: 'On Time' },
            { value: 'Delayed', label: 'Delayed' },
            { value: 'Cancelled', label: 'Cancelled' },
          ]}
        />
        <FilterSelect
          label="Minimum Delay"
          value={minDelay}
          onChange={setMinDelay}
          options={[
            { value: '0', label: 'Any delay' },
            { value: '15', label: '> 15 minutes' },
            { value: '30', label: '> 30 minutes' },
            { value: '60', label: '> 60 minutes' },
          ]}
        />
      </FilterBar>

      {/* Charts */}
      <div className="dashboard-grid-2 mb-6">
        <ChartCard title="Status Distribution">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
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

        <ChartCard title="Delays by Airline">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delaysByAirline}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                <XAxis 
                  dataKey="airline" 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={10}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
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
                <Bar dataKey="delays" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Delayed" />
                <Bar dataKey="cancelled" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Cancelled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Table */}
      <TableCard title="Flight Details">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Scheduled</th>
              <th>Delay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.map((flight) => (
              <tr key={flight.flightNo}>
                <td className="font-mono text-primary font-medium">{flight.flightNo}</td>
                <td>{flight.airline}</td>
                <td className="font-mono">{flight.from}</td>
                <td className="font-mono">{flight.to}</td>
                <td className="text-muted-foreground">{flight.scheduledTime}</td>
                <td className={flight.delay > 0 ? 'text-warning' : 'text-muted-foreground'}>
                  {flight.delay > 0 ? `${flight.delay} min` : '-'}
                </td>
                <td>
                  <StatusBadge status={flight.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFlights.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No flights match the selected filters.
          </p>
        )}
      </TableCard>
    </DashboardLayout>
  );
};

export default Delays;
