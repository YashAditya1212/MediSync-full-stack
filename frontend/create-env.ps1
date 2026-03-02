# PowerShell script to create .env file for frontend
# Run this script from the frontend folder: .\create-env.ps1

$envContent = @"
# Backend API URL
# For local development, use: http://localhost:4000
VITE_BACKEND_URL=http://localhost:4000

# Currency Symbol
VITE_CURRENCY=USD
"@

$envPath = Join-Path $PSScriptRoot ".env"

if (Test-Path $envPath) {
    Write-Host "⚠️  .env file already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite it? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "❌ Cancelled. .env file not created." -ForegroundColor Red
        exit
    }
}

$envContent | Out-File -FilePath $envPath -Encoding utf8
Write-Host "✅ .env file created successfully at: $envPath" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Important: Restart the frontend dev server after creating .env file!" -ForegroundColor Cyan
Write-Host "   Stop the server (Ctrl+C) and run: npm run dev" -ForegroundColor White



