"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StockDistributionChart } from "@/components/dashboard/stock-distribution-chart"
import { RecentMovements } from "@/components/dashboard/recent-movements"
import { TopProducts } from "@/components/dashboard/top-products"

export default function DashboardPage() {
  const { products, warehouses, movements, loading } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading dashboard...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your inventory overview.</p>
        </div>

        <div className="space-y-6">
          <DashboardHeader products={products} warehouses={warehouses} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <StockDistributionChart products={products} />
            <TopProducts products={products} />
          </div>

          <RecentMovements movements={movements} products={products} />
        </div>
      </div>
    </AppLayout>
  )
}
