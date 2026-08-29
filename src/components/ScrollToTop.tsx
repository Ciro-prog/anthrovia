import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

function forceScrollTop() {
  const html = document.documentElement
  const prevBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"
  window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  html.scrollTop = 0
  document.body.scrollTop = 0
  html.style.scrollBehavior = prevBehavior
}

/** Reset window scroll on SPA route changes (React Router does not do this by default). */
export function ScrollToTop() {
  const location = useLocation()

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    // Keep in-page hash navigation (e.g. /#contacto)
    if (location.hash) return

    forceScrollTop()
    const id = requestAnimationFrame(() => forceScrollTop())
    return () => cancelAnimationFrame(id)
  }, [location.pathname, location.search, location.hash])

  return null
}
