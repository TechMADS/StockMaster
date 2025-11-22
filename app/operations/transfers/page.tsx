import type { Metadata } from "next"
import { AppLayout } from "@/components/layout/app-layout"
import { TransfersOperations } from "@/components/operations/transfers-operations"

export const metadata: Metadata = {
  title: "Transfers - StockMaster",
  description: "Manage inter-warehouse transfers",
}

export default function TransfersPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Transfers</h1>
        <p className="text-muted-foreground mb-8">Move stock between warehouses.</p>
        <TransfersOperations />
      </div>
    </AppLayout>
  )
}
