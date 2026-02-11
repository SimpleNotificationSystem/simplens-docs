#!/bin/bash
# ============================================
# SimpleNS Onboarding Script
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "[WAIT] Checking for Node.js..."

if ! command -v node &> /dev/null; then
    echo "[INFO] Node.js is not installed. Attempting to install..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install node
        else
            echo -e "${RED}[ERROR] Homebrew not found. Please install Node.js manually: https://nodejs.org/${NC}"
            exit 1
        fi
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y nodejs npm
    elif command -v yum &> /dev/null; then
        sudo yum install -y nodejs
    else
        echo -e "${RED}[ERROR] Could not detect package manager. Please install Node.js manually: https://nodejs.org/${NC}"
        exit 1
    fi
fi

if command -v node &> /dev/null; then
    echo -e "${GREEN}[OK] Node.js is installed ($(node -v))${NC}"
    echo "[INFO] Running SimpleNS Onboarding..."
    npx @simplens/onboard
else
    echo -e "${RED}[ERROR] Node.js installation failed.${NC}"
    exit 1
fi
