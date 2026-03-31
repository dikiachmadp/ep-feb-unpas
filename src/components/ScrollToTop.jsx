import { useScrollToTop } from '../hooks/useScrollToTop'

// Renders nothing; just triggers scroll on route change
export default function ScrollToTop() {
  useScrollToTop()
  return null
}
