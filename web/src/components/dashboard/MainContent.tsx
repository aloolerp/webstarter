// MainContent.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Projects from "../data/Projects";
import Services from "../data/Services";

// import Settings from "./Settings";
const DashboardContent = () => (
    <div>
      <h2>Dashboard Overview</h2>
      {/* Add your dashboard overview content here */}
    </div>
  );
  
const Tasks = () => <div>Tasks Content</div>;
const Analytics = () => <div>Analytics Content</div>;

const MainContent = () => {
  return (
    <main className="p-4">
      <Routes>
        <Route index element={<DashboardContent />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="analytics" element={<Analytics />} />
        {/* <Route path="settings" element={<Settings isOpen={true} onClose={() => {}} />} /> */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </main>
  );
};

export default MainContent;
