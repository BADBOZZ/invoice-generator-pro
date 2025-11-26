import { useEffect, useState } from 'react'

import EmptyState from '@/components/feedback/EmptyState'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { contactService } from '@/services/contactService'
import type { Contact } from '@/types/models'

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await contactService.list()
        setContacts(data)
      } finally {
        setLoading(false)
      }
    }
    loadContacts()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        subtitle="Every customer, vendor, and supplier in one collaborative timeline."
        ctaLabel="Add contact"
      />

      <Card>
        <CardHeader className="flex-col items-start gap-2">
          <CardTitle>Relationship timeline</CardTitle>
          <CardDescription>Recent interactions pulled from CRM and billing events.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading contacts…</p>
          ) : contacts.length === 0 ? (
            <EmptyState
              title="Contact timeline pending data"
              description="Once the backend is ready, each timeline will outline invoices, payments, and key activities."
              actionLabel="Upload CSV"
            />
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-white/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {contact.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{contact.company}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Last touch {new Date(contact.lastInteraction).toLocaleDateString()}
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{contact.email}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactsPage
