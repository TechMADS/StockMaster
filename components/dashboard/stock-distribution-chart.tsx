"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Product } from "@/lib/mock-data"

interface StockDistributionChartProps {
  products: Product[]
}

export function StockDistributionChart({ products }: StockDistributionChartProps) {
  const chartData = products.map((p) => ({
    name: p.sku,
    stock: p.currentStock,
    reorderLevel: p.reorderLevel,
  }))

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Stock Distribution</CardTitle>
        <CardDescription>Current inventory levels vs reorder thresholds</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="var(--color-chart-1)" name="Current Stock" />
            <Bar dataKey="reorderLevel" fill="var(--color-chart-2)" name="Reorder Level" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
