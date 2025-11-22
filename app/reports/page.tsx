"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { InventoryReport } from "@/components/reports/inventory-report"

export default function ReportsPage() {
  const { products, loading } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading reports...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Inventory analytics and insights.</p>
        </div>

        <InventoryReport products={products} />
      </div>
    </AppLayout>
  )
}
