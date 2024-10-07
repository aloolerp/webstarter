// Sidebar.tsx
import  { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Package, Users2, LineChart, Settings, Zap } from "lucide-react";
import UserSettings from "./UserSettings";
import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "../data/Projects";
import Services from "../data/Services";


const sidebarLinks = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Projects", href: "/dashboard/projects" },
  { icon: Package, label: "Services", href: "/dashboard/services" },
  { icon: Users2, label: "Tasks", href: "/dashboard/tasks" },
  { icon: LineChart, label: "Analytics", href: "/dashboard/analytics" },
];

const DashboardContent = () => (
    <div>
      <h2>Dashboard Overview</h2>
      {/* Add your dashboard overview content here */}
    </div>
  );

export const MainContent = () => {
  return (
    <main className="p-4">
      <Routes>
        <Route index element={<DashboardContent />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        {/* <Route path="settings" element={<Settings isOpen={true} onClose={() => {}} />} /> */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </main>
  );
};

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <aside className={`${isSidebarOpen ? "w-48" : "w-16"} transition-all duration-200 ease-in-out bg-accent border-r`}>
      <div className="flex flex-col h-full">
        <Link to="/dashboard" className="flex items-center justify-center py-4">
          <Zap className="w-8 h-8 text-primary" />
          {isSidebarOpen && <span className="ml-2 text-lg font-semibold">WebStarter</span>}
        </Link>
        <div className="border-b border-border mb-4"></div>
        <nav className="flex flex-col flex-grow">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`flex items-center p-2 hover:bg-accent ${
                location.pathname === link.href
                  ? "bg-accent font-semibold "
                  : ""
              }`}
            >
              <link.icon className={`w-6 h-6 ${location.pathname === link.href ? "text-primary" : ""}`} />
              {isSidebarOpen && <span className="ml-2">{link.label}</span>}
            </Link>
          ))}
         
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`mt-auto flex items-center p-2 border-t border-border hover:bg-accent`}
          >
            <Settings className="w-6 h-6" />
            {isSidebarOpen && <span className="ml-2">Settings</span>}
          </button>
          {isSettingsOpen && (
            <UserSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
