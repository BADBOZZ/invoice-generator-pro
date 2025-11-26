export type Currency = 'USD' | 'EUR' | 'GBP'

export type InvoiceStatus = 'draft' | 'awaiting_approval' | 'sent' | 'overdue' | 'paid'

export type Invoice = {
  id: string
  number: string
  client: string
  amount: number
  currency: Currency
  status: InvoiceStatus
  issuedOn: string
  dueOn: string
}

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected'

export type Quote = {
  id: string
  reference: string
  client: string
  amount: number
  currency: Currency
  status: QuoteStatus
  expiresOn: string
}

export type Contact = {
  id: string
  name: string
  company: string
  email: string
  lastInteraction: string
}

export type PaymentStatus = 'completed' | 'failed' | 'pending'

export type Payment = {
  id: string
  invoiceNumber: string
  method: 'card' | 'ach' | 'wire'
  amount: number
  currency: Currency
  status: PaymentStatus
  processedOn: string
}
