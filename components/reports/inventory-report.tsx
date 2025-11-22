"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import type { Product } from "@/lib/mock-data"

interface InventoryReportProps {
  products: Product[]
}

export function InventoryReport({ products }: InventoryReportProps) {
  const categoryDistribution = products.reduce((acc: any, product) => {
    const existing = acc.find((item: any) => item.name === product.category)
    if (existing) {
      existing.value += product.currentStock * product.unitPrice
    } else {
      acc.push({ name: product.category, value: product.currentStock * product.unitPrice })
    }
    return acc
  }, [])

  const topMovers = products
    .map((p) => ({
      name: p.sku,
      value: p.currentStock * p.unitPrice,
      stock: p.currentStock,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const COLORS = [
    "var(--color-chart-1)",
    "var(--color-chart-2)",
    "var(--color-chart-3)",
    "var(--color-chart-4)",
    "var(--color-chart-5)",
  ]

  const metrics = [
    {
      title: "Total Inventory Value",
      value: `$${(products.reduce((sum, p) => sum + p.currentStock * p.unitPrice, 0) / 1000).toFixed(1)}k`,
    },
    {
      title: "Average Unit Price",
      value: `$${(products.reduce((sum, p) => sum + p.unitPrice, 0) / products.length).toFixed(2)}`,
    },
    {
      title: "Low Stock Items",
      value: products.filter((p) => p.currentStock <= p.reorderLevel).length,
    },
    {
      title: "Total SKUs",
      value: products.length,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{metric.title}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Value by Category</CardTitle>
          <CardDescription>Breakdown of inventory investment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${(value / 1000).toFixed(1)}k`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(1)}k`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Products by Value</CardTitle>
          <CardDescription>Highest value items in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMovers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: any) => `$${value.toFixed(0)}`} />
              <Legend />
              <Bar dataKey="value" fill="var(--color-chart-1)" name="Total Value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
