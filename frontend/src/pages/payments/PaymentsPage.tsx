import { useEffect, useState } from 'react'

import EmptyState from '@/components/feedback/EmptyState'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { paymentService } from '@/services/paymentService'
import { useDataStore } from '@/store/dataStore'
import type { Payment } from '@/types/models'
import { formatCurrency } from '@/lib/utils'

const statusVariant: Record<Payment['status'], 'default' | 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  failed: 'danger',
  pending: 'warning',
}

const PaymentsPage = () => {
  const cashflow = useDataStore((state) => state.dashboard.cashflow)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await paymentService.list()
        setPayments(data)
      } finally {
        setLoading(false)
      }
    }

    loadPayments()
  }, [])

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
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {cashflow.map((entry) => (
              <div key={entry.label}>
                <div className="flex items-center justify-between">
                  <p>{entry.label}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{entry.value}</p>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-white/5">
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

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <CardTitle>Latest transactions</CardTitle>
          <CardDescription>Real payments pulled from the payments service.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading payments…</p>
          ) : payments.length === 0 ? (
            <EmptyState
              title="No transactions yet"
              description="Connect a payment provider to see successful payouts and failures."
              actionLabel="Add provider"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    <th className="py-2">Invoice</th>
                    <th className="py-2">Method</th>
                    <th className="py-2">Processed</th>
                    <th className="py-2 text-right">Amount</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 last:border-0 dark:border-white/5"
                    >
                      <td className="py-3 font-medium text-slate-900 dark:text-white">
                        {payment.invoiceNumber}
                      </td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">{payment.method}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">
                        {new Date(payment.processedOn).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(payment.amount, payment.currency)}
                      </td>
                      <td className="py-3 text-right">
                        <Badge variant={statusVariant[payment.status]}>{payment.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentsPage
