import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  initials?: string
  src?: string
}

const Avatar = ({ className, initials = 'IG', src, ...props }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className={cn('h-9 w-9 rounded-full object-cover', className)}
        {...props}
      />
    )
  }

  return (
    <div
      className={cn(
        'h-9 w-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-center text-sm font-semibold leading-9 text-white',
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  )
}

export default Avatar
