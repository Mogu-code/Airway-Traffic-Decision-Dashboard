import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard, ChartCard, TableCard } from '@/components/dashboard/Cards';
import { StatusBadge, CongestionBadge } from '@/components/dashboard/Badges';
import { 
  flights, 
  getFlightStats, 
  getFlightsPerHour, 
  getDelayDistribution 
} from '@/data/flights';
import { airports, getTopCongestedAirports, getCongestedAirportsCount } from '@/data/airports';
import { Plane, Clock, XCircle, Building2, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const Home = () => {
  const stats = getFlightStats();
  const flightsPerHour = getFlightsPerHour();
  const delayDistribution = getDelayDistribution();
  const topCongested = getTopCongestedAirports(5);
  const recentDelayed = flights.filter(f => f.status === 'Delayed').slice(0, 5);

  const delayColors = ['hsl(142, 71%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)'];

  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Stats Grid */}
      <div className="dashboard-grid-4 mb-6">
        <StatCard
          title="Total Flights Today"
          value={stats.total}
          icon={Plane}
          variant="default"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Delayed Flights"
          value={stats.delayed}
          subtitle={`${Math.round((stats.delayed / stats.total) * 100)}% of total`}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Cancelled Flights"
          value={stats.cancelled}
          subtitle={`${Math.round((stats.cancelled / stats.total) * 100)}% of total`}
          icon={XCircle}
          variant="danger"
        />
        <StatCard
          title="Congested Airports"
          value={getCongestedAirportsCount()}
          subtitle="High congestion level"
          icon={Building2}
          variant="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid-2 mb-6">
        <ChartCard title="Flights Per Hour (Today)">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flightsPerHour}>
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
                  stroke="hsl(174, 72%, 46%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(174, 72%, 46%)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(174, 72%, 46%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Delay Distribution">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delayDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                <XAxis 
                  dataKey="category" 
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
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {delayDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={delayColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Tables Row */}
      <div className="dashboard-grid-2">
        <TableCard title="Recent Delayed Flights">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Flight</th>
                <th>Route</th>
                <th>Delay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDelayed.map((flight) => (
                <tr key={flight.flightNo}>
                  <td className="font-mono text-primary">{flight.flightNo}</td>
                  <td className="text-muted-foreground">
                    {flight.from} → {flight.to}
                  </td>
                  <td className="text-warning">{flight.delay} min</td>
                  <td>
                    <StatusBadge status={flight.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard title="Top Congested Airports">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Airport</th>
                <th>City</th>
                <th>Active</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {topCongested.map((airport) => (
                <tr key={airport.code}>
                  <td>
                    <span className="font-mono text-primary">{airport.code}</span>
                    <span className="block text-xs text-muted-foreground">{airport.name}</span>
                  </td>
                  <td className="text-muted-foreground">{airport.city}</td>
                  <td>{airport.activeFlights}</td>
                  <td>
                    <CongestionBadge level={airport.congestionLevel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>
    </DashboardLayout>
  );
};

export default Home;
