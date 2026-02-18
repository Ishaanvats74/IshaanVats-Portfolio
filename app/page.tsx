'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WindowsBoot from '@/components/WindowBoot'


export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Home')
    }, 3200)

    return () => clearTimeout(timer)
  }, [router])

  return <WindowsBoot />
}
