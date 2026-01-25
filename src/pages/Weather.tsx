import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard, ChartCard, TableCard } from '@/components/dashboard/Cards';
import { SeverityBadge } from '@/components/dashboard/Badges';
import { FilterBar, FilterSelect } from '@/components/dashboard/Filters';
import { 
  weatherData, 
  getWeatherIcon, 
  getWeatherSummary, 
  getDelayByWeather,
  getWeatherConditions 
} from '@/data/weather';
import { CloudFog, CloudLightning, Wind, Eye } from 'lucide-react';
import {
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
} from 'recharts';

const Weather = () => {
  const [conditionFilter, setConditionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const conditions = getWeatherConditions();
  const summary = getWeatherSummary();
  const delayByWeather = getDelayByWeather();

  const filteredWeather = useMemo(() => {
    return weatherData.filter(w => {
      const conditionMatch = conditionFilter === 'all' || w.condition === conditionFilter;
      const severityMatch = severityFilter === 'all' || w.severity === severityFilter;
      return conditionMatch && severityMatch;
    });
  }, [conditionFilter, severityFilter]);

  // Color based on delay probability
  const getDelayColor = (prob: number) => {
    if (prob > 50) return 'hsl(0, 72%, 51%)';
    if (prob > 25) return 'hsl(38, 92%, 50%)';
    return 'hsl(142, 71%, 45%)';
  };

  // Simulated delay trend data
  const delayTrend = [
    { time: '00:00', delay: 15 },
    { time: '04:00', delay: 12 },
    { time: '08:00', delay: 45 },
    { time: '12:00', delay: 62 },
    { time: '16:00', delay: 38 },
    { time: '20:00', delay: 25 },
    { time: '24:00', delay: 18 },
  ];

  return (
    <DashboardLayout title="Weather Impact Indicators">
      {/* Stats */}
      <div className="dashboard-grid-4 mb-6">
        <StatCard
          title="Fog Risk"
          value={summary.fogRisk}
          subtitle="Airports affected"
          icon={CloudFog}
          variant="warning"
        />
        <StatCard
          title="Storm Risk"
          value={summary.stormRisk}
          subtitle="Airports affected"
          icon={CloudLightning}
          variant="danger"
        />
        <StatCard
          title="Wind Alerts"
          value={summary.windLevel}
          subtitle="Airports affected"
          icon={Wind}
          variant="warning"
        />
        <StatCard
          title="Visibility Index"
          value={`${summary.visibilityIndex}%`}
          subtitle="Average visibility"
          icon={Eye}
          variant="success"
        />
      </div>

      {/* Filters */}
      <FilterBar>
        <FilterSelect
          label="Weather Condition"
          value={conditionFilter}
          onChange={setConditionFilter}
          options={[
            { value: 'all', label: 'All Conditions' },
            ...conditions.map(c => ({ value: c, label: c }))
          ]}
        />
        <FilterSelect
          label="Severity"
          value={severityFilter}
          onChange={setSeverityFilter}
          options={[
            { value: 'all', label: 'All Severity' },
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </FilterBar>

      {/* Charts */}
      <div className="dashboard-grid-2 mb-6">
        <ChartCard title="Delay Probability by Weather">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={delayByWeather}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                <XAxis 
                  dataKey="condition" 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 18%, 10%)',
                    border: '1px solid hsl(220, 16%, 18%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 20%, 95%)',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Delay Probability']}
                />
                <Bar dataKey="delayProbability" radius={[4, 4, 0, 0]}>
                  {delayByWeather.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getDelayColor(entry.delayProbability)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Delay Trend Under Bad Weather">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={delayTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 18%)" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(215, 16%, 55%)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 18%, 10%)',
                    border: '1px solid hsl(220, 16%, 18%)',
                    borderRadius: '8px',
                    color: 'hsl(210, 20%, 95%)',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Delay Rate']}
                />
                <Line
                  type="monotone"
                  dataKey="delay"
                  stroke="hsl(38, 92%, 50%)"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(38, 92%, 50%)', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(38, 92%, 50%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Table */}
      <TableCard title="Weather Impact by Airport">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Airport</th>
              <th>Weather</th>
              <th>Severity</th>
              <th>Delay Probability</th>
              <th>Affected Flights</th>
            </tr>
          </thead>
          <tbody>
            {filteredWeather.map((w) => (
              <tr key={w.airport}>
                <td className="font-mono text-primary font-medium">{w.airport}</td>
                <td>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{getWeatherIcon(w.condition)}</span>
                    <span>{w.condition}</span>
                  </span>
                </td>
                <td>
                  <SeverityBadge severity={w.severity} />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${w.delayProbability}%`,
                          backgroundColor: getDelayColor(w.delayProbability)
                        }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: getDelayColor(w.delayProbability) }}>
                      {w.delayProbability}%
                    </span>
                  </div>
                </td>
                <td className="font-mono">{w.affectedFlights}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredWeather.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No weather data matches the selected filters.
          </p>
        )}
      </TableCard>
    </DashboardLayout>
  );
};

export default Weather;
