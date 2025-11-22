"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { currentUser } from "@/lib/mock-data"
import { Mail, User, Shield } from "lucide-react"

export function AccountSettings() {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  })

  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Settings
        </CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Role
            </label>
            <div className="mt-1 p-3 rounded-lg bg-muted text-sm">
              {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit">Save Changes</Button>
            {saved && <span className="text-sm text-green-600 dark:text-green-400">Saved successfully</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
