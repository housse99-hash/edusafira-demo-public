#!/usr/bin/env bash
# Uptime + SSL monitor for edusafira
# Fait pour Ubuntu dans GitHub Actions (GNU date).
set -euo pipefail

SITES=(
  "https://edusafira.com"
  "https://www.edusafira.com"
  "https://edusafira-demo-public.vercel.app"
)

THRESHOLD_DAYS=21   # alerte si le cert < 21 jours
LOG="monitor_out.txt"
: > "$LOG"

echo "=== EduSafira uptime & SSL check $(date -u +"%Y-%m-%dT%H:%M:%SZ") ===" | tee -a "$LOG"
fail=0

for url in "${SITES[@]}"; do
  host=$(echo "$url" | awk -F/ '{print $3}')
  echo "" | tee -a "$LOG"
  echo "→ Site : $url" | tee -a "$LOG"

  # 1) Statut HTTP
  code=$(curl -k -sS -o /dev/null -w "%{http_code}" --max-time 20 "$url" || echo "000")
  echo "   HTTP status : $code" | tee -a "$LOG"
  if [[ "$code" -lt 200 || "$code" -ge 400 ]]; then
    echo "   ❌ HTTP en erreur" | tee -a "$LOG"
    fail=1
  else
    echo "   ✅ HTTP OK" | tee -a "$LOG"
  fi

  # 2) Certificat SSL (date d’expiration)
  end_line=$(echo | openssl s_client -servername "$host" -connect "$host:443" 2>/dev/null | openssl x509 -noout -enddate || true)
  if [[ -z "${end_line:-}" ]]; then
    echo "   ❌ Impossible de lire le certificat" | tee -a "$LOG"
    fail=1
    continue
  fi
  end_date=$(echo "$end_line" | cut -d= -f2)
  end_epoch=$(date -d "$end_date" +%s)
  now_epoch=$(date -u +%s)
  days_left=$(( (end_epoch - now_epoch) / 86400 ))
  echo "   Cert expires : $end_date  (Jours restants : $days_left)" | tee -a "$LOG"

  if (( days_left < THRESHOLD_DAYS )); then
    echo "   ❌ Certificat proche d’expiration (< ${THRESHOLD_DAYS}j)" | tee -a "$LOG"
    fail=1
  else
    echo "   ✅ Certificat OK" | tee -a "$LOG"
  fi
done

echo "" | tee -a "$LOG"
if (( fail == 1 )); then
  echo "=== RESULT : PROBLEME detecté ===" | tee -a "$LOG"
  exit 2
else
  echo "=== RESULT : TOUT VA BIEN ===" | tee -a "$LOG"
fi
