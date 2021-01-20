import defaultSettings from '@/settings'

const title = defaultSettings.title || 'CoachAI Robust System'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
