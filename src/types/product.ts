export const STATUS_IN_STOCK = 1 as const
export const STATUS_ON_ORDER = 2 as const

export type ProductStatus = typeof STATUS_IN_STOCK | typeof STATUS_ON_ORDER

export interface Product {
  id: number
  name: string
  category_name: string | null
  brand_name: string | null
  price: number
  rrp_price: number | null
  status: ProductStatus
}

export interface ProductInput {
  name: string
  price: number
  category_name?: string | null
  brand_name?: string | null
  rrp_price?: number | null
  status?: ProductStatus
}

export type ProductPatch = Partial<ProductInput>

export interface PricePoint {
  id: number
  price: number
}

export type BrandMinMax = [{ min: PricePoint }, { max: PricePoint }]

export interface ValidationErrorItem {
  field: string
  message: string
}

export interface ProductFormModel {
  name: string
  category_name: string | null
  brand_name: string | null
  price: number | null
  rrp_price: number | null
  status: number
}
