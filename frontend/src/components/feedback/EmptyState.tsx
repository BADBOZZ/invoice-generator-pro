import type { ReactNode } from 'react'

import Button from '@/components/ui/Button'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  illustration?: ReactNode
}

const EmptyState = ({ title, description, actionLabel, onAction, illustration }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center text-slate-300">
    {illustration}
    <h3 className="font-display text-2xl text-white">{title}</h3>
    <p className="max-w-xl text-sm text-slate-400">{description}</p>
    {actionLabel ? (
      <Button variant="secondary" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
)

export default EmptyState
