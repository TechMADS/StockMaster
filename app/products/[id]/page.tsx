"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { ProductDetail } from "@/components/products/product-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <AppLayout>
      <div className="p-8">
        <Button variant="outline" className="mb-6 bg-transparent" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <ProductDetail productId={params.id} />
      </div>
    </AppLayout>
  )
}
