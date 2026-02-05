import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plane, Database, LineChart, Cloud, Users, Rocket } from 'lucide-react';

const About = () => {
  const technologies = [
    { name: 'React', description: 'Component-based UI library' },
    { name: 'TypeScript', description: 'Type-safe JavaScript' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Recharts', description: 'Composable charting library' },
    { name: 'React Router', description: 'Client-side routing' },
    { name: 'Lucide Icons', description: 'Beautiful icon library' },
  ];

  const team = [
    { name: 'Alex Johnson', role: 'Project Lead', avatar: 'AJ' },
    { name: 'Sarah Chen', role: 'UI/UX Designer', avatar: 'SC' },
    { name: 'Mike Roberts', role: 'Frontend Developer', avatar: 'MR' },
    { name: 'Emily Davis', role: 'Data Analyst', avatar: 'ED' },
  ];

  const futureScope = [
    { icon: Database, title: 'Real-time API Integration', description: 'Connect to live flight data APIs for real-time monitoring' },
    { icon: Cloud, title: 'Weather API Integration', description: 'Integrate with weather services for accurate predictions' },
    { icon: LineChart, title: 'Predictive Analytics', description: 'Machine learning models for delay prediction' },
    { icon: Users, title: 'Multi-user Support', description: 'Role-based access control for different user types' },
  ];

  return (
    <DashboardLayout title="About">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="dashboard-card text-center py-12">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Plane className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Airway Traffic Decision Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive frontend prototype designed for visualizing airway traffic data, 
            including airport congestion, flight delays & cancellations, aircraft traffic patterns, 
            and weather impact indicators.
          </p>
        </div>

        {/* Objective */}
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Project Objective</h2>
          <p className="text-muted-foreground leading-relaxed">
            This dashboard serves as a decision-support tool for air traffic controllers and aviation 
            managers. It provides real-time visibility into flight operations, helping identify 
            congestion patterns, predict delays, and understand weather impacts on flight schedules. 
            The modular architecture is designed for easy integration with backend APIs and real-time 
            data sources.
          </p>
        </div>

        {/* Technologies */}
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-6">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <div key={tech.name} className="p-4 bg-secondary/50 rounded-lg">
                <h3 className="font-medium text-foreground">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Scope */}
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Future Scope</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {futureScope.map((item) => (
              <div key={item.title} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-6">Team Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.name} className="text-center p-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-semibold text-primary">{member.avatar}</span>
                </div>
                <h3 className="font-medium text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Ready Note */}
        <div className="dashboard-card border-primary/30 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">API-Ready Architecture</h3>
              <p className="text-sm text-muted-foreground">
                This dashboard is built with a clean separation between data and UI layers. 
                All data is currently loaded from TypeScript data files that simulate API responses. 
                To integrate with real backend APIs, simply replace the data imports with fetch() calls 
                to your API endpoints. The component structure will remain unchanged.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            © 2025 Airway Traffic Decision Dashboard. Built for academic evaluation and future backend integration.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
