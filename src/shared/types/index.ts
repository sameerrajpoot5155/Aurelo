export type ProductCategory = 'movie' | 'anime' | 'casual' | 'customize'
export type ProductAudience = 'men' | 'women' | 'unisex'
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
export type OrderStatus = 'pending' | 'active' | 'delivered' | 'cancelled'
export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'bank'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  category: ProductCategory
  audience: ProductAudience
  images: string[]
  sizes: ProductSize[]
  tags: string[]
  rating: number
  reviewCount: number
  featured?: boolean
  inStock: boolean
}

export interface CartLineItem {
  productId: string
  size: ProductSize
  quantity: number
  product?: Product
}

export interface CartLineKey {
  productId: string
  size: ProductSize
}

export interface Address {
  id: string
  label: string
  fullName: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  isDefault?: boolean
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'customer' | 'admin'
  addresses: Address[]
  createdAt: string
}

export interface OrderTimelineEvent {
  id: string
  status: OrderStatus
  label: string
  timestamp: string
  description?: string
}

export interface Order {
  id: string
  userId: string
  items: Array<{
    productId: string
    name: string
    size: ProductSize
    quantity: number
    price: number
    image: string
  }>
  status: OrderStatus
  subtotal: number
  shipping: number
  total: number
  shippingAddress: Address
  paymentMethod: PaymentMethod
  timeline: OrderTimelineEvent[]
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  category?: ProductCategory | 'all'
  audience?: ProductAudience | 'all'
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating'
  page?: number
  limit?: number
}

export interface PaginatedProducts {
  items: Product[]
  total: number
  page: number
  totalPages: number
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData extends AuthCredentials {
  name: string
}
