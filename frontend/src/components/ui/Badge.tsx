import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const variantStyles = {
  default: 'bg-white/10 text-white',
  success: 'bg-emerald-500/20 text-emerald-300',
  warning: 'bg-amber-500/20 text-amber-200',
  danger: 'bg-rose-500/20 text-rose-200',
} as const

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variantStyles
}

const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => (
  <span
    className={cn('rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide', variantStyles[variant], className)}
    {...props}
  />
)

export default Badge
