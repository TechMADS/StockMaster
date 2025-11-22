import type { Metadata } from "next"
import { AppLayout } from "@/components/layout/app-layout"
import { AdjustmentsOperations } from "@/components/operations/adjustments-operations"

export const metadata: Metadata = {
  title: "Adjustments - StockMaster",
  description: "Manage inventory adjustments",
}

export default function AdjustmentsPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">Adjustments</h1>
        <p className="text-muted-foreground mb-8">Stock count corrections and write-offs.</p>
        <AdjustmentsOperations />
      </div>
    </AppLayout>
  )
}
