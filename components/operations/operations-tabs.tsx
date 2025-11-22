"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { StockMovement, Product, Warehouse } from "@/lib/mock-data"
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Minus, Plus, Trash2 } from "lucide-react"
import { MovementForm } from "./movement-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface OperationsTabsProps {
  movements: StockMovement[]
  products: Product[]
  warehouses: Warehouse[]
  onAddMovement: (movement: any) => void
  onDeleteMovement: (id: string) => void
  activeType?: "receipt" | "delivery" | "transfer" | "adjustment"
}

export function OperationsTabs({
  movements,
  products,
  warehouses,
  onAddMovement,
  onDeleteMovement,
  activeType = "receipt",
}: OperationsTabsProps) {
  const [selectedType, setSelectedType] = useState<"receipt" | "delivery" | "transfer" | "adjustment">(activeType)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const tabs = [
    { type: "receipt" as const, label: "Receipts", icon: ArrowDownLeft },
    { type: "delivery" as const, label: "Deliveries", icon: ArrowUpRight },
    { type: "transfer" as const, label: "Transfers", icon: ArrowRightLeft },
    { type: "adjustment" as const, label: "Adjustments", icon: Minus },
  ]

  const filteredMovements = movements.filter((m) => m.type === selectedType)

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

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || "Unknown"
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stock Operations</CardTitle>
              <CardDescription>Manage inventory movements</CardDescription>
            </div>
            <Button onClick={() => setFormOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Operation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.type}
                  variant={selectedType === tab.type ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setSelectedType(tab.type)}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>

          <div className="space-y-3">
            {filteredMovements.length > 0 ? (
              filteredMovements.map((movement) => {
                const date = new Date(movement.date)

                return (
                  <div
                    key={movement.id}
                    className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{getProductName(movement.productId)}</h3>
                        <p className="text-sm text-muted-foreground">{movement.reference}</p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline" className={getStatusColor(movement.status)}>
                          {movement.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive bg-transparent"
                          onClick={() => setDeleteId(movement.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Quantity</p>
                        <p className="font-bold">
                          {selectedType === "delivery" || selectedType === "adjustment" ? "-" : "+"}
                          {movement.quantity}
                        </p>
                      </div>
                      {movement.fromWarehouse && (
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">From</p>
                          <p className="font-medium">{movement.fromWarehouse}</p>
                        </div>
                      )}
                      {movement.toWarehouse && (
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">To</p>
                          <p className="font-medium">{movement.toWarehouse}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">Date</p>
                        <p className="font-medium">{date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No {tabs.find((t) => t.type === selectedType)?.label.toLowerCase()} found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <MovementForm
        type={selectedType}
        products={products}
        warehouses={warehouses}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={onAddMovement}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Movement?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The movement record will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (deleteId) {
                onDeleteMovement(deleteId)
                setDeleteId(null)
              }
            }}
            className="bg-destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
