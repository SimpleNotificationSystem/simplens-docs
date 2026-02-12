#!/bin/bash
# ============================================
# SimpleNS Onboarding Script
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# ============================================
# TTY Handling for curl | bash usage
# ============================================
# When piped via curl, stdin is the script content, not the terminal.
# We defer TTY redirect until after the script is fully parsed.
# The actual redirect happens in the main function.
NEED_TTY_REDIRECT=0
if [[ ! -t 0 ]]; then
    if [[ -r /dev/tty && -w /dev/tty ]]; then
        NEED_TTY_REDIRECT=1
    else
        echo -e "${RED}[ERROR] This script requires an interactive terminal.${NC}"
        echo ""
        echo "Please download and run manually:"
        echo "  curl -fsSL https://simplens.in/api/install/linux -o onboard.sh"
        echo "  chmod +x onboard.sh"
        echo "  ./onboard.sh"
        exit 1
    fi
fi

# ============================================
# Main Installation Function
# ============================================
main() {
    # Deferred TTY redirect - now safe because script is fully parsed
    if [[ $NEED_TTY_REDIRECT -eq 1 ]]; then
        exec < /dev/tty
    fi

    echo "[WAIT] Checking for Node.js..."

    if ! command -v node &> /dev/null; then
        echo "[INFO] Node.js is not installed. Attempting to install Node.js 20+..."
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            if command -v brew &> /dev/null; then
                brew install node
            else
                echo -e "${RED}[ERROR] Homebrew not found. Please install Node.js manually: https://nodejs.org/${NC}"
                exit 1
            fi
        elif command -v apt-get &> /dev/null; then
            # Install Node.js 20.x via NodeSource repository
            echo "[INFO] Setting up NodeSource repository for Node.js 20.x..."
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            # Install Node.js 20.x via NodeSource repository for RHEL/CentOS
            echo "[INFO] Setting up NodeSource repository for Node.js 20.x..."
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
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
}

# ============================================
# Execute Main Function
# ============================================
main "$@"
