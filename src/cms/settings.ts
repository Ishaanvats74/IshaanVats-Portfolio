import type { GlobalConfig } from 'payload'
import { authenticated, refresh } from './collections'
import { image, relation, rows, seo, text, url } from './fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', label: 'Site settings', access: { read: () => true, update: authenticated },
  hooks: { afterChange: [({ doc }) => { refresh(); return doc }] },
  fields: [text('name', true), text('headline'), { name: 'biography', type: 'textarea' }, text('education'), text('location'), image('portrait'),
    { name: 'email', type: 'email' }, text('phone'), rows('socialLinks', [text('label', true), url('url')]),
    rows('navigation', [text('label', true), { name: 'href', type: 'text', required: true, validate: (value: unknown) => /^\/(?!\/)[a-z0-9\/#-]*$/.test(String(value)) || 'Use an internal path beginning with /.' }]),
    {name:'community',label:'Community on About',type:'group',admin:{description:'Community details shown only on the About page.'},fields:[
      {name:'enabled',label:'Show community',type:'checkbox',defaultValue:true},
      text('name'),text('role'),relation('organization','organizations',false),image('logo'),
      {name:'description',label:'Short community introduction',type:'textarea',maxLength:240,admin:{description:'Maximum 240 characters. Keep it concise.'}},url('website'),
    ]},
    text('footer'), seo,
    { name: 'homepage', type: 'group', fields: [text('eyebrow'), text('intro'), {name:'communityIntro',label:'Legacy community introduction',type:'textarea',maxLength:240,admin:{description:'Preserved introduction, maximum 240 characters. Edit the About community card in Community on About.'}}, rows('pillars', [text('title', true), { name: 'description', type: 'textarea', required: true }])] },
  ],
}
