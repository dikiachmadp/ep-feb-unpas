import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook: scrolls window to top on every route change.
 * Use in a component rendered inside BrowserRouter.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}

/**
 * Utility: smoothly scrolls to the top of the page.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
