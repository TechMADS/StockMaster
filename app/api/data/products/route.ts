import { NextResponse } from "next/server"
import products from "@/public/data/products.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const product = products.find((p) => p.id === id)
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
