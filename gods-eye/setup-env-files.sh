#!/bin/bash
# Setup .env Files Script (Mac/Linux)
# This script copies the env-template.txt files to .env files in each directory

echo "========================================"
echo "Setting up .env files for your project"
echo "========================================"
echo ""

# Server .env
echo "Setting up server/.env..."
if [ -f "server/env-template.txt" ]; then
    cp "server/env-template.txt" "server/.env"
    echo "✅ Created server/.env"
else
    echo "❌ server/env-template.txt not found!"
fi

# Model Implementor .env
echo "Setting up model-implementor/.env..."
if [ -f "model-implementor/env-template.txt" ]; then
    cp "model-implementor/env-template.txt" "model-implementor/.env"
    echo "✅ Created model-implementor/.env"
else
    echo "❌ model-implementor/env-template.txt not found!"
fi

# Client .env.local (Next.js uses .env.local)
echo "Setting up client/.env.local..."
if [ -f "client/env-template.txt" ]; then
    cp "client/env-template.txt" "client/.env.local"
    echo "✅ Created client/.env.local"
else
    echo "❌ client/env-template.txt not found!"
fi

echo ""
echo "========================================"
echo "✅ Setup complete!"
echo "========================================"
echo ""
echo "📝 Next steps:"
echo "1. Open and edit the .env files with your actual API keys"
echo "2. See CREATE_ENV_FILES.md for detailed instructions"
echo "3. Get your keys from:"
echo "   - Gmail App Password: https://myaccount.google.com/apppasswords"
echo "   - Cloudinary: https://console.cloudinary.com/settings/api-keys"
echo "   - MongoDB: https://cloud.mongodb.com/ (or use local MongoDB)"
echo ""

