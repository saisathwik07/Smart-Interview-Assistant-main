import { SidebarProvider} from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSiderbar";



function DashboardProvider({children})
{
  return (
    <SidebarProvider>
       <AppSidebar />
    <div className="w-full">
    {/*<SidebarTrigger />*/}
   
      {children}
      </div>
      </SidebarProvider>
  )
}
export default DashboardProvider