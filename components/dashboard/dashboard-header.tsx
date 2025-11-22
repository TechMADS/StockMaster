"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Package, Warehouse, AlertCircle } from "lucide-react"
import type { Product, Warehouse as WarehouseType } from "@/lib/mock-data"

interface DashboardHeaderProps {
  products: Product[]
  warehouses: WarehouseType[]
}

export function DashboardHeader({ products, warehouses }: DashboardHeaderProps) {
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0)
  const lowStockItems = products.filter((p) => p.currentStock <= p.reorderLevel).length
  const warehouseUtilization = Math.round(
    (warehouses.reduce((sum, w) => sum + w.currentUsage, 0) / warehouses.reduce((sum, w) => sum + w.capacity, 0)) * 100,
  )

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      description: "Active SKUs",
      icon: Package,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Stock Value",
      value: `$${(products.reduce((sum, p) => sum + p.currentStock * p.unitPrice, 0) / 1000).toFixed(1)}k`,
      description: "Inventory value",
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      title: "Warehouse Usage",
      value: `${warehouseUtilization}%`,
      description: "Capacity utilized",
      icon: Warehouse,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      description: "Need reordering",
      icon: AlertCircle,
      color: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
