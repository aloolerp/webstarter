import React from "react";
import PrimaryNavbar from "../layout/PrimaryNavbar"; 
import PrimaryFooter from "../layout/PrimaryFooter"; 
import {ScrollArrow} from "../layout/ScrollArrow"


interface LayoutProps {
  children: React.ReactNode; // The content that will be displayed inside the layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <PrimaryNavbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 lg:px-8 ">
        
    
        {children}
        
         </main>

      {/* Footer */}
      <PrimaryFooter />
      <ScrollArrow />
    
    </div>
  );
};

export default Layout;
