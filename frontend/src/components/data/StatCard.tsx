import type { LucideIcon } from 'lucide-react'

import Badge from '@/components/ui/Badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

type StatCardProps = {
  label: string
  value: string
  helper?: string
  trendLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: LucideIcon
}

const trendConfig = {
  up: { text: 'text-emerald-600 dark:text-emerald-300', prefix: '+' },
  down: { text: 'text-rose-500 dark:text-rose-300', prefix: '−' },
  neutral: { text: 'text-slate-500 dark:text-slate-400', prefix: '' },
}

const StatCard = ({ label, value, helper, trendLabel, trend = 'neutral', icon: Icon }: StatCardProps) => (
  <Card className="space-y-4">
    <CardHeader className="items-center justify-between gap-2">
      <CardTitle>{label}</CardTitle>
      {Icon ? (
        <div className="rounded-2xl bg-white/10 p-2 text-white/80">
          <Icon className="h-4 w-4" />
        </div>
      ) : null}
    </CardHeader>
    <div>
      <p className="font-display text-3xl text-slate-900 dark:text-white">{value}</p>
      {trendLabel ? (
        <p className={`mt-2 flex items-center gap-2 text-sm ${trendConfig[trend].text}`}>
          <Badge
            variant={trend === 'down' ? 'danger' : trend === 'up' ? 'success' : 'default'}
            className="uppercase"
          >
            {trendConfig[trend].prefix}
            {trendLabel}
          </Badge>
          vs last period
        </p>
      ) : null}
      {helper ? <CardDescription className="mt-3">{helper}</CardDescription> : null}
    </div>
  </Card>
)

export default StatCard
