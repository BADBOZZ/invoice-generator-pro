import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  BadgeDollarSign,
} from 'lucide-react'

export type NavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const primaryNav: NavItem[] = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { label: 'Invoices', path: '/app/invoices', icon: FileText },
  { label: 'Quotes', path: '/app/quotes', icon: BadgeDollarSign },
  { label: 'Contacts', path: '/app/contacts', icon: Users },
  { label: 'Payments', path: '/app/payments', icon: CreditCard },
]

export const secondaryNav: NavItem[] = [
  { label: 'Settings', path: '/app/settings', icon: Settings },
]
