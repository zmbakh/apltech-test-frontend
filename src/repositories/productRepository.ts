import http from '@/api/http'
import type { BrandMinMax, Product, ProductInput, ProductPatch } from '@/types/product'

export interface ProductRepositoryContract {
  getAll(): Promise<Product[]>
  getById(id: number | string): Promise<Product>
  create(input: ProductInput): Promise<Product>
  update(id: number | string, fields: ProductPatch): Promise<Product>
  getBrandMinMax(brand: string): Promise<BrandMinMax>
}

export const productRepository: ProductRepositoryContract = {
  async getAll() {
    const { data } = await http.get<Product[]>('/api/products')
    return data
  },

  async getById(id) {
    const { data } = await http.get<Product>(`/api/product/${id}`)
    return data
  },

  async create(input) {
    const { data } = await http.post<Product>('/api/product/create', input)
    return data
  },

  async update(id, fields) {
    const { data } = await http.patch<Product>(`/api/product/update/${id}`, fields)
    return data
  },

  async getBrandMinMax(brand) {
    const { data } = await http.get<BrandMinMax>(`/api/product/brand/${encodeURIComponent(brand)}`)
    return data
  },
}
