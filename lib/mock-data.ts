// Mock data for the inventory system
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "operator"
  avatar?: string
}

export interface Product {
  id: string
  sku: string
  name: string
  category: string
  description: string
  unitPrice: number
  reorderLevel: number
  currentStock: number
  warehouseLocations: { warehouseId: string; quantity: number }[]
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  currentUsage: number
  zones: { id: string; name: string; capacity: number }[]
}

export interface StockMovement {
  id: string
  type: "receipt" | "delivery" | "transfer" | "adjustment"
  productId: string
  quantity: number
  fromWarehouse?: string
  toWarehouse?: string
  date: string
  reference: string
  status: "pending" | "completed" | "cancelled"
}

export const currentUser: User = {
  id: "1",
  email: "manager@stockmaster.com",
  name: "Sarah Johnson",
  role: "manager",
}

export const mockProducts: Product[] = [
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

export const mockWarehouses: Warehouse[] = [
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

export const mockStockMovements: StockMovement[] = [
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
