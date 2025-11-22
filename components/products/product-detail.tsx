"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts, mockWarehouses } from "@/lib/mock-data"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const product = mockProducts.find((p) => p.id === productId)

  if (!product) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">Product not found</CardContent>
      </Card>
    )
  }

  const warehouseData = product.warehouseLocations.map((loc) => {
    const warehouse = mockWarehouses.find((w) => w.id === loc.warehouseId)
    return {
      name: warehouse?.name || loc.warehouseId,
      quantity: loc.quantity,
    }
  })

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <CardDescription>{product.sku}</CardDescription>
            </div>
            <Badge>{product.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{product.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Unit Price</p>
              <p className="text-lg font-bold">${product.unitPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p className="text-lg font-bold">{product.currentStock}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reorder Level</p>
              <p className="text-lg font-bold">{product.reorderLevel}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-lg font-bold">${(product.currentStock * product.unitPrice).toFixed(0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Distribution by Warehouse</CardTitle>
          <CardDescription>Inventory across locations</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={warehouseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, quantity }) => `${name}: ${quantity}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="quantity"
              >
                {warehouseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Locations</CardTitle>
          <CardDescription>Stock quantity by warehouse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {warehouseData.map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.quantity} units</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
