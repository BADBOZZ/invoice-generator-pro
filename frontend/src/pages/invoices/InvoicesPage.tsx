import { useEffect, useState } from 'react'

import EmptyState from '@/components/feedback/EmptyState'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { invoiceService } from '@/services/invoiceService'
import { useDataStore } from '@/store/dataStore'
import type { Invoice } from '@/types/models'
import { formatCurrency } from '@/lib/utils'

const statusVariant: Record<Invoice['status'], 'default' | 'success' | 'warning' | 'danger'> = {
  draft: 'default',
  awaiting_approval: 'warning',
  sent: 'default',
  overdue: 'danger',
  paid: 'success',
}

const InvoicesPage = () => {
  const pipeline = useDataStore((state) => state.dashboard.pipeline)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await invoiceService.list()
        setInvoices(data)
      } finally {
        setIsLoading(false)
      }
    }
    loadInvoices()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        subtitle="Draft, send, and reconcile invoices across every client engagement."
        actions={<Button variant="secondary">Record payment</Button>}
        ctaLabel="New invoice"
      />

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <CardTitle>Pipeline summary</CardTitle>
          <CardDescription>Draft, awaiting approval, and sent statuses.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm md:grid-cols-3">
          {pipeline.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-white/5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.helper}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Latest invoices</CardTitle>
              <CardDescription>Live feed from the invoice service.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {['All', 'Draft', 'Awaiting Approval', 'Sent', 'Overdue'].map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-slate-200 px-3 py-1 text-slate-600 dark:border-white/10 dark:text-slate-300"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading invoices…</p>
          ) : invoices.length === 0 ? (
            <EmptyState
              title="No invoices yet"
              description="Create your first invoice to see live payment activity."
              actionLabel="Start invoice"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    <th className="py-2">Number</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Issued</th>
                    <th className="py-2">Due</th>
                    <th className="py-2 text-right">Amount</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-slate-100 last:border-0 dark:border-white/5"
                    >
                      <td className="py-3 font-medium text-slate-900 dark:text-white">{invoice.number}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">{invoice.client}</td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">
                        {new Date(invoice.issuedOn).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-slate-500 dark:text-slate-400">
                        {new Date(invoice.dueOn).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </td>
                      <td className="py-3 text-right">
                        <Badge variant={statusVariant[invoice.status]}>
                          {invoice.status.replace('_', ' ')}
                        </Badge>
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

export default InvoicesPage
