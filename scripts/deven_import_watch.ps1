# DevenImportWatch - polls the live WooCommerce Store API until the v2 CSV import lands,
# then notes it in pending_tasks.md + pushes Karim's phone via chickpea, and self-unregisters.
$deadline = (Get-Date).AddHours(12)
$log = "C:\Users\reach\Projects\deven-golf\scripts\deven_import_watch.log"
Add-Content $log "$(Get-Date -Format s) watcher started"
while ((Get-Date) -lt $deadline) {
    try {
        $r = Invoke-WebRequest -Uri "https://devenbrand.shop/?rest_route=/wc/store/v1/products&per_page=100" -UseBasicParsing -TimeoutSec 15
        $json = $r.Content | ConvertFrom-Json
        $fixed = @($json | Where-Object { $_.is_in_stock -and $_.prices.price -and $_.prices.price -ne '0' })
        if ($fixed.Count -ge 5) {
            Add-Content $log "$(Get-Date -Format s) IMPORT LANDED: $($fixed.Count)/$($json.Count) products in stock with prices"
            $note = "`n## DEVEN WP: v2 CSV IMPORT LANDED $(Get-Date -Format s) - $($fixed.Count)/10 products live with prices on devenbrand.shop. NEXT: Claude full live verify (home/shop/PDP/add-to-cart/checkout/DEVEN10) - resume the Deven session. [[project_deven_golf]]"
            Add-Content -Path "C:\Users\reach\.claude\projects\C--Users-reach\memory\pending_tasks.md" -Value $note -Encoding utf8
            try { Invoke-WebRequest -Uri "http://127.0.0.1:8789/api/refresh" -Method POST -UseBasicParsing -TimeoutSec 10 | Out-Null } catch {}
            schtasks /Delete /TN "DevenImportWatch" /F
            exit 0
        }
    } catch {
        Add-Content $log "$(Get-Date -Format s) ERR: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds 120
}
Add-Content $log "$(Get-Date -Format s) TIMEOUT after 12h - import never landed"
schtasks /Delete /TN "DevenImportWatch" /F
