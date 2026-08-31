FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm install

FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Payload skips schema push when NODE_ENV=production unless patched + push:true
RUN node scripts/patch-payload-push.mjs
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=build-time-secret-only
ENV DATABASE_URI=postgresql://anthrovia:anthrovia@localhost:5432/anthrovia_cms
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:60518
ENV PAYLOAD_PUBLIC_SERVER_URL=http://localhost:60518
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /app/media \
    && chown -R node:node /app

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/media ./media
# Standalone puede trazar una copia sin el patch; forzamos el connect.js parchado
COPY --from=builder --chown=node:node \
  /app/node_modules/@payloadcms/db-postgres/dist/connect.js \
  /tmp/connect.patched.js
USER root
RUN dest=$(find /app -path '*/@payloadcms/db-postgres/dist/connect.js' 2>/dev/null | head -n1) \
  && if [ -n "$dest" ]; then cp /tmp/connect.patched.js "$dest" && echo "[patch] wrote $dest"; \
     else echo "[patch] WARN: connect.js not found in standalone tree"; fi \
  && rm -f /tmp/connect.patched.js \
  && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]
