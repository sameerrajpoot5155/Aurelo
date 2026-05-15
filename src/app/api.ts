import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { productService } from '@/services/productService'
import { orderService } from '@/services/orderService'
import type {
  Order,
  OrderStatus,
  PaginatedProducts,
  Product,
  ProductFilters,
  Review,
} from '@/shared/types'

export const aureloApi = createApi({
  reducerPath: 'aureloApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Products', 'Product', 'Orders', 'Reviews'],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, ProductFilters>({
      async queryFn(filters) {
        try {
          const data = await productService.getProducts(filters)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product | null, string>({
      async queryFn(id) {
        try {
          const data = await productService.getProductById(id)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      providesTags: (_r, _e, id) => [{ type: 'Product', id }],
    }),
    getFeatured: builder.query<Product[], void>({
      async queryFn() {
        try {
          const data = await productService.getFeatured()
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
    }),
    getRelated: builder.query<Product[], string>({
      async queryFn(id) {
        try {
          const data = await productService.getRelated(id)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
    }),
    getReviews: builder.query<Review[], string>({
      async queryFn(productId) {
        try {
          const data = await productService.getReviews(productId)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      providesTags: (_r, _e, id) => [{ type: 'Reviews', id }],
    }),
    getOrders: builder.query<Order[], string>({
      async queryFn(userId) {
        try {
          const data = await orderService.getOrders(userId)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      providesTags: ['Orders'],
    }),
    getAllOrders: builder.query<Order[], void>({
      async queryFn() {
        try {
          const data = await orderService.getAllOrders()
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation<Order, { orderId: string; status: OrderStatus }>({
      async queryFn({ orderId, status }) {
        try {
          const data = await orderService.updateStatus(orderId, status)
          return { data }
        } catch (error) {
          return { error: { message: String(error) } }
        }
      },
      invalidatesTags: ['Orders'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFeaturedQuery,
  useGetRelatedQuery,
  useGetReviewsQuery,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = aureloApi
