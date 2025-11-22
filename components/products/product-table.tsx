"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/mock-data"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { ProductForm } from "./product-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProductTableProps {
  products: Product[]
  onViewProduct?: (productId: string) => void
  onAddProduct: (product: any) => void
  onUpdateProduct: (id: string, updates: any) => void
  onDeleteProduct: (id: string) => void
}

export function ProductTable({
  products,
  onViewProduct,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (currentStock: number, reorderLevel: number) => {
    if (currentStock <= reorderLevel) {
      return { label: "Low Stock", color: "bg-red-500/10 text-red-700 dark:text-red-400" }
    }
    if (currentStock <= reorderLevel * 1.5) {
      return { label: "Medium", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" }
    }
    return { label: "Healthy", color: "bg-green-500/10 text-green-700 dark:text-green-400" }
  }

  const handleAddClick = () => {
    setEditingProduct(undefined)
    setFormOpen(true)
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setFormOpen(true)
  }

  const handleFormSubmit = (formData: any) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formData)
    } else {
      onAddProduct(formData)
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDeleteProduct(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your inventory products</CardDescription>
            </div>
            <Button onClick={handleAddClick} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-sm">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Product Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product.currentStock, product.reorderLevel)

                  return (
                    <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{product.sku}</td>
                      <td className="py-3 px-4 text-sm font-medium">{product.name}</td>
                      <td className="py-3 px-4 text-sm">{product.category}</td>
                      <td className="py-3 px-4 text-sm">${product.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="font-medium">{product.currentStock}</span>
                        <span className="text-muted-foreground ml-1">/ {product.reorderLevel}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={status.color}>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => onViewProduct?.(product.id)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => handleEditClick(product)}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive bg-transparent"
                            onClick={() => setDeleteId(product.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </CardContent>
      </Card>

      <ProductForm product={editingProduct} open={formOpen} onOpenChange={setFormOpen} onSubmit={handleFormSubmit} />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The product will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
