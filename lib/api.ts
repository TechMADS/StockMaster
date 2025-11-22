export const fetchData = async (endpoint: string) => {
  const response = await fetch(`/api/data${endpoint}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`)
  }
  return response.json()
}

export const getProducts = () => fetchData("/products")

export const getProduct = (id: string) => fetchData(`/products?id=${id}`)

export const getWarehouses = () => fetchData("/warehouses")

export const getWarehouse = (id: string) => fetchData(`/warehouses?id=${id}`)

export const getStockMovements = (type?: string, productId?: string) => {
  let query = "/stock-movements"
  const params = new URLSearchParams()
  if (type) params.append("type", type)
  if (productId) params.append("productId", productId)
  if (params.toString()) query += `?${params.toString()}`
  return fetchData(query)
}
