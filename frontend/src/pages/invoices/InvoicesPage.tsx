import EmptyState from '@/components/feedback/EmptyState'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { useDataStore } from '@/store/dataStore'

const InvoicesPage = () => {
  const pipeline = useDataStore((state) => state.dashboard.pipeline)

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
            <div key={item.label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              <p className="text-xs text-slate-400">{item.helper}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <EmptyState
        title="Connect the backend to see live invoices"
        description="Once API responses are available, this space will list every invoice with filters, bulk actions, and contextual insights."
        actionLabel="Preview invoice template"
      />
    </div>
  )
}

export default InvoicesPage
