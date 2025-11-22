"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, AlertCircle, TrendingUp, Package } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newReceipt: true,
    deliveryComplete: true,
    dailyDigest: false,
  })

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const settings = [
    {
      id: "lowStock",
      icon: AlertCircle,
      label: "Low Stock Alerts",
      description: "Get notified when inventory falls below reorder level",
    },
    {
      id: "newReceipt",
      icon: Package,
      label: "New Receipts",
      description: "Notify when new stock receipts are registered",
    },
    {
      id: "deliveryComplete",
      icon: TrendingUp,
      label: "Delivery Complete",
      description: "Notify when stock deliveries are completed",
    },
    {
      id: "dailyDigest",
      icon: Bell,
      label: "Daily Digest",
      description: "Receive a summary of daily inventory activities",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>Configure notification preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {settings.map((setting) => {
            const Icon = setting.icon
            const isEnabled = notifications[setting.id as keyof typeof notifications]

            return (
              <div key={setting.id} className="flex items-start justify-between p-3 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleNotification(setting.id as keyof typeof notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isEnabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
