"use client"

import { useInventory } from "@/hooks/use-inventory"
import { OperationsTabs } from "./operations-tabs"

export function DeliveriesOperations() {
  const { products, warehouses, movements, loading, handleAddMovement, handleDeleteMovement } = useInventory()

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <OperationsTabs
      movements={movements}
      products={products}
      warehouses={warehouses}
      onAddMovement={handleAddMovement}
      onDeleteMovement={handleDeleteMovement}
      activeType="delivery"
    />
  )
}
