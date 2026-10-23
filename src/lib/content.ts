export type Media = { id: number; url?: string; alt?: string; width?: number; height?: number; mimeType?: string }
export type Entry = {
  id: number; title: string; slug?: string; tagline?: string; description?: string; excerpt?: string;
  category?: string; role?: string; technologies?: { name: string }[]; tags?: { name: string }[];
  coverImage?: Media; poster?: Media; logo?: Media; icon?: Media; gallery?: { image: Media; caption?: string }[];
  organization?: Entry; organizer?: Entry; location?: string; startDate?: string; endDate?: string;
  githubURL?: string; liveURL?: string; eventURL?: string; website?: string; featured?: boolean; status?: string;
  responsibilities?: { item: string }[]; achievements?: { item: string }[];
  verifiedAchievement?: string; verifiedMetrics?: { label: string; value: string; sourceURL?: string }[];
  team?: { name: string; role?: string }[]; track?: string;
  relatedProjects?: Entry[]; relatedEvents?: Entry[]; relatedHackathons?: Entry[];
  caseStudy?: Record<string, unknown>; content?: unknown; publishedAt?: string;
  pdf?: Media; previewImage?: Media; lastUpdated?: string; visible?: boolean;
  seo?: { title?: string; description?: string; image?: Media };
}
export type Settings = {
  name: string; headline: string; biography: string; education: string; location?: string; portrait?: Media;
  email?: string; phone?: string; socialLinks: { label: string; url: string }[];
  navigation: { label: string; href: string }[]; footer: string; seo?: Entry['seo'];
  homepage: { eyebrow: string; intro: string; communityIntro: string; pillars: { title: string; description: string }[] };
}
export const initialSettings: Settings = {
  name: 'Ishaan Vats', headline: 'Engineering ideas. Connecting people.',
  biography: 'I’m Ishaan, a Computer Science student at SSCBS, University of Delhi. I’m interested in full-stack development, AI engineering, developer tools, and the communities that bring people together.',
  education: 'B.Sc. (Hons.) Computer Science · SSCBS, University of Delhi', location: 'Delhi, India',
  socialLinks: [{ label: 'GitHub', url: 'https://github.com/Ishaanvats74' }],
  navigation: [{ label: 'Work', href: '/projects' }, { label: 'Community', href: '/community' }, { label: 'About', href: '/about' }],
  footer: 'Built with curiosity. Made for the web.',
  homepage: {
    eyebrow: 'DEVELOPER / AI EXPLORER / COMMUNITY BUILDER',
    intro: 'Exploring the space between thoughtful software, intelligent systems, and people.',
    communityIntro: 'Good things happen when curious people build together. Through Geek Room, I contribute to hackathons, event organization, sponsorship outreach, partnerships, and developer engagement.',
    pillars: [
      { title: 'Engineering', description: 'Full-stack applications, developer tools, and the systems behind them. From the first idea to the last detail.' },
      { title: 'Artificial intelligence', description: 'Exploring LLMs, retrieval, and agent workflows. Interested in turning complex ideas into useful experiences.' },
      { title: 'Community', description: 'Bringing people and opportunities together through Geek Room, hackathons, and developer engagement.' },
    ],
  },
}
