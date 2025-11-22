import type { Metadata } from "next"
import { AppLayout } from "@/components/layout/app-layout"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export const metadata: Metadata = {
  title: "Settings - StockMaster",
  description: "System settings and preferences",
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and system preferences.</p>
        </div>

        <div className="max-w-3xl">
          <SettingsTabs />
        </div>
      </div>
    </AppLayout>
  )
}
