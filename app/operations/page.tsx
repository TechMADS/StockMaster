"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { OperationsTabs } from "@/components/operations/operations-tabs"

export default function OperationsPage() {
  const { products, warehouses, movements, loading, handleAddMovement, handleDeleteMovement } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading operations...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Operations</h1>
          <p className="text-muted-foreground mt-1">View and manage stock movements.</p>
        </div>

        <OperationsTabs
          movements={movements}
          products={products}
          warehouses={warehouses}
          onAddMovement={handleAddMovement}
          onDeleteMovement={handleDeleteMovement}
        />
      </div>
    </AppLayout>
  )
}
