import { NextResponse } from "next/server"
import warehouses from "@/public/data/warehouses.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const warehouse = warehouses.find((w) => w.id === id)
      if (!warehouse) {
        return NextResponse.json({ error: "Warehouse not found" }, { status: 404 })
      }
      return NextResponse.json(warehouse)
    }

    return NextResponse.json(warehouses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch warehouses" }, { status: 500 })
  }
}
