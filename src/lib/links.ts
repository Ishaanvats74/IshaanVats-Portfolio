export function projectLinks(project: { githubURL?: string; liveURL?: string }) {
  return [
    ...(project.liveURL ? [{ label: 'View Live Project', href: project.liveURL }] : []),
    ...(project.githubURL ? [{ label: project.liveURL ? 'GitHub Repository' : 'View on GitHub', href: project.githubURL }] : []),
  ]
}
export function safeURL(value?: string) {
  if (!value) return undefined
  try { return ['http:', 'https:'].includes(new URL(value).protocol) ? value : undefined } catch { return undefined }
}
