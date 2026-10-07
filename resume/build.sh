#!/usr/bin/env bash
# Regenerate the downloadable resume PDF from resume/resume.html using headless Chrome.
# Usage: npm run resume   (or: bash resume/build.sh)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/resume/resume.html"
OUT="$ROOT/public/Mong_Mong_Resume.pdf"

# Locate a Chrome/Chromium binary across platforms.
CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v google-chrome-stable 2>/dev/null || true)" \
  "$(command -v chromium 2>/dev/null || true)"; do
  if [ -n "$c" ] && [ -x "$c" ]; then CHROME="$c"; break; fi
done

if [ -z "$CHROME" ]; then
  echo "✗ Could not find Chrome/Chromium. Install it or open resume/resume.html and print to PDF manually." >&2
  exit 1
fi

echo "→ Rendering $SRC"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir=/tmp/chrome-pdf-profile \
  --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" "file://$SRC" >/dev/null 2>&1 || true

# Headless Chrome sometimes lingers; make sure it's gone.
pkill -f "chrome-pdf-profile" >/dev/null 2>&1 || true

if [ -f "$OUT" ]; then
  echo "✓ Resume written to public/Mong_Mong_Resume.pdf ($(du -h "$OUT" | cut -f1))"
else
  echo "✗ PDF was not generated." >&2
  exit 1
fi
