import type { LucideIcon } from 'lucide-react'

export type DashboardStat = {
  label: string
  value: string
  helper?: string
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  icon?: LucideIcon
}

export type ApprovalItem = {
  id: string
  title: string
  subtitle: string
  dueLabel: string
}

export type CashflowItem = {
  label: string
  value: string
  percent: number
}

export type PipelineStat = {
  label: string
  value: string
  helper: string
}

export type DashboardData = {
  stats: DashboardStat[]
  approvals: ApprovalItem[]
  cashflow: CashflowItem[]
  pipeline: PipelineStat[]
}
