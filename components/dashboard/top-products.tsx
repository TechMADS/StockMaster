"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/mock-data"

interface TopProductsProps {
  products: Product[]
}

export function TopProducts({ products }: TopProductsProps) {
  const topByValue = products.sort((a, b) => b.currentStock * b.unitPrice - a.currentStock * a.unitPrice).slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products by Value</CardTitle>
        <CardDescription>Highest inventory value</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topByValue.map((product) => {
            const value = product.currentStock * product.unitPrice
            const maxValue = Math.max(...topByValue.map((p) => p.currentStock * p.unitPrice))
            const percentage = (value / maxValue) * 100

            return (
              <div key={product.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sku}</p>
                  </div>
                  <p className="text-sm font-bold">${value.toFixed(0)}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
