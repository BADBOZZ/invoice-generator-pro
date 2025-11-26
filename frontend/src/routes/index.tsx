import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const LandingPage = lazy(() => import('@/pages/Landing'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))

export const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ])
