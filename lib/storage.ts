import type { Product, Warehouse, StockMovement } from "./mock-data"

const STORAGE_KEYS = {
  PRODUCTS: "sm_products",
  WAREHOUSES: "sm_warehouses",
  MOVEMENTS: "sm_movements",
}

// Initialize with mock data if not present
export const initializeStorage = () => {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    const mockProducts: Product[] = [
      {
        id: "1",
        sku: "SKU-001",
        name: "Industrial Widget A",
        category: "Electronics",
        description: "High-quality industrial widget",
        unitPrice: 45.99,
        reorderLevel: 50,
        currentStock: 245,
        warehouseLocations: [
          { warehouseId: "W1", quantity: 150 },
          { warehouseId: "W2", quantity: 95 },
        ],
      },
      {
        id: "2",
        sku: "SKU-002",
        name: "Premium Component B",
        category: "Components",
        description: "Precision engineered component",
        unitPrice: 127.5,
        reorderLevel: 25,
        currentStock: 89,
        warehouseLocations: [{ warehouseId: "W1", quantity: 89 }],
      },
      {
        id: "3",
        sku: "SKU-003",
        name: "Standard Part C",
        category: "Parts",
        description: "Reliable standard part",
        unitPrice: 22.0,
        reorderLevel: 100,
        currentStock: 340,
        warehouseLocations: [{ warehouseId: "W2", quantity: 340 }],
      },
      {
        id: "4",
        sku: "SKU-004",
        name: "Specialty Equipment D",
        category: "Equipment",
        description: "Specialized industrial equipment",
        unitPrice: 899.99,
        reorderLevel: 5,
        currentStock: 12,
        warehouseLocations: [{ warehouseId: "W1", quantity: 12 }],
      },
      {
        id: "5",
        sku: "SKU-005",
        name: "Bulk Material E",
        category: "Materials",
        description: "Raw material in bulk",
        unitPrice: 8.5,
        reorderLevel: 500,
        currentStock: 1250,
        warehouseLocations: [{ warehouseId: "W2", quantity: 1250 }],
      },
    ]
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts))
  }

  if (!localStorage.getItem(STORAGE_KEYS.WAREHOUSES)) {
    const mockWarehouses: Warehouse[] = [
      {
        id: "W1",
        name: "Main Warehouse",
        location: "New York, NY",
        capacity: 5000,
        currentUsage: 3256,
        zones: [
          { id: "Z1", name: "Zone A - Electronics", capacity: 1500 },
          { id: "Z2", name: "Zone B - Equipment", capacity: 1500 },
          { id: "Z3", name: "Zone C - Storage", capacity: 2000 },
        ],
      },
      {
        id: "W2",
        name: "Secondary Warehouse",
        location: "New Jersey, NJ",
        capacity: 3000,
        currentUsage: 1685,
        zones: [
          { id: "Z4", name: "Zone D - Bulk", capacity: 1500 },
          { id: "Z5", name: "Zone E - Archive", capacity: 1500 },
        ],
      },
    ]
    localStorage.setItem(STORAGE_KEYS.WAREHOUSES, JSON.stringify(mockWarehouses))
  }

  if (!localStorage.getItem(STORAGE_KEYS.MOVEMENTS)) {
    const mockMovements: StockMovement[] = [
      {
        id: "SM001",
        type: "receipt",
        productId: "1",
        quantity: 100,
        toWarehouse: "W1",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        reference: "PO-2024-001",
        status: "completed",
      },
      {
        id: "SM002",
        type: "delivery",
        productId: "2",
        quantity: 25,
        fromWarehouse: "W1",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        reference: "SO-2024-042",
        status: "completed",
      },
      {
        id: "SM003",
        type: "transfer",
        productId: "3",
        quantity: 50,
        fromWarehouse: "W1",
        toWarehouse: "W2",
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        reference: "TR-2024-005",
        status: "completed",
      },
      {
        id: "SM004",
        type: "adjustment",
        productId: "4",
        quantity: -2,
        fromWarehouse: "W1",
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        reference: "ADJ-2024-001",
        status: "completed",
      },
    ]
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(mockMovements))
  }
}

// Product functions
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
  return data ? JSON.parse(data) : []
}

export const getProduct = (id: string): Product | undefined => {
  return getProducts().find((p) => p.id === id)
}

export const addProduct = (product: Omit<Product, "id">): Product => {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: `P${Date.now()}`,
  }
  products.push(newProduct)
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
  return newProduct
}

export const updateProduct = (id: string, updates: Partial<Product>): Product | undefined => {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return undefined
  products[index] = { ...products[index], ...updates }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
  return products[index]
}

export const deleteProduct = (id: string): boolean => {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered))
  return true
}

// Warehouse functions
export const getWarehouses = (): Warehouse[] => {
  const data = localStorage.getItem(STORAGE_KEYS.WAREHOUSES)
  return data ? JSON.parse(data) : []
}

export const getWarehouse = (id: string): Warehouse | undefined => {
  return getWarehouses().find((w) => w.id === id)
}

export const updateWarehouse = (id: string, updates: Partial<Warehouse>): Warehouse | undefined => {
  const warehouses = getWarehouses()
  const index = warehouses.findIndex((w) => w.id === id)
  if (index === -1) return undefined
  warehouses[index] = { ...warehouses[index], ...updates }
  localStorage.setItem(STORAGE_KEYS.WAREHOUSES, JSON.stringify(warehouses))
  return warehouses[index]
}

// Stock Movement functions
export const getStockMovements = (): StockMovement[] => {
  const data = localStorage.getItem(STORAGE_KEYS.MOVEMENTS)
  return data ? JSON.parse(data) : []
}

export const addStockMovement = (movement: Omit<StockMovement, "id">): StockMovement => {
  const movements = getStockMovements()
  const newMovement: StockMovement = {
    ...movement,
    id: `SM${Date.now()}`,
  }
  movements.push(newMovement)
  localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements))
  return newMovement
}

export const updateStockMovement = (id: string, updates: Partial<StockMovement>): StockMovement | undefined => {
  const movements = getStockMovements()
  const index = movements.findIndex((m) => m.id === id)
  if (index === -1) return undefined
  movements[index] = { ...movements[index], ...updates }
  localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements))
  return movements[index]
}

export const deleteStockMovement = (id: string): boolean => {
  const movements = getStockMovements()
  const filtered = movements.filter((m) => m.id !== id)
  if (filtered.length === movements.length) return false
  localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(filtered))
  return true
}
