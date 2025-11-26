import EmptyState from '@/components/feedback/EmptyState'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'

const PaymentsPage = () => {
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
        <CardContent>
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
