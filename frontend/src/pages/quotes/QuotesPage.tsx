import EmptyState from '@/components/feedback/EmptyState'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'

const QuotesPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotes"
        subtitle="Build branded proposals, capture signatures, and convert wins instantly."
        ctaLabel="New quote"
        actions={<Button variant="ghost">Import CSV</Button>}
      />

      <EmptyState
        title="Quote board coming soon"
        description="Kanban views, approval flows, and PDF previews will populate here once API endpoints are connected."
        actionLabel="Review templates"
      />
    </div>
  )
}

export default QuotesPage
