import type { Metadata } from "next"
import { AppLayout } from "@/components/layout/app-layout"
import { DeliveriesOperations } from "@/components/operations/deliveries-operations"

export const metadata: Metadata = {
  title: "Deliveries - StockMaster",
  description: "Manage outgoing deliveries",
}

export default function DeliveriesPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Deliveries</h1>
        <p className="text-muted-foreground mb-8">Outgoing stock to customers.</p>
        <DeliveriesOperations />
      </div>
    </AppLayout>
  )
}
