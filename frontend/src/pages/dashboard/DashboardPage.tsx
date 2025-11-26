import { FileText, LineChart, Receipt, Wallet } from 'lucide-react'

import StatCard from '@/components/data/StatCard'
import EmptyState from '@/components/feedback/EmptyState'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Track invoices, approvals, and payments from a single, intelligent workspace."
        ctaLabel="Create invoice"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Invoice Volume"
          value="$82,450"
          helper="Across 48 invoices"
          trend="up"
          trendLabel="12%"
          icon={Receipt}
        />
        <StatCard
          label="Open Quotes"
          value="14"
          helper="Awaiting approval"
          trend="neutral"
          icon={FileText}
        />
        <StatCard
          label="Payments Received"
          value="$56,210"
          helper="Past 30 days"
          trend="up"
          trendLabel="8%"
          icon={Wallet}
        />
        <StatCard
          label="At-Risk"
          value="$8,540"
          helper="Beyond net terms"
          trend="down"
          trendLabel="5%"
          icon={LineChart}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="items-center justify-between">
            <div>
              <CardTitle>Approvals</CardTitle>
              <CardDescription>Quotes and invoices queued for review.</CardDescription>
            </div>
            <Button size="sm" variant="secondary">
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between text-slate-300">
              <div>
                <p className="font-medium text-white">QTE-2042 • Summit Labs</p>
                <p className="text-xs text-slate-500">Awaiting client approval</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Due today</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <div>
                <p className="font-medium text-white">INV-8831 • Nova Retail</p>
                <p className="text-xs text-slate-500">Finance review</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">2 days</span>
            </div>
            <EmptyState
              title="More automations coming"
              description="Once the backend is wired, approvals will update as soon as your customers interact with proposals."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="items-center justify-between">
            <div>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Snapshot of receivables status.</CardDescription>
            </div>
            <Button size="sm" variant="ghost">
              Export report
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Current', '7 days overdue', '30 days overdue'].map((label, index) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <p>{label}</p>
                  <p className="font-semibold text-white">
                    {['$44,210', '$6,120', '$2,420'][index]}
                  </p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: `${[68, 32, 18][index]}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
