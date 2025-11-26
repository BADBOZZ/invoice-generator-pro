import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => (
    <div className="space-y-1.5">
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none',
          error && 'border-red-400/60',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  ),
)

Input.displayName = 'Input'

export default Input
