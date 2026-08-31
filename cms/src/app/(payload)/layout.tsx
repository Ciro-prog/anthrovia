import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import config from '@payload-config'
import { importMap } from './admin/importMap.js'
import { DebugStylesProbe } from './admin/DebugStylesProbe'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = async ({ children }: Args) => {
  // #region agent log
  const resolved = await config
  const serverURL = resolved?.serverURL || ''
  const payload = {
    sessionId: '8b02e2',
    runId: 'styles-pre',
    hypothesisId: 'A',
    location: 'layout.tsx:Layout',
    message: 'server layout env/serverURL',
    data: {
      nextPublic: process.env.NEXT_PUBLIC_SERVER_URL || '',
      payloadPublic: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
      serverURL,
      nextPublicIsLocalhost: /localhost|127\.0\.0\.1/i.test(
        process.env.NEXT_PUBLIC_SERVER_URL || '',
      ),
      serverUrlIsLocalhost: /localhost|127\.0\.0\.1/i.test(serverURL),
    },
    timestamp: Date.now(),
  }
  console.log(`[debug-8b02e2] ${JSON.stringify(payload)}`)
  fetch('http://127.0.0.1:7640/ingest/2686e6b7-0f9d-4f39-850f-ee78e21b59a3', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '8b02e2' },
    body: JSON.stringify(payload),
  }).catch(() => {})
  // #endregion

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <DebugStylesProbe />
      {children}
    </RootLayout>
  )
}

export default Layout
