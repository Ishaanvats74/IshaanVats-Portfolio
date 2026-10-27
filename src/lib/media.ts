import type { Entry } from './content'
export function mediaSource(url: string, origin: string, development = process.env.NODE_ENV === 'development') {
 if (url.startsWith('/api/media/file/')) return url
 try {
  const parsed = new URL(url)
  const server = new URL(origin)
  const localCMS = development && ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname)
  if ((parsed.origin === server.origin || localCMS) && parsed.pathname.startsWith('/api/media/file/')) return parsed.pathname + parsed.search
  return ['https:','http:'].includes(parsed.protocol) ? parsed.href : undefined
 } catch { return undefined }
}

export function skillIcon(entry: Entry) {
 const media = [entry.iconDark, entry.icon, entry.iconLight].find(icon=>icon?.url)
 return {media, alt:media?.alt || entry.title, initial:entry.title.slice(0,1).toUpperCase()}
}
