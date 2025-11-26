import type { ReactNode } from 'react'

import Button from './Button'

type PageHeaderProps = {
  title: string
  subtitle?: string
  actions?: ReactNode
  ctaLabel?: string
  onCtaClick?: () => void
}

const PageHeader = ({ title, subtitle, actions, ctaLabel, onCtaClick }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200/60 pb-6 dark:border-white/5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-500/70 dark:text-brand-300/70">
          Workspace
        </p>
        <h1 className="mt-2 font-display text-3xl text-slate-900 dark:text-white">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {actions}
        {ctaLabel ? (
          <Button onClick={onCtaClick} className="whitespace-nowrap">
            {ctaLabel}
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default PageHeader
