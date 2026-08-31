# Empaqueta solo la carpeta cms/ para subir al VPS (sin front ni monorepo).
param(
  [string]$OutFile = ""
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..\..")
if (-not $OutFile) {
  $OutFile = Join-Path $Root "anthrovia-cms.tar.gz"
}

$CmsDir = Join-Path $Root "cms"
if (-not (Test-Path $CmsDir)) {
  throw "No se encontró cms/ en $Root"
}

$Staging = Join-Path $env:TEMP ("anthrovia-cms-pack-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $Staging | Out-Null
try {
  $DestCms = Join-Path $Staging "cms"
  robocopy $CmsDir $DestCms /E /XD node_modules .next /XF .env /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy falló con código $LASTEXITCODE" }

  # Limpiar uploads locales del staging (mantener .gitkeep)
  $Media = Join-Path $DestCms "media"
  if (Test-Path $Media) {
    Get-ChildItem $Media -File | Where-Object { $_.Name -ne ".gitkeep" } | Remove-Item -Force
  }

  if (Test-Path $OutFile) { Remove-Item $OutFile -Force }

  Push-Location $Staging
  try {
    tar -czf $OutFile cms
  } finally {
    Pop-Location
  }

  Write-Host ""
  Write-Host "Listo: $OutFile"
  Write-Host "Subí al VPS:  scp `"$OutFile`" user@IP:~/"
  Write-Host "En el VPS:    tar -xzf anthrovia-cms.tar.gz && cd cms && cp .env.example .env"
  Write-Host "              # editá .env → docker compose -f docker-compose.prod.yml up -d --build"
} finally {
  Remove-Item -Recurse -Force $Staging -ErrorAction SilentlyContinue
}
