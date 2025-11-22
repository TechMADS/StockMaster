import { NextResponse } from "next/server"

export async function GET() {
  try {
    const users = await import("@/public/data/users.json")
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
