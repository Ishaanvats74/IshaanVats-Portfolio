'use client'
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="container inner-page"><div className="page-heading"><span className="eyebrow">A BRIEF INTERRUPTION</span><h1>Let’s try again.</h1><p>This page couldn’t load. Please try again in a moment.</p></div><button className="button" onClick={reset}>Try again ↗</button></div> }
