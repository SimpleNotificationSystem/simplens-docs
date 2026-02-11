# ============================================
# SimpleNS Onboarding Script (PowerShell)
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "[WAIT] Checking for Node.js..." -ForegroundColor Cyan

try {
    # Check if node is in path
    if (Get-Command node -ErrorAction SilentlyContinue) {
        $nodeVersion = node -v
        Write-Host "[OK] Node.js is installed ($nodeVersion)" -ForegroundColor Green
    }
    else {
        throw "Node.js not found"
    }
}
catch {
    Write-Host "[INFO] Node.js is not installed. Attempting to install via winget..." -ForegroundColor Yellow
    
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "[INFO] Installing Node.js..."
        winget install OpenJS.NodeJS --silent --accept-package-agreements --accept-source-agreements
        
        # Refresh environment variables for the current session
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
        
        if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
            Write-Host "[ERROR] Node.js installation completed but 'node' is still not in your PATH. Please restart your terminal." -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "[ERROR] winget not found. Please install Node.js manually: https://nodejs.org/" -ForegroundColor Red
        exit 1
    }
}

Write-Host "[INFO] Running SimpleNS Onboarding..." -ForegroundColor Cyan
npx @simplens/onboard
