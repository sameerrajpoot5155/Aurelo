import { useCallback } from 'react'
import { toast } from 'sonner'
import { useGetOrdersQuery, aureloApi } from '@/app/api'
import { useAppDispatch } from './redux'
import { orderService } from '@/services/orderService'
import { useAuth } from './useAuth'
import type { OrderStatus } from '@/shared/types'

export function useOrders(statusFilter?: OrderStatus | 'all') {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useGetOrdersQuery(user?.id ?? '', {
    skip: !user,
  })

  const filtered =
    statusFilter && statusFilter !== 'all'
      ? orders.filter((o) => o.status === statusFilter)
      : orders

  const cancelOrder = useCallback(
    async (orderId: string) => {
      if (!user) return
      try {
        await orderService.cancelOrder(orderId, user.id)
        dispatch(aureloApi.util.invalidateTags(['Orders']))
        toast.success('Order cancelled')
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Could not cancel order')
      }
    },
    [user, dispatch],
  )

  return { orders: filtered, allOrders: orders, isLoading, refetch, cancelOrder }
}
