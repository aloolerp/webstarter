import { cn } from "@/lib/utils"; // Helper for conditional classes

export const NavLink = ({ id, icon: Icon, children, collapsed, onClick, isActive }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "flex items-center gap-3 px-3 py-3 text-muted-foreground transition-all hover:text-primary",
        { "text-primary": isActive } // Add active styles
      )}
    >
      <Icon className="h-6 w-6 flex-shrink-0" /> {/* Ensure consistent icon size */}
      {!collapsed && <span className="text-sm font-medium">{children}</span>} {/* Ensure consistent text styling */}
    </button>
  );
};
