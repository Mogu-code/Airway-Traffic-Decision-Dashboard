import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Clock, 
  Plane, 
  Cloud, 
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/congestion', label: 'Airport Congestion', icon: <Building2 className="w-5 h-5" /> },
  { path: '/delays', label: 'Delays & Cancellations', icon: <Clock className="w-5 h-5" /> },
  { path: '/aircraft', label: 'Aircraft Traffic', icon: <Plane className="w-5 h-5" /> },
  { path: '/weather', label: 'Weather Impact', icon: <Cloud className="w-5 h-5" /> },
  { path: '/about', label: 'About', icon: <Info className="w-5 h-5" /> },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">AirTraffic</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
            <Plane className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item",
                isActive && "nav-item-active"
              )}
            >
              <span className={cn(
                "transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className={cn(
                  "transition-colors",
                  isActive ? "text-primary font-medium" : ""
                )}>
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Footer */}
      <div className={cn(
        "p-4 border-t border-sidebar-border",
        collapsed ? "text-center" : ""
      )}>
        {!collapsed && (
          <p className="text-xs text-muted-foreground">
            © 2025 AirTraffic Dashboard
          </p>
        )}
      </div>
    </aside>
  );
};
