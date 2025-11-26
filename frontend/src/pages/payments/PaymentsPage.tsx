import EmptyState from '@/components/feedback/EmptyState'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { useDataStore } from '@/store/dataStore'

const PaymentsPage = () => {
  const cashflow = useDataStore((state) => state.dashboard.cashflow)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        subtitle="Monitor incoming funds, failed attempts, and reconciliation workflows."
        ctaLabel="Record manual payment"
      />

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <CardTitle>Realtime payout feed</CardTitle>
          <CardDescription>Pending API feed – preview of what&apos;s next.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3 text-sm text-slate-300">
            {cashflow.map((entry) => (
              <div key={entry.label}>
                <div className="flex items-center justify-between">
                  <p>{entry.label}</p>
                  <p className="font-semibold text-white">{entry.value}</p>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                    style={{ width: `${entry.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <EmptyState
            title="Live payments will flow in"
            description="Stripe, ACH, and offline payments will surface here with statuses, confirmations, and retry automations."
            actionLabel="Configure gateway"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentsPage
