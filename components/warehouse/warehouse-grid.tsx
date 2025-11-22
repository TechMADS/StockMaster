"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Warehouse } from "@/lib/mock-data"
import { MapPin, Package } from "lucide-react"

interface WarehouseGridProps {
  warehouses: Warehouse[]
}

export function WarehouseGrid({ warehouses }: WarehouseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {warehouses.map((warehouse) => {
        const usagePercentage = (warehouse.currentUsage / warehouse.capacity) * 100

        return (
          <Card key={warehouse.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {warehouse.name}
                  </CardTitle>
                  <CardDescription>{warehouse.location}</CardDescription>
                </div>
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {usagePercentage.toFixed(0)}% Full
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">
                    {warehouse.currentUsage.toLocaleString()} / {warehouse.capacity.toLocaleString()} units
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Zones ({warehouse.zones.length})
                </h4>
                <div className="space-y-2">
                  {warehouse.zones.map((zone) => (
                    <div key={zone.id} className="text-sm p-2 rounded bg-muted">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{zone.name}</span>
                        <span className="text-xs text-muted-foreground">{zone.capacity} units</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
