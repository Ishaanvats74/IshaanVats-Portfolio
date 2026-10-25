'use client'
import { Copy } from '@/components/presentation'
import { ArrowUpRight } from 'lucide-react'
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="container inner-page"><div className="page-heading"><span className="eyebrow"><Copy id="app.frontend.error.tsx.1" /></span><h1><Copy id="app.frontend.error.tsx.2" /></h1><p><Copy id="app.frontend.error.tsx.3" /></p></div><button className="button" onClick={reset}><Copy id="app.frontend.error.tsx.4" /> <ArrowUpRight size={16} aria-hidden="true" /></button></div> }
