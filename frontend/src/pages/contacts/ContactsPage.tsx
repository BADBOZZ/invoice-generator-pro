import EmptyState from '@/components/feedback/EmptyState'
import PageHeader from '@/components/ui/PageHeader'

const ContactsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        subtitle="Every customer, vendor, and supplier in one collaborative timeline."
        ctaLabel="Add contact"
      />

      <EmptyState
        title="Contact timeline pending data"
        description="Once the backend is ready, each timeline will outline invoices, payments, and key activities."
        actionLabel="Upload CSV"
      />
    </div>
  )
}

export default ContactsPage
