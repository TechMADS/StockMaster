"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getWarehouses,
  updateWarehouse,
  getStockMovements,
  addStockMovement,
  updateStockMovement,
  deleteStockMovement,
  initializeStorage,
} from "@/lib/storage"
import type { Product, Warehouse, StockMovement } from "@/lib/mock-data"

export const useInventory = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [movements, setMovements] = useState<StockMovement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeStorage()
    setProducts(getProducts())
    setWarehouses(getWarehouses())
    setMovements(getStockMovements())
    setLoading(false)
  }, [])

  const refreshData = useCallback(() => {
    setProducts(getProducts())
    setWarehouses(getWarehouses())
    setMovements(getStockMovements())
  }, [])

  // Product operations
  const handleAddProduct = useCallback((product: Omit<Product, "id">) => {
    const newProduct = addProduct(product)
    setProducts((prev) => [...prev, newProduct])
    return newProduct
  }, [])

  const handleUpdateProduct = useCallback((id: string, updates: Partial<Product>) => {
    const updated = updateProduct(id, updates)
    if (updated) {
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    }
    return updated
  }, [])

  const handleDeleteProduct = useCallback((id: string) => {
    const success = deleteProduct(id)
    if (success) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
    return success
  }, [])

  // Warehouse operations
  const handleUpdateWarehouse = useCallback((id: string, updates: Partial<Warehouse>) => {
    const updated = updateWarehouse(id, updates)
    if (updated) {
      setWarehouses((prev) => prev.map((w) => (w.id === id ? updated : w)))
    }
    return updated
  }, [])

  // Stock movement operations
  const handleAddMovement = useCallback(
    (movement: Omit<StockMovement, "id">) => {
      const newMovement = addStockMovement(movement)
      setMovements((prev) => [newMovement, ...prev])

      // Update product stock
      const product = getProduct(movement.productId)
      if (product) {
        let newStock = product.currentStock
        if (movement.type === "receipt") {
          newStock += movement.quantity
        } else if (movement.type === "delivery" || movement.type === "transfer") {
          newStock -= movement.quantity
        } else if (movement.type === "adjustment") {
          newStock += movement.quantity
        }
        handleUpdateProduct(movement.productId, { currentStock: newStock })
      }

      return newMovement
    },
    [handleUpdateProduct],
  )

  const handleUpdateMovement = useCallback((id: string, updates: Partial<StockMovement>) => {
    const updated = updateStockMovement(id, updates)
    if (updated) {
      setMovements((prev) => prev.map((m) => (m.id === id ? updated : m)))
    }
    return updated
  }, [])

  const handleDeleteMovement = useCallback((id: string) => {
    const success = deleteStockMovement(id)
    if (success) {
      setMovements((prev) => prev.filter((m) => m.id !== id))
    }
    return success
  }, [])

  return {
    products,
    warehouses,
    movements,
    loading,
    refreshData,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleUpdateWarehouse,
    handleAddMovement,
    handleUpdateMovement,
    handleDeleteMovement,
  }
}

export const useProducts = () => {
  const { products, handleAddProduct, handleUpdateProduct, handleDeleteProduct } = useInventory()
  return { products, handleAddProduct, handleUpdateProduct, handleDeleteProduct }
}

export const useWarehouses = () => {
  const { warehouses, handleUpdateWarehouse } = useInventory()
  return { warehouses, handleUpdateWarehouse }
}

export const useStockMovements = () => {
  const { movements, handleAddMovement, handleUpdateMovement, handleDeleteMovement } = useInventory()
  return { movements, handleAddMovement, handleUpdateMovement, handleDeleteMovement }
}
