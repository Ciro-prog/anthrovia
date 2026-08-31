#!/usr/bin/env bash
# Empaqueta solo la carpeta cms/ para subir al VPS (sin front ni monorepo).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="${1:-$ROOT/anthrovia-cms.tar.gz}"
cd "$ROOT"
tar -czvf "$OUT" \
  --exclude='cms/node_modules' \
  --exclude='cms/.next' \
  --exclude='cms/.env' \
  --exclude='cms/media/*' \
  --exclude='cms/media/!**/.gitkeep' \
  cms
echo ""
echo "Listo: $OUT"
echo "Subí al VPS:  scp \"$OUT\" user@IP:~/"
echo "En el VPS:    tar -xzf anthrovia-cms.tar.gz && cd cms && cp .env.example .env"
echo "              # editá .env → docker compose -f docker-compose.prod.yml up -d --build"
