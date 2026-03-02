# PowerShell script to create .env file for backend
# Run this script from the backend folder: .\create-env.ps1

$envContent = @"
# Server Configuration
PORT=4000

# MongoDB Configuration
# For local MongoDB, use: mongodb://localhost:27017
MONGODB_URI=mongodb://localhost:27017

# JWT Secret Key (Change this to a random secure string)
JWT_SECRET=medisync_secret_key_$(Get-Random -Minimum 1000 -Maximum 9999)

# Admin Credentials
ADMIN_EMAIL=admin@medisync.com
ADMIN_PASSWORD=admin123

# Cloudinary Configuration (optional - for image uploads)
# Get these from https://cloudinary.com/console
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Payment Gateway Configuration (optional)
# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Currency
CURRENCY=USD
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
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Make sure MongoDB is running" -ForegroundColor White
Write-Host "   2. Update MONGODB_URI if needed" -ForegroundColor White
Write-Host "   3. Run: npm start" -ForegroundColor White



