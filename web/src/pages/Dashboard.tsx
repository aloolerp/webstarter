// src/pages/Dashboard.tsx

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
// import Header from "@/components/dashboard/Header";


const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      
      case "pro":
        return <h2>Analytics!</h2>;
      default:
        return <div>Welcome to the Dashboard!</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelectView={setActiveView} activeView={activeView} />
      <div className="flex-1 flex flex-col overflow-auto">
        {/* <Header /> */}
        
      <main className="flex-1 p-4">
        {renderContent()}
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
