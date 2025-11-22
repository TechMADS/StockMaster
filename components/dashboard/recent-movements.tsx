"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product, StockMovement } from "@/lib/mock-data"
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Minus } from "lucide-react"

interface RecentMovementsProps {
  movements: StockMovement[]
  products: Product[]
}

export function RecentMovements({ movements, products }: RecentMovementsProps) {
  const getMovementIcon = (type: string) => {
    switch (type) {
      case "receipt":
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case "delivery":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "transfer":
        return <ArrowRightLeft className="h-4 w-4 text-orange-600" />
      case "adjustment":
        return <Minus className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "cancelled":
        return "bg-red-500/10 text-red-700 dark:text-red-400"
      default:
        return ""
    }
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Movements</CardTitle>
        <CardDescription>Latest stock transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {movements.slice(0, 6).map((movement) => {
            const product = products.find((p) => p.id === movement.productId)
            const date = new Date(movement.date)

            return (
              <div key={movement.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">{getMovementIcon(movement.type)}</div>
                  <div>
                    <p className="font-medium text-sm">{product?.name}</p>
                    <p className="text-xs text-muted-foreground">{movement.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">
                    {movement.type === "delivery" || movement.type === "adjustment" ? "-" : "+"}
                    {movement.quantity}
                  </p>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(movement.status)}`}>
                    {movement.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
