"use client"

import { useInventory } from "@/hooks/use-inventory"
import { AppLayout } from "@/components/layout/app-layout"
import { ProductTable } from "@/components/products/product-table"
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const router = useRouter()
  const { products, loading, handleAddProduct, handleUpdateProduct, handleDeleteProduct } = useInventory()

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">
          <div className="text-center py-12">Loading products...</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">View and manage all products in your inventory.</p>
        </div>

        <ProductTable
          products={products}
          onViewProduct={(id) => router.push(`/products/${id}`)}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </AppLayout>
  )
}
