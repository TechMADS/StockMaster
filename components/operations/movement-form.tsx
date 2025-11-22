"use client"

import { useState } from "react"
import type { Product, Warehouse } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MovementFormProps {
  type: "receipt" | "delivery" | "transfer" | "adjustment"
  products: Product[]
  warehouses: Warehouse[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function MovementForm({ type, products, warehouses, open, onOpenChange, onSubmit }: MovementFormProps) {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 0,
    fromWarehouse: "",
    toWarehouse: "",
    reference: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.productId) newErrors.productId = "Product is required"
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0"
    if (type === "transfer" && !formData.toWarehouse) newErrors.toWarehouse = "Target warehouse is required"
    if ((type === "delivery" || type === "transfer") && !formData.fromWarehouse)
      newErrors.fromWarehouse = "Source warehouse is required"
    if (!formData.reference) newErrors.reference = "Reference is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        type,
        status: "completed" as const,
        date: new Date().toISOString(),
      })
      setFormData({
        productId: "",
        quantity: 0,
        fromWarehouse: "",
        toWarehouse: "",
        reference: "",
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{type.charAt(0).toUpperCase() + type.slice(1)} Operation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select value={formData.productId} onValueChange={(val) => setFormData({ ...formData, productId: val })}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} ({p.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productId && <span className="text-xs text-destructive">{errors.productId}</span>}
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
              placeholder="0"
              className={errors.quantity ? "border-destructive" : ""}
            />
            {errors.quantity && <span className="text-xs text-destructive">{errors.quantity}</span>}
          </div>

          {(type === "delivery" || type === "transfer") && (
            <div>
              <Label htmlFor="fromWarehouse">From Warehouse</Label>
              <Select
                value={formData.fromWarehouse}
                onValueChange={(val) => setFormData({ ...formData, fromWarehouse: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fromWarehouse && <span className="text-xs text-destructive">{errors.fromWarehouse}</span>}
            </div>
          )}

          {(type === "receipt" || type === "transfer") && (
            <div>
              <Label htmlFor="toWarehouse">To Warehouse</Label>
              <Select
                value={formData.toWarehouse}
                onValueChange={(val) => setFormData({ ...formData, toWarehouse: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.toWarehouse && <span className="text-xs text-destructive">{errors.toWarehouse}</span>}
            </div>
          )}

          <div>
            <Label htmlFor="reference">Reference</Label>
            <Input
              id="reference"
              value={formData.reference}
              onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              placeholder="e.g., PO-2024-001"
              className={errors.reference ? "border-destructive" : ""}
            />
            {errors.reference && <span className="text-xs text-destructive">{errors.reference}</span>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Movement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
