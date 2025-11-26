import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60'

const variantStyles = {
  primary: 'bg-brand-500 text-white shadow-soft hover:bg-brand-400',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
  ghost: 'text-white hover:bg-white/10',
} as const

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/50 border-t-transparent" />
      )}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'

export default Button
