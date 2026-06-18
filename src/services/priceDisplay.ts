import { STATUS_ON_ORDER, type Product } from '@/types/product'

const RRP_BRANDS = ['dell', 'lenovo'] as const

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'KZT',
  maximumFractionDigits: 0,
})

export function getDisplayPrice(product: Product): string {
  if (product.status === STATUS_ON_ORDER) {
    return 'цена по запросу'
  }

  const brand = (product.brand_name ?? '').trim().toLowerCase()
  const value = (RRP_BRANDS as readonly string[]).includes(brand)
    ? (product.rrp_price ?? product.price)
    : product.price

  return formatter.format(value)
}

export function statusLabel(product: Product): string {
  return product.status === STATUS_ON_ORDER ? 'Под заказ' : 'В наличии'
}
