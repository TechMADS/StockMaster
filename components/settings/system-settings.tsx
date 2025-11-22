"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Database, Moon } from "lucide-react"

export function SystemSettings() {
  const [theme, setTheme] = useState("auto")
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Display Settings
          </CardTitle>
          <CardDescription>Customize your interface appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-3 block">Theme</label>
            <div className="space-y-2">
              {[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "auto", label: "Auto (System)" },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted"
                >
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={theme === option.value}
                    onChange={(e) => setTheme(e.target.value)}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Backup and data export options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium text-sm">Auto Backup</p>
              <p className="text-xs text-muted-foreground">Automatic daily backups</p>
            </div>
            <button
              onClick={() => setAutoBackup(!autoBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoBackup ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoBackup ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Export Data
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Last Backup: Today at 2:00 AM
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Account security and password settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Active Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
