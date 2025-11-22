"use client"

import { useState } from "react"
import type { Product } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormProps {
  product?: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function ProductForm({ product, open, onOpenChange, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    sku: product?.sku || "",
    name: product?.name || "",
    category: product?.category || "Electronics",
    description: product?.description || "",
    unitPrice: product?.unitPrice || 0,
    reorderLevel: product?.reorderLevel || 0,
    currentStock: product?.currentStock || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.sku) newErrors.sku = "SKU is required"
    if (!formData.name) newErrors.name = "Product name is required"
    if (formData.unitPrice <= 0) newErrors.unitPrice = "Unit price must be greater than 0"
    if (formData.reorderLevel < 0) newErrors.reorderLevel = "Reorder level cannot be negative"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        sku: "",
        name: "",
        category: "Electronics",
        description: "",
        unitPrice: 0,
        reorderLevel: 0,
        currentStock: 0,
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="e.g., SKU-001"
              className={errors.sku ? "border-destructive" : ""}
            />
            {errors.sku && <span className="text-xs text-destructive">{errors.sku}</span>}
          </div>

          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Product name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Components">Components</SelectItem>
                <SelectItem value="Parts">Parts</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Materials">Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unitPrice">Unit Price ($)</Label>
              <Input
                id="unitPrice"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className={errors.unitPrice ? "border-destructive" : ""}
              />
              {errors.unitPrice && <span className="text-xs text-destructive">{errors.unitPrice}</span>}
            </div>

            <div>
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                className={errors.reorderLevel ? "border-destructive" : ""}
              />
              {errors.reorderLevel && <span className="text-xs text-destructive">{errors.reorderLevel}</span>}
            </div>
          </div>

          <div>
            <Label htmlFor="currentStock">Current Stock</Label>
            <Input
              id="currentStock"
              type="number"
              value={formData.currentStock}
              onChange={(e) => setFormData({ ...formData, currentStock: Number.parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{product ? "Update" : "Add"} Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
