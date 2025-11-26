import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const LandingPage = lazy(() => import('@/pages/Landing'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))
const AppLayout = lazy(() => import('@/layouts/AppLayout'))
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const InvoicesPage = lazy(() => import('@/pages/invoices/InvoicesPage'))
const QuotesPage = lazy(() => import('@/pages/quotes/QuotesPage'))
const ContactsPage = lazy(() => import('@/pages/contacts/ContactsPage'))
const PaymentsPage = lazy(() => import('@/pages/payments/PaymentsPage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))

export const AppRoutes = () =>
  useRoutes([
    { path: '/', element: <LandingPage /> },
    {
      path: '/app',
      element: <AppLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'invoices', element: <InvoicesPage /> },
        { path: 'quotes', element: <QuotesPage /> },
        { path: 'contacts', element: <ContactsPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ])
