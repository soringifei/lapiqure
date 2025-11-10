# Safe batch image optimization for Windows
Write-Host "🖼️  LA PIQÛRE Image Optimization" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$imagesPath = "public\images"
$backupPath = "public\images-backup"

# Create backup directory
if (!(Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath | Out-Null
    Write-Host "📁 Created backup directory`n" -ForegroundColor Green
}

# Get all images
$images = Get-ChildItem $imagesPath -File | Where-Object { 
    $_.Extension -match '\.(jpg|jpeg|png)$' -and 
    $_.Name -notlike '*_optimized*'
}

Write-Host "Found $($images.Count) images to optimize`n" -ForegroundColor Yellow

$totalOriginalSize = 0
$totalOptimizedSize = 0
$processedCount = 0
$skippedCount = 0

foreach ($image in $images) {
    $processedCount++
    Write-Host "[$processedCount/$($images.Count)] $($image.Name)..." -NoNewline
    
    $backupFile = Join-Path $backupPath $image.Name
    $originalSize = $image.Length
    
    # Backup if not exists
    if (!(Test-Path $backupFile)) {
        Copy-Item $image.FullName $backupFile -ErrorAction SilentlyContinue
    }
    
    # Create temp output file with unique name
    $tempOutput = Join-Path $imagesPath "$($image.BaseName)_temp$($image.Extension)"
    
    try {
        # Run sharp-cli
        $sharpArgs = @(
            "-i", "`"$($image.FullName)`"",
            "-o", "`"$tempOutput`"",
            "resize", "2048",
            "--quality", "75",
            "--progressive"
        )
        
        $process = Start-Process -FilePath "sharp-cli" -ArgumentList $sharpArgs -Wait -PassThru -NoNewWindow -RedirectStandardError "nul"
        
        if ($process.ExitCode -eq 0 -and (Test-Path $tempOutput)) {
            $optimizedSize = (Get-Item $tempOutput).Length
            
            # Replace original
            Remove-Item $image.FullName -Force
            Move-Item $tempOutput $image.FullName -Force
            
            $savings = [math]::Round((($originalSize - $optimizedSize) / $originalSize) * 100, 1)
            $savedMB = [math]::Round(($originalSize - $optimizedSize) / 1MB, 2)
            
            Write-Host " ✓ ($savings% / -$savedMB MB)" -ForegroundColor Green
            
            $totalOriginalSize += $originalSize
            $totalOptimizedSize += $optimizedSize
        } else {
            Write-Host " ⊘ skipped" -ForegroundColor Yellow
            $skippedCount++
        }
    }
    catch {
        Write-Host " ⊘ error" -ForegroundColor Red
        $skippedCount++
        if (Test-Path $tempOutput) {
            Remove-Item $tempOutput -Force -ErrorAction SilentlyContinue
        }
    }
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Optimization Complete!`n" -ForegroundColor Green

$optimizedCount = $processedCount - $skippedCount
if ($optimizedCount -gt 0) {
    $totalSavings = [math]::Round((($totalOriginalSize - $totalOptimizedSize) / $totalOriginalSize) * 100, 1)
    $totalSavedMB = [math]::Round(($totalOriginalSize - $totalOptimizedSize) / 1MB, 2)
    
    Write-Host "📊 Statistics:" -ForegroundColor Cyan
    Write-Host "   Images optimized:  $optimizedCount" -ForegroundColor White
    Write-Host "   Images skipped:    $skippedCount" -ForegroundColor White
    Write-Host "   Original size:     $([math]::Round($totalOriginalSize/1MB,2)) MB" -ForegroundColor White
    Write-Host "   Optimized size:    $([math]::Round($totalOptimizedSize/1MB,2)) MB" -ForegroundColor White
    Write-Host "   Total savings:     $totalSavings% (-$totalSavedMB MB)" -ForegroundColor Green
}

Write-Host "`n💡 Originals backed up in: $backupPath" -ForegroundColor Yellow
