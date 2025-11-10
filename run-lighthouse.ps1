# Start the Next.js production server in background
$job = Start-Job -ScriptBlock {
    Set-Location "C:\Users\Casanova\atelier-fashion"
    npm start
}

# Wait for server to start
Write-Host "Waiting for server to start..."
Start-Sleep -Seconds 10

# Run Lighthouse
Write-Host "Running Lighthouse performance test..."
lighthouse http://localhost:3000 --output=html --output=json --output-path=./lighthouse-report --chrome-flags="--headless" --only-categories=performance

# Stop the server
Stop-Job -Job $job
Remove-Job -Job $job

Write-Host "`nLighthouse report generated!"
Write-Host "HTML Report: ./lighthouse-report.report.html"
Write-Host "JSON Report: ./lighthouse-report.report.json"
