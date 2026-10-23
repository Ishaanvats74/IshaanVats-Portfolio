import type { GlobalConfig } from 'payload'
import { authenticated, refresh } from './collections'
import { image, rows, seo, text, url } from './fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', label: 'Site settings', access: { read: () => true, update: authenticated },
  hooks: { afterChange: [({ doc }) => { refresh(); return doc }] },
  fields: [text('name', true), text('headline'), { name: 'biography', type: 'textarea' }, text('education'), text('location'), image('portrait'),
    { name: 'email', type: 'email' }, text('phone'), rows('socialLinks', [text('label', true), url('url')]),
    rows('navigation', [text('label', true), { name: 'href', type: 'text', required: true, validate: (value: unknown) => /^\/(?!\/)[a-z0-9\/#-]*$/.test(String(value)) || 'Use an internal path beginning with /.' }]),
    text('footer'), seo,
    { name: 'homepage', type: 'group', fields: [text('eyebrow'), text('intro'), text('communityIntro'), rows('pillars', [text('title', true), { name: 'description', type: 'textarea', required: true }])] },
  ],
}
