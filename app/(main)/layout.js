import React from "react";
import DashboardProvider from "./provider";

function DashboardLayout({children}) {
  return (
    <div className="gradient-bg min-h-screen">
      <DashboardProvider>
        <div className='p-6 md:p-8 lg:p-10'>
          {children}
        </div>
      </DashboardProvider>
    </div>
  );
}
export default DashboardLayout;
