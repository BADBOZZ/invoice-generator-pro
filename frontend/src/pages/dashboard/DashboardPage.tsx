import StatCard from '@/components/data/StatCard'
import EmptyState from '@/components/feedback/EmptyState'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { useDataStore } from '@/store/dataStore'

const DashboardPage = () => {
  const dashboard = useDataStore((state) => state.dashboard)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Track invoices, approvals, and payments from a single, intelligent workspace."
        ctaLabel="Create invoice"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
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
            {dashboard.approvals.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-slate-300">
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{item.dueLabel}</span>
              </div>
            ))}
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
            {dashboard.cashflow.map((entry) => (
              <div key={entry.label}>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <p>{entry.label}</p>
                  <p className="font-semibold text-white">{entry.value}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: `${entry.percent}%` }}
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
