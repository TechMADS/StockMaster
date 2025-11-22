"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { WarehouseGrid } from "@/components/warehouse/warehouse-grid"

export default function WarehousesPage() {
  const { warehouses, loading } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading warehouses...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Warehouses</h1>
          <p className="text-muted-foreground mt-1">Monitor warehouse capacity and zones.</p>
        </div>

        <WarehouseGrid warehouses={warehouses} />
      </div>
    </AppLayout>
  )
}
