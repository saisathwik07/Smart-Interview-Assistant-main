'use client'

import React from "react"
import WelcomeContainer from "../dashboard/_components/WelcomeContainer"
import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supabaseClient"
import { useRouter } from "next/navigation"
import { LogOut, User, Bell, Shield, Palette } from "lucide-react"
import { motion } from "framer-motion"

function Settings() {
  const router = useRouter()

  const handleSignOut = async () => {
    document.cookie = "guest_session=; path=/; max-age=0";
    await supabase.auth.signOut()
    router.push("/")
  }

  const settingsSections = [
    {
      icon: User,
      title: "Profile",
      desc: "Manage your account details and preferences",
      color: "from-blue-500 to-cyan-400",
      action: "Edit Profile",
      disabled: true,
    },
    {
      icon: Bell,
      title: "Notifications",
      desc: "Configure email and push notification settings",
      color: "from-violet-500 to-purple-400",
      action: "Configure",
      disabled: true,
    },
    {
      icon: Shield,
      title: "Security",
      desc: "Two-factor authentication and session management",
      color: "from-emerald-500 to-teal-400",
      action: "Manage",
      disabled: true,
    },
    {
      icon: Palette,
      title: "Appearance",
      desc: "Theme preferences and display settings",
      color: "from-amber-500 to-orange-400",
      action: "Customize",
      disabled: true,
    },
  ]

  return (
    <div className="min-h-screen">
      <WelcomeContainer />
      
      <h2 className="font-bold text-xl text-foreground mt-8 mb-5">Settings</h2>

      <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
        {settingsSections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5 flex items-start gap-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
              <section.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{section.desc}</p>
              <Button variant="outline" size="sm" className="mt-3 rounded-xl text-xs" disabled={section.disabled}>
                {section.action}
                {section.disabled && <span className="ml-1.5 text-[10px] bg-accent px-1.5 py-0.5 rounded-full">Soon</span>}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 max-w-4xl">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
          <p className="text-sm text-muted-foreground mb-4">Sign out of your account or delete your data</p>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings
