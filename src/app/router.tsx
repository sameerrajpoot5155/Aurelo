import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { ProtectedRoute, AdminRoute } from './layout/ProtectedRoute'
import { Skeleton } from '@/shared/ui'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ShopPage = lazy(() => import('@/pages/ShopPage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const CartPage = lazy(() => import('@/pages/CartPage'))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const AccountPage = lazy(() => import('@/pages/AccountPage'))
const OrdersPage = lazy(() => import('@/pages/OrdersPage'))
const WishlistPage = lazy(() => import('@/pages/WishlistPage'))
const AdminPage = lazy(() => import('@/pages/AdminPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Skeleton className="h-8 w-48" />
    </div>
  )
}

function lazyPage(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: lazyPage(ErrorPage),
    children: [
      { index: true, element: lazyPage(HomePage) },
      { path: 'shop', element: lazyPage(ShopPage) },
      { path: 'product/:id', element: lazyPage(ProductPage) },
      { path: 'cart', element: lazyPage(CartPage) },
      {
        path: 'checkout',
        element: <ProtectedRoute>{lazyPage(CheckoutPage)}</ProtectedRoute>,
      },
      { path: 'login', element: lazyPage(LoginPage) },
      { path: 'register', element: lazyPage(RegisterPage) },
      { path: 'wishlist', element: lazyPage(WishlistPage) },
      {
        path: 'account',
        element: <ProtectedRoute>{lazyPage(AccountPage)}</ProtectedRoute>,
        children: [{ path: 'orders', element: lazyPage(OrdersPage) }],
      },
      {
        path: 'admin',
        element: <AdminRoute>{lazyPage(AdminPage)}</AdminRoute>,
      },
      { path: '500', element: lazyPage(ErrorPage) },
      { path: '*', element: lazyPage(NotFoundPage) },
    ],
  },
])
