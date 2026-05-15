import { useMemo, useState } from 'react'
import { useGetProductsQuery } from '@/app/api'
import { debounce } from '@/shared/lib/utils'
import type { ProductFilters } from '@/shared/types'
import { useCallback, useEffect } from 'react'

const defaultFilters: ProductFilters = {
  category: 'all',
  audience: 'all',
  sort: 'newest',
  page: 1,
  limit: 12,
}

export function useProducts(initial?: Partial<ProductFilters>) {
  const [filters, setFilters] = useState<ProductFilters>({ ...defaultFilters, ...initial })
  const [searchInput, setSearchInput] = useState('')

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilters((f) => ({ ...f, search: value, page: 1 }))
      }, 350),
    [],
  )

  useEffect(() => {
    debouncedSetSearch(searchInput)
  }, [searchInput, debouncedSetSearch])

  const { data, isLoading, isFetching } = useGetProductsQuery(filters)

  const setFilter = useCallback((patch: Partial<ProductFilters>) => {
    setFilters((f) => ({ ...f, ...patch, page: patch.page ?? 1 }))
  }, [])

  const loadMore = useCallback(() => {
    setFilters((f) => ({ ...f, limit: (f.limit ?? 12) + 12 }))
  }, [])

  return {
    products: data?.items ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    filters,
    setFilter,
    searchInput,
    setSearchInput,
    isLoading,
    isFetching,
    loadMore,
  }
}
