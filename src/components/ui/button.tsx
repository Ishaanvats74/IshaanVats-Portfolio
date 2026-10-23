import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Button({ asChild = false, className, ...props }: ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn('button', className)} {...props} />
}
