import catalog from './ui-defaults.json'
import type { Presentation as PayloadPresentation } from '@/payload-types'
export type CopyRow = { key: string; label?: string; value?: string | null }
export type Presentation = {
  copy: CopyRow[]
  sections: { key: NonNullable<PayloadPresentation['sections']>[number]['key']; enabled?: boolean }[]
  originCards: { title: string; description: string; icon: 'education' | 'code' | 'users' }[]
  communityTags: { label: string }[]
  processSteps: { title: string; description: string }[]
  categories: { label: string }[]
}
export const defaultPresentation: Presentation = {
 copy: catalog,
 sections: ['hero','chapters','profile','arsenal','work','journey','certificates','events','process','navigation','contact','projects-page','about-page','experience-page','activities-page','hackathons-page','events-page','resume-page','writing-page','certificates-page','about-community','about-experience'].map(key => ({key:key as NonNullable<PayloadPresentation['sections']>[number]['key'],enabled:true})),
 originCards: [
 {title:'Education',description:'B.Sc. (Hons) CS @ SSCBS, University of Delhi',icon:'education'},
 {title:'Focus',description:'Full-Stack Systems & AI Engineering',icon:'code'},
 ],
 communityTags: ['Hackathon Organizer','Community Builder','Sponsorship Lead'].map(label=>({label})),
 processSteps: [['Observe','Find the right question.'],['Connect','Connect the ideas.'],['Experiment','Test what matters.'],['Build','Make it useful.'],['Learn','Reflect. Refine. Repeat.']].map(([title,description])=>({title,description})),
 categories: ['Languages','Frontend','Backend','AI','Databases','Infrastructure / Other'].map(label=>({label})),
}
export function copyReader(presentation: Pick<Presentation,'copy'>) {
 const values = new Map(presentation.copy.map(row=>[row.key,row.value || '']))
 return (key: string, fallback = '') => values.get(key) ?? fallback
}
export function linkKey(href: string) { return `link.${href}` }

export function resolveLink(value:string, copy:(key:string,fallback?:string)=>string) {
 const target=copy(linkKey(value),value)
 if (!target) return ''
 return /^(?:\/(?!\/)|#|https?:\/\/|mailto:|tel:)/.test(target) ? target : '#'
}
