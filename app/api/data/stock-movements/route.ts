import { NextResponse } from "next/server"
import movements from "@/public/data/stock-movements.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const productId = searchParams.get("productId")

    let filtered = movements

    if (type) {
      filtered = filtered.filter((m) => m.type === type)
    }

    if (productId) {
      filtered = filtered.filter((m) => m.productId === productId)
    }

    return NextResponse.json(filtered)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stock movements" }, { status: 500 })
  }
}
