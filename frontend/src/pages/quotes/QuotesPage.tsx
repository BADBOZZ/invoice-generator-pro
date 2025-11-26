import { useEffect, useState } from 'react'

import EmptyState from '@/components/feedback/EmptyState'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { quoteService } from '@/services/quoteService'
import type { Quote } from '@/types/models'
import { formatCurrency } from '@/lib/utils'

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await quoteService.list()
        setQuotes(data)
      } finally {
        setLoading(false)
      }
    }

    loadQuotes()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotes"
        subtitle="Build branded proposals, capture signatures, and convert wins instantly."
        ctaLabel="New quote"
        actions={<Button variant="ghost">Import CSV</Button>}
      />

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <CardTitle>Active quotes</CardTitle>
          <CardDescription>Each card updates in realtime as clients respond.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {loading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading quotes…</p>
          ) : quotes.length === 0 ? (
            <EmptyState
              title="Quote board coming soon"
              description="Kanban views, approval flows, and PDF previews will populate here once API endpoints are connected."
              actionLabel="Review templates"
            />
          ) : (
            quotes.map((quote) => (
              <div
                key={quote.id}
                className="space-y-3 rounded-3xl border border-slate-200/70 bg-white p-5 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quote</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {quote.reference}
                    </p>
                  </div>
                  <Badge variant={quote.status === 'accepted' ? 'success' : 'default'}>
                    {quote.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{quote.client}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(quote.amount, quote.currency)}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Expires {new Date(quote.expiresOn).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default QuotesPage
