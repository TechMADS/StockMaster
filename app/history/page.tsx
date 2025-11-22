"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { HistoryTimeline } from "@/components/history/history-timeline"

export default function HistoryPage() {
  const { movements, products, loading } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading history...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Stock History</h1>
          <p className="text-muted-foreground mt-1">Complete transaction log and audit trail.</p>
        </div>

        <HistoryTimeline movements={movements} products={products} />
      </div>
    </AppLayout>
  )
}
