"use client"
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SiderBarOptions } from "@/services/Constants";
import { useUser } from "@/app/provider";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { Plus, LogOut, Sparkles, Sun, Moon } from "lucide-react";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function AppSidebar() {
  const path = usePathname();
  const user = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    document.cookie = "guest_session=; path=/; max-age=0";
    await supabase.auth.signOut();
    router.push("/");
  };

  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className='flex flex-col items-center pt-6 pb-4 px-4'>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-md shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">AiCruiter</span>
        </div>
        
        <Button 
          className='w-full gradient-primary text-white font-semibold rounded-xl shadow-md shadow-teal-500/20 hover:opacity-90 transition-all' 
          onClick={() => router.push('/dashboard/create-interview')}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {SiderBarOptions.map((option, index) => {
            const isActive = path === option.path;
            return (
              <SidebarMenuItem key={index} className='mb-0.5'>
                <SidebarMenuButton asChild className={`py-5 px-4 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 border border-primary/20 shadow-sm' 
                    : 'hover:bg-accent'
                }`}>
                  <Link href={option.path}>
                    <div className="flex items-center gap-3">
                      <option.icon className={`w-[18px] h-[18px] transition-colors ${
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}/>
                      <span className={`text-[14px] font-medium transition-colors ${
                        isActive ? 'text-primary' : 'text-foreground/80'
                      }`}>{option.name}</span>
                    </div>
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-l-full gradient-primary" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-2">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
          <button onClick={toggleDarkMode} className="p-1.5 rounded-lg hover:bg-accent transition-colors" title="Toggle Dark Mode">
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
          </button>
          <button onClick={handleSignOut} className="p-1.5 rounded-lg hover:bg-accent transition-colors" title="Sign Out">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
