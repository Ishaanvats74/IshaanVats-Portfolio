import type { Field, GlobalConfig } from 'payload'
import { authenticated, refresh } from './collections'
const short=(name:string,label:string,limit=120):Field=>({name,label,type:'text',maxLength:limit,admin:{description:`${label}. Maximum ${limit} characters; clear optional text to hide it.`}})
const list=(name:string,label:string,fields:Field[]):Field=>({name,label,type:'array',admin:{initCollapsed:true,description:`Edit, remove or drag rows to reorder ${label.toLowerCase()}.`},fields})
export const Presentation:GlobalConfig={
 slug:'presentation',label:'Website presentation',access:{read:()=>true,update:authenticated},
 hooks:{afterChange:[({doc})=>{refresh();return doc}]},
 fields:[
 list('sections','Section visibility and order',[
  {name:'key',label:'Section',type:'select',required:true,options:['hero','chapters','profile','arsenal','work','journey','community','events','process','navigation','contact','projects-page','community-page','about-page','experience-page','activities-page','hackathons-page','events-page','resume-page','writing-page'],admin:{description:'Stable section identifier. Homepage rows also control display order.'}},
  {name:'enabled',label:'Visible',type:'checkbox',defaultValue:true,admin:{description:'Turn off to hide this section without deleting content.'}},
 ]),
 list('originCards','Origin cards',[short('title','Title',35),short('description','Description'),{name:'icon',label:'SVG icon',type:'select',options:['education','code','users'],defaultValue:'code',admin:{description:'Choose a clean SVG icon.'}}]),
 list('communityTags','Community badges',[short('label','Badge label',45)]),
 list('processSteps','Process steps',[short('title','Step title',35),short('description','Step description')]),
 list('categories','Skill category order',[short('label','Category name',45)]),
 list('copy','Page copy, Japanese accents and links',[
  {name:'key',label:'Content key',type:'text',required:true,admin:{description:'Stable identifier from the copy audit. Keep this unchanged when editing text.'}},
  short('label','Editor label',90),
  {name:'value',label:'Displayed text or URL',type:'textarea',maxLength:240,validate:(value,{siblingData})=> typeof value !== 'string' || value.length <= (String(siblingData && 'key' in siblingData ? siblingData.key : '').startsWith('link.') ? 240 : 120) || 'Keep display copy under 120 characters.',admin:{description:'Maximum 120 characters for copy; 240 for link URLs. Japanese accents are separate rows. Empty text removes the copy; link rows accept internal paths, anchors, HTTP(S), mailto or tel.'}},
 ]),
 ]
}
