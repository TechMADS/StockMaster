import type { Metadata } from "next"
import { AppLayout } from "@/components/layout/app-layout"
import { ReceiptsOperations } from "@/components/operations/receipts-operations"

export const metadata: Metadata = {
  title: "Receipts - StockMaster",
  description: "Manage stock receipts",
}

export default function ReceiptsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Receipts</h1>
        <p className="text-muted-foreground mb-8">Incoming stock from suppliers.</p>
        <ReceiptsOperations />
      </div>
    </AppLayout>
  )
}
