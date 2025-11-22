"use client"

import { useState } from "react"
import { User, Bell, SettingsIcon } from "lucide-react"
import { AccountSettings } from "./account-settings"
import { NotificationSettings } from "./notification-settings"
import { SystemSettings } from "./system-settings"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("account")

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: SettingsIcon },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div>
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "system" && <SystemSettings />}
      </div>
    </div>
  )
}
