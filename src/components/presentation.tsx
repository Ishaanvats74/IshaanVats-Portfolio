'use client'
import { Children, createContext, isValidElement, useContext, type ReactNode, type ComponentProps } from 'react'
import Link from 'next/link'
import { defaultPresentation, copyReader, resolveLink, type Presentation } from '@/lib/presentation'
const Context = createContext<Presentation>(defaultPresentation)
export function PresentationProvider({value,children}:{value:Presentation;children:ReactNode}) {
 return <Context.Provider value={value}>{children}</Context.Provider>
}
export const usePresentation = () => useContext(Context)
export const useCopy = () => copyReader(usePresentation())
export function Copy({id}:{id:string}) { return useCopy()(id) }
export function Visible({name,children}:{name:string;children:ReactNode}) {
 const data=usePresentation()
 return data.sections.find(row=>row.key===name)?.enabled === false ? null : children
}
export function HomeSections({children}:{children:ReactNode}) {
 const data=usePresentation()
 const rows=Children.toArray(children).filter(child=>{
  if(!isValidElement<{id?:string}>(child)||!child.props.id)return true
  return data.sections.find(row=>row.key===child.props.id)?.enabled !== false
 }).sort((a,b)=>{
  const index=(item:ReactNode)=>isValidElement<{id?:string}>(item)&&item.props.id ? data.sections.findIndex(row=>row.key===item.props.id) : -1
  return index(a)-index(b)
 })
 return <div className="crimson-home" id="top">{rows}</div>
}
export function CMSLink(props:ComponentProps<typeof Link>) {
 const copy=useCopy()
 const href=typeof props.href==='string'?resolveLink(props.href,copy):props.href
 return href ? <Link {...props} href={href} /> : null
}
export function CMSAnchor(props:ComponentProps<'a'>) {
 const copy=useCopy()
 const href=props.href?resolveLink(props.href,copy):undefined
 return props.href&&!href ? null : <a {...props} href={href} />
}

export { resolveLink } from '@/lib/presentation'
