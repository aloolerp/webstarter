import { useState, useEffect } from "react";
import { Home, FolderOpenDot, CalendarCheck2, StickyNote, LineChart, Menu, Package2 } from "lucide-react";
import { NavLink } from "@/components/dashboard/NavLink";
import { Button } from "@/components/ui/button";

const links = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "projects", label: "Projects", icon: FolderOpenDot },
  { id: "tasks", label: "Tasks", icon: CalendarCheck2 },
  { id: "pages", label: "Pages", icon: StickyNote },
  { id: "products", label: "Products", icon: LineChart },
];

const Sidebar = ({ onSelectView, activeView }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Automatically collapse the sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setIsMobileView(true);
      } else {
        setCollapsed(false);
        setIsMobileView(false);
      }
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`
        ${isMobileView ? 'fixed bottom-0 w-full h-16 border-t bg-background' : 'border-r h-screen bg-background'} 
        transition-all duration-300 
        ${collapsed ? 'w-16' : isMobileView ? 'w-full' : 'w-64'}
        ${isMobileView ? 'z-50' : ''}
      `}
      
    >
      {/* Header */}
      {!isMobileView && (
        <div className="flex items-center justify-between px-4 lg:px-6 h-14">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            {!collapsed && <span className="hidden lg:inline">Alool Cloud</span>}
          </a>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      )}

      {/* Navigation links */}
      <nav className={`px-2 lg:px-4 flex ${isMobileView ? 'justify-around' : 'flex-col'}`}>
        {links.map((link) => (
          <NavLink
            key={link.id}
            id={link.id}
            icon={link.icon}
            collapsed={collapsed}
            onClick={onSelectView}
            isActive={activeView === link.id} // Check if the link is active
            iconClassName="h-6 w-6" // Explicit size for icons
          >
            {!collapsed && link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
