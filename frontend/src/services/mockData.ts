import { BadgeDollarSign, LineChart, Receipt, Wallet } from 'lucide-react'

import type { DashboardData } from '@/types/dashboard'
import type { Contact, Invoice, Payment, Quote } from '@/types/models'

export const mockUser = {
  id: 'demo-user',
  name: 'Ariana Steele',
  email: 'ariana@invoicepro.app',
}

export const dashboardMock: DashboardData = {
  stats: [
    {
      label: 'Invoice Volume',
      value: '$82,450',
      helper: 'Across 48 invoices',
      trend: 'up',
      trendLabel: '12%',
      icon: Receipt,
    },
    {
      label: 'Open Quotes',
      value: '14',
      helper: 'Awaiting approval',
      trend: 'neutral',
      icon: BadgeDollarSign,
    },
    {
      label: 'Payments Received',
      value: '$56,210',
      helper: 'Past 30 days',
      trend: 'up',
      trendLabel: '8%',
      icon: Wallet,
    },
    {
      label: 'At-Risk',
      value: '$8,540',
      helper: 'Beyond net terms',
      trend: 'down',
      trendLabel: '5%',
      icon: LineChart,
    },
  ],
  approvals: [
    {
      id: 'QTE-2042',
      title: 'QTE-2042 • Summit Labs',
      subtitle: 'Awaiting client approval',
      dueLabel: 'Due today',
    },
    {
      id: 'INV-8831',
      title: 'INV-8831 • Nova Retail',
      subtitle: 'Finance review',
      dueLabel: '2 days',
    },
  ],
  cashflow: [
    { label: 'Current', value: '$44,210', percent: 68 },
    { label: '7 days overdue', value: '$6,120', percent: 32 },
    { label: '30 days overdue', value: '$2,420', percent: 18 },
  ],
  pipeline: [
    { label: 'Drafts', value: '11', helper: 'Ready for review' },
    { label: 'Awaiting approval', value: '7', helper: 'Client action needed' },
    { label: 'Past due', value: '3', helper: 'Auto-reminders enabled' },
  ],
}

export const invoicesMock: Invoice[] = [
  {
    id: 'inv-1',
    number: 'INV-2042',
    client: 'Summit Labs',
    amount: 12450,
    currency: 'USD',
    status: 'awaiting_approval',
    issuedOn: '2025-11-20',
    dueOn: '2025-12-05',
  },
  {
    id: 'inv-2',
    number: 'INV-2043',
    client: 'Nova Retail',
    amount: 8900,
    currency: 'USD',
    status: 'sent',
    issuedOn: '2025-11-18',
    dueOn: '2025-12-02',
  },
]

export const quotesMock: Quote[] = [
  {
    id: 'quote-1',
    reference: 'QTE-5021',
    client: 'Mosaic Labs',
    amount: 5600,
    currency: 'USD',
    status: 'sent',
    expiresOn: '2025-12-15',
  },
]

export const contactsMock: Contact[] = [
  {
    id: 'contact-1',
    name: 'Evelyn Reyes',
    company: 'Summit Labs',
    email: 'evelyn@summitlabs.com',
    lastInteraction: '2025-11-24',
  },
]

export const paymentsMock: Payment[] = [
  {
    id: 'pay-1',
    invoiceNumber: 'INV-2031',
    method: 'card',
    amount: 4200,
    currency: 'USD',
    status: 'completed',
    processedOn: '2025-11-21',
  },
]
