# Setup .env Files Script
# This script copies the env-template.txt files to .env files in each directory

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up .env files for your project" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Server .env
Write-Host "Setting up server/.env..." -ForegroundColor Yellow
if (Test-Path "server\env-template.txt") {
    Copy-Item "server\env-template.txt" "server\.env" -Force
    Write-Host "✅ Created server/.env" -ForegroundColor Green
} else {
    Write-Host "❌ server/env-template.txt not found!" -ForegroundColor Red
}

# Model Implementor .env
Write-Host "Setting up model-implementor/.env..." -ForegroundColor Yellow
if (Test-Path "model-implementor\env-template.txt") {
    Copy-Item "model-implementor\env-template.txt" "model-implementor\.env" -Force
    Write-Host "✅ Created model-implementor/.env" -ForegroundColor Green
} else {
    Write-Host "❌ model-implementor/env-template.txt not found!" -ForegroundColor Red
}

# Client .env.local (Next.js uses .env.local)
Write-Host "Setting up client/.env.local..." -ForegroundColor Yellow
if (Test-Path "client\env-template.txt") {
    Copy-Item "client\env-template.txt" "client\.env.local" -Force
    Write-Host "✅ Created client/.env.local" -ForegroundColor Green
} else {
    Write-Host "❌ client/env-template.txt not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Open and edit the .env files with your actual API keys" -ForegroundColor White
Write-Host "2. See CREATE_ENV_FILES.md for detailed instructions" -ForegroundColor White
Write-Host "3. Get your keys from:" -ForegroundColor White
Write-Host "   - Gmail App Password: https://myaccount.google.com/apppasswords" -ForegroundColor White
Write-Host "   - Cloudinary: https://console.cloudinary.com/settings/api-keys" -ForegroundColor White
Write-Host "   - MongoDB: https://cloud.mongodb.com/ (or use local MongoDB)" -ForegroundColor White
Write-Host ""

