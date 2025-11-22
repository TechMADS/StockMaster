"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { StockMovement, Product } from "@/lib/mock-data"
import { Calendar, ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Minus, Search } from "lucide-react"

interface HistoryTimelineProps {
  movements: StockMovement[]
  products: Product[]
}

export function HistoryTimeline({ movements, products }: HistoryTimelineProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "receipt":
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />
      case "delivery":
        return <ArrowUpRight className="h-5 w-5 text-blue-600" />
      case "transfer":
        return <ArrowRightLeft className="h-5 w-5 text-orange-600" />
      case "adjustment":
        return <Minus className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getMovementLabel = (type: string) => {
    switch (type) {
      case "receipt":
        return "Stock Receipt"
      case "delivery":
        return "Stock Delivery"
      case "transfer":
        return "Stock Transfer"
      case "adjustment":
        return "Stock Adjustment"
      default:
        return type
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

  const filteredMovements = movements
    .filter((m) => {
      const product = products.find((p) => p.id === m.productId)
      const matchesSearch =
        product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.reference.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock History</CardTitle>
        <CardDescription>Complete transaction log and audit trail</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by product or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 px-3 py-2 rounded-lg border border-input bg-background text-sm"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {filteredMovements.length > 0 ? (
              filteredMovements.map((movement, index) => {
                const product = products.find((p) => p.id === movement.productId)
                const date = new Date(movement.date)

                return (
                  <div key={movement.id} className="relative pl-20">
                    <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-card border-4 border-background flex items-center justify-center">
                      {getMovementIcon(movement.type)}
                    </div>

                    <div className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{getMovementLabel(movement.type)}</h3>
                          <p className="text-sm text-muted-foreground">{product?.name}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(movement.status)}>
                          {movement.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Reference</p>
                          <p className="font-mono font-medium">{movement.reference}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Quantity</p>
                          <p className="font-medium">
                            {movement.type === "delivery" || movement.type === "adjustment" ? "-" : "+"}
                            {movement.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Date</p>
                          <p className="font-medium">{date.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Time</p>
                          <p className="font-medium">{date.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">No history records found</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
