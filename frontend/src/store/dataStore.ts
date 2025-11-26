import { create } from 'zustand'
import { BadgeDollarSign, LineChart, Receipt, Wallet } from 'lucide-react'

import type { DashboardData } from '@/types/dashboard'

type DataState = {
  dashboard: DashboardData
  isLoading: boolean
  error?: string
  hydrate: (payload: Partial<DashboardData>) => void
  setLoading: (loading: boolean) => void
  setError: (message?: string) => void
}

const initialDashboard: DashboardData = {
  stats: [
    {
      label: 'Invoice Volume',
      value: '$82,450',
      helper: 'Across 48 invoices',
      trend: 'up',
      trendLabel: '12%',
      icon: Receipt,
    },
    {
      label: 'Open Quotes',
      value: '14',
      helper: 'Awaiting approval',
      trend: 'neutral',
      icon: BadgeDollarSign,
    },
    {
      label: 'Payments Received',
      value: '$56,210',
      helper: 'Past 30 days',
      trend: 'up',
      trendLabel: '8%',
      icon: Wallet,
    },
    {
      label: 'At-Risk',
      value: '$8,540',
      helper: 'Beyond net terms',
      trend: 'down',
      trendLabel: '5%',
      icon: LineChart,
    },
  ],
  approvals: [
    {
      id: 'QTE-2042',
      title: 'QTE-2042 • Summit Labs',
      subtitle: 'Awaiting client approval',
      dueLabel: 'Due today',
    },
    {
      id: 'INV-8831',
      title: 'INV-8831 • Nova Retail',
      subtitle: 'Finance review',
      dueLabel: '2 days',
    },
  ],
  cashflow: [
    { label: 'Current', value: '$44,210', percent: 68 },
    { label: '7 days overdue', value: '$6,120', percent: 32 },
    { label: '30 days overdue', value: '$2,420', percent: 18 },
  ],
  pipeline: [
    { label: 'Drafts', value: '11', helper: 'Ready for review' },
    { label: 'Awaiting approval', value: '7', helper: 'Client action needed' },
    { label: 'Past due', value: '3', helper: 'Auto-reminders enabled' },
  ],
}

export const useDataStore = create<DataState>((set) => ({
  dashboard: initialDashboard,
  isLoading: false,
  hydrate: (payload) =>
    set((state) => ({
      dashboard: { ...state.dashboard, ...payload },
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
