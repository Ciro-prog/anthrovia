'use client'

import { useEffect } from 'react'

/**
 * Debug probe: reporta desde el browser (PC) al ingest local de Cursor.
 * El CMS corre en el VPS; fetch a 127.0.0.1 solo funciona si abrís el admin desde esta máquina.
 */
export function DebugStylesProbe() {
  useEffect(() => {
    // #region agent log
    const send = (message: string, hypothesisId: string, data: Record<string, unknown>) => {
      fetch('http://127.0.0.1:7640/ingest/2686e6b7-0f9d-4f39-850f-ee78e21b59a3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '8b02e2' },
        body: JSON.stringify({
          sessionId: '8b02e2',
          runId: 'styles-pre',
          hypothesisId,
          location: 'DebugStylesProbe.tsx',
          message,
          data,
          timestamp: Date.now(),
        }),
      }).catch(() => {})
    }

    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((el) =>
      (el as HTMLLinkElement).href,
    )
    const scripts = Array.from(document.querySelectorAll('script[src]')).map(
      (el) => (el as HTMLScriptElement).src,
    )
    const nextPublic = process.env.NEXT_PUBLIC_SERVER_URL || ''
    const localhostAssets = [...links, ...scripts].filter((u) => /localhost|127\.0\.0\.1/i.test(u))
    const cssOk = links.filter((u) => u.includes('.css'))
    let sheetCount = 0
    let sheetErrors = 0
    try {
      sheetCount = document.styleSheets.length
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          void sheet.cssRules?.length
        } catch {
          sheetErrors += 1
        }
      }
    } catch {
      sheetErrors += 1
    }

    send('admin style probe', 'A', {
      href: window.location.href,
      origin: window.location.origin,
      nextPublicServerUrl: nextPublic,
      nextPublicIsLocalhost: /localhost|127\.0\.0\.1/i.test(nextPublic),
      stylesheetHrefs: links.slice(0, 20),
      stylesheetCount: links.length,
      cssLinkCount: cssOk.length,
      localhostAssetCount: localhostAssets.length,
      localhostAssets: localhostAssets.slice(0, 10),
      scriptSample: scripts.filter((s) => s.includes('_next')).slice(0, 5),
      styleSheetCount: sheetCount,
      crossOriginSheetErrors: sheetErrors,
      bodyClass: document.body?.className?.slice(0, 120) || '',
    })

    // Probe same-origin CSS chunk vs baked localhost
    const probeUrl =
      localhostAssets.find((u) => u.includes('.css')) ||
      links.find((u) => u.includes('_next') && u.includes('.css')) ||
      `${window.location.origin}/_next/static/css/probe-missing.css`

    fetch(probeUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(() => send('css probe attempted', 'B', { probeUrl, mode: 'no-cors-ok' }))
      .catch((err) =>
        send('css probe failed', 'B', {
          probeUrl,
          error: err instanceof Error ? err.message : String(err),
        }),
      )

    // Same-origin _next static smoke (relative)
    fetch('/_next/static/', { method: 'HEAD' })
      .then((res) =>
        send('static dir head', 'D', { status: res.status, ok: res.ok, url: res.url }),
      )
      .catch((err) =>
        send('static dir head failed', 'D', {
          error: err instanceof Error ? err.message : String(err),
        }),
      )
    // #endregion
  }, [])

  return null
}
