# ============================================
# SimpleNS Onboard Script (PowerShell)
# Setup SimpleNS on Windows with Docker
# ============================================

param(
    [string]$TargetDir = "."
)

$ErrorActionPreference = "Stop"

# Default selections
$InfraSelected = @{
    "mongo" = $false
    "kafka" = $false
    "kafka-ui" = $false
    "redis" = $false
    "loki" = $false
    "grafana" = $false
}

# User-provided URLs for services not in infra
$UserMongoUri = ""
$UserBrokers = ""
$UserRedisUrl = ""
$UserLokiUrl = ""

# Flag for including infrastructure
$IncludeInfra = $false

# ============================================
# Banner
# ============================================
function Show-Banner {
    Write-Host @"
  ____  _                 _      _   _ ____  
 / ___|(_)_ __ ___  _ __ | | ___| \ | / ___| 
 \___ \| | '_ `` _ \| '_ \| |/ _ \  \| \___ \ 
  ___) | | | | | | | |_) | |  __/ |\  |___) |
 |____/|_|_| |_| |_| .__/|_|\___|_| \_|____/ 
                   |_|                        
   ___        _                         _ 
  / _ \ _ __ | |__   ___   __ _ _ __ __| |
 | | | | '_ \| '_ \ / _ \ / _`` | '__/ _`` |
 | |_| | | | | |_) | (_) | (_| | | | (_| |
  \___/|_| |_|_.__/ \___/ \__,_|_|  \__,_|
"@ -ForegroundColor Blue
    Write-Host ""
}

# ============================================
# Logging functions
# ============================================
function Write-Success { param($Message) Write-Host "[OK] $Message" -ForegroundColor Green }
function Write-Err { param($Message) Write-Host "[ERROR] $Message" -ForegroundColor Red }
function Write-Warn { param($Message) Write-Host "[WARN] $Message" -ForegroundColor Yellow }
function Write-Info { param($Message) Write-Host "[INFO] $Message" -ForegroundColor Cyan }

# ============================================
# Prerequisites Check
# ============================================
function Test-DockerInstalled {
    try {
        $null = & docker --version 2>&1
        Write-Success "Docker is installed"
        return $true
    } catch {
        Write-Err "Docker is not installed"
        Write-Host "Please install Docker Desktop: https://docs.docker.com/desktop/windows/install/"
        return $false
    }
}

function Test-DockerRunning {
    try {
        $null = & docker ps 2>&1
        if ($LASTEXITCODE -ne 0) { throw "Docker not running" }
        Write-Success "Docker daemon is running"
        return $true
    } catch {
        Write-Err "Docker daemon is not running"
        Write-Host "Please start Docker Desktop"
        return $false
    }
}

function Test-Prerequisites {
    Write-Host ""
    Write-Host "Checking prerequisites..." -ForegroundColor White
    Write-Host ""
    
    if (-not (Test-DockerInstalled)) { exit 1 }
    if (-not (Test-DockerRunning)) { exit 1 }
    
    Write-Success "Detected OS: windows"
}

# ============================================
# Infrastructure Selection
# ============================================
function Request-IncludeInfra {
    Write-Host ""
    Write-Host "Infrastructure Setup" -ForegroundColor White
    Write-Host ""
    $response = Read-Host "Do you want to deploy infrastructure services (MongoDB, Kafka, Redis, etc.) with Docker? [Y/n]"
    $script:IncludeInfra = ($response -eq "" -or $response -match "^[Yy]")
}

function Select-InfraServices {
    Write-Host ""
    Write-Host "Select infrastructure services to deploy:"
    Write-Host "(Enter y/n for each, press Enter for default)"
    Write-Host ""

    $response = Read-Host "  MongoDB (Database) [Y/n]"
    $script:InfraSelected["mongo"] = ($response -eq "" -or $response -match "^[Yy]")

    $response = Read-Host "  Kafka (Message Queue) [Y/n]"
    $script:InfraSelected["kafka"] = ($response -eq "" -or $response -match "^[Yy]")

    $response = Read-Host "  Kafka UI (Dashboard) [Y/n]"
    $script:InfraSelected["kafka-ui"] = ($response -eq "" -or $response -match "^[Yy]")

    $response = Read-Host "  Redis (Cache) [Y/n]"
    $script:InfraSelected["redis"] = ($response -eq "" -or $response -match "^[Yy]")

    $response = Read-Host "  Loki (Log Aggregation) [y/N]"
    $script:InfraSelected["loki"] = ($response -match "^[Yy]")

    $response = Read-Host "  Grafana (Observability) [y/N]"
    $script:InfraSelected["grafana"] = ($response -match "^[Yy]")

    Write-Host ""
    Write-Success "Infrastructure services selected"
}

function Request-MissingServiceUrls {
    Write-Host ""
    Write-Host "External Service URLs" -ForegroundColor White
    Write-Host ""
    Write-Host "Provide connection URLs for services not deployed via Docker:"
    Write-Host ""

    if (-not $script:InfraSelected["mongo"]) {
        $script:UserMongoUri = Read-Host "  MONGO_URI (e.g., mongodb://host:27017/db)"
    }

    if (-not $script:InfraSelected["kafka"]) {
        $script:UserBrokers = Read-Host "  BROKERS (Kafka brokers, e.g., host:9092)"
    }

    if (-not $script:InfraSelected["redis"]) {
        $script:UserRedisUrl = Read-Host "  REDIS_URL (e.g., redis://host:6379)"
    }

    if (-not $script:InfraSelected["loki"]) {
        $script:UserLokiUrl = Read-Host "  LOKI_URL (optional, e.g., http://host:3100)"
    }

    Write-Host ""
    Write-Success "Service URLs configured"
}

# ============================================
# Docker Compose Generation
# ============================================
function New-InfraCompose {
    $outputFile = Join-Path $TargetDir "docker-compose.infra.yaml"
    
    Write-Info "Generating docker-compose.infra.yaml..."

    $content = @"
# ============================================
# SimpleNS Infrastructure Services
# Generated by simplens-onboard
# ============================================

services:
"@

    # MongoDB
    if ($script:InfraSelected["mongo"]) {
        $content += @"

  mongo:
    image: mongo:7.0
    container_name: mongo
    command: [ "--replSet", "rs0", "--bind_ip_all", "--port", "27017" ]
    ports:
      - 27017:27017
    healthcheck:
      test: echo "try { rs.status() } catch (err) { rs.initiate({_id:'rs0',members:[{_id:0,host:'mongo:27017'}]}) }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      start_interval: 1s
      retries: 30
    volumes:
      - "mongo_data:/data/db"
      - "mongo_config:/data/configdb"
"@
    }

    # Kafka
    if ($script:InfraSelected["kafka"]) {
        $content += @"

  kafka:
    image: apache/kafka-native
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_LISTENERS: CONTROLLER://localhost:9091,HOST://0.0.0.0:9092,DOCKER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: HOST://kafka:9092,DOCKER://kafka:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,DOCKER:PLAINTEXT,HOST:PLAINTEXT
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@localhost:9091
      KAFKA_INTER_BROKER_LISTENER_NAME: DOCKER
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: "false"
    volumes:
      - "kafka_data:/var/lib/kafka/data"
"@
    }

    # Kafka UI
    if ($script:InfraSelected["kafka-ui"] -and $script:InfraSelected["kafka"]) {
        $content += @"

  kafka-ui:
    image: kafbat/kafka-ui:main
    container_name: kafka-ui
    ports:
      - 8080:8080
    environment:
      DYNAMIC_CONFIG_ENABLED: "true"
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9093
    depends_on:
      - kafka
"@
    }

    # Redis
    if ($script:InfraSelected["redis"]) {
        $content += @"

  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - "redis_data:/data"
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 5s
      timeout: 3s
      retries: 5
"@
    }

    # Loki
    if ($script:InfraSelected["loki"]) {
        $content += @"

  loki:
    image: grafana/loki:2.9.0
    container_name: loki
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - "loki_data:/loki"
    healthcheck:
      test: [ "CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:3100/ready || exit 1" ]
      interval: 10s
      timeout: 5s
      retries: 5
"@
    }

    # Grafana
    if ($script:InfraSelected["grafana"]) {
        $content += @"

  grafana:
    image: grafana/grafana:10.2.0
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      - GF_PATHS_PROVISIONING=/etc/grafana/provisioning
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - "grafana_data:/var/lib/grafana"
    depends_on:
      loki:
        condition: service_healthy
"@
    }

    # Volumes section
    $content += "`n`nvolumes:"
    if ($script:InfraSelected["mongo"]) { $content += "`n  mongo_data:`n  mongo_config:" }
    if ($script:InfraSelected["kafka"]) { $content += "`n  kafka_data:" }
    if ($script:InfraSelected["redis"]) { $content += "`n  redis_data:" }
    if ($script:InfraSelected["loki"]) { $content += "`n  loki_data:" }
    if ($script:InfraSelected["grafana"]) { $content += "`n  grafana_data:" }

    # Networks
    $content += @"

networks:
  default:
    name: simplens
"@

    [System.IO.File]::WriteAllText($outputFile, $content, [System.Text.Encoding]::UTF8)
    Write-Success "Generated docker-compose.infra.yaml"
}

function New-AppCompose {
    $outputFile = Join-Path $TargetDir "docker-compose.yaml"
    
    Write-Info "Generating docker-compose.yaml..."

    $content = @'
services:
  api:
    image: ghcr.io/simplenotificationsystem/simplens-core:latest
    container_name: api
    ports:
      - 3000:3000
    env_file:
      - .env
    volumes:
      - plugin-data:/app/.plugins
      - ./simplens.config.yaml:/app/simplens.config.yaml:ro
    command: [ "node", "dist/api/server.js" ]
    restart: unless-stopped
    healthcheck:
      test: [ "CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))" ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

  worker:
    image: ghcr.io/simplenotificationsystem/simplens-core:latest
    env_file:
      - .env
    command: [ "node", "dist/workers/worker.js" ]
    restart: unless-stopped

  notification_processor:
    image: ghcr.io/simplenotificationsystem/simplens-core:latest
    env_file:
      - .env
    volumes:
      - plugin-data:/app/.plugins
      - ./simplens.config.yaml:/app/simplens.config.yaml:ro
    command: [ "node", "dist/processors/unified/unified.processor.js" ]
    depends_on:
      api:
        condition: service_healthy
    restart: unless-stopped

  delayed_processor:
    image: ghcr.io/simplenotificationsystem/simplens-core:latest
    env_file:
      - .env
    command: [ "node", "dist/processors/delayed/delayed.processor.js" ]
    restart: unless-stopped

  recovery:
    image: ghcr.io/simplenotificationsystem/simplens-core:latest
    env_file:
      - .env
    command: [ "node", "dist/workers/recovery/recovery.service.js" ]
    restart: unless-stopped

  dashboard:
    image: ghcr.io/simplenotificationsystem/simplens-dashboard:latest
    ports:
      - 3002:3002
    container_name: dashboard
    env_file:
      - .env
    environment:
      PORT: ${DASHBOARD_PORT:-3002}
      API_BASE_URL: http://api:${PORT:-3000}
      WEBHOOK_HOST: dashboard
      WEBHOOK_PORT: ${DASHBOARD_PORT:-3002}
    restart: unless-stopped

volumes:
  plugin-data:

networks:
  default:
    name: simplens
'@

    [System.IO.File]::WriteAllText($outputFile, $content, [System.Text.Encoding]::UTF8)
    Write-Success "Generated docker-compose.yaml"
}

# ============================================
# Plugin Configuration
# ============================================
function New-PluginConfig {
    $outputFile = Join-Path $TargetDir "simplens.config.yaml"
    
    Write-Info "Generating simplens.config.yaml with nodemailer-gmail plugin..."

    $content = @'
# SimpleNS Plugin Configuration
# Generated by simplens-onboard

# Provider configurations
# Each provider connects to an external notification service

providers:
  - package: "@simplens/nodemailer-gmail"
    id: nodemailer-gmail
    credentials:
      EMAIL_USER: ${EMAIL_USER}  # Required
      EMAIL_PASS: ${EMAIL_PASS}  # Required
    optionalConfig:
      EMAIL_HOST: ${EMAIL_HOST}  # Optional
      EMAIL_PORT: ${EMAIL_PORT}  # Optional
      EMAIL_FROM: ${EMAIL_FROM}  # Optional
    options:
      priority: 1  # Higher = preferred
      rateLimit:
        maxTokens: 500  # Token bucket capacity
        refillRate: 500  # Tokens per interval
        refillInterval: day # Options: second, minute, hour, day

channels:
  email:
    default: nodemailer-gmail
'@

    [System.IO.File]::WriteAllText($outputFile, $content, [System.Text.Encoding]::UTF8)
    Write-Success "Generated simplens.config.yaml"
}

# ============================================
# Environment Configuration
# ============================================
function New-EnvFile {
    $outputFile = Join-Path $TargetDir ".env"
    
    Write-Host ""
    Write-Host "Environment Configuration" -ForegroundColor White
    Write-Host ""

    # Generate random secrets (compatible with older PowerShell)
    $rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
    $bytes = New-Object byte[] 32
    $rng.GetBytes($bytes)
    $NS_API_KEY = [Convert]::ToBase64String($bytes)
    
    $bytes = New-Object byte[] 32
    $rng.GetBytes($bytes)
    $AUTH_SECRET = [Convert]::ToBase64String($bytes)
    $rng.Dispose()

    Write-Host "Generated secure API key and auth secret."
    Write-Host ""

    # Prompt for admin password
    $ADMIN_PASSWORD = Read-Host "Enter ADMIN_PASSWORD"

    # Prompt for Gmail credentials
    Write-Host ""
    Write-Info "Gmail Plugin Configuration"
    $EMAIL_USER = Read-Host "Enter EMAIL_USER (Gmail address)"
    $EMAIL_PASS = Read-Host "Enter EMAIL_PASS (App Password)" -AsSecureString
    $EMAIL_PASS_PLAIN = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($EMAIL_PASS))

    # Build env content
    $MONGO_URI = if ($script:InfraSelected["mongo"]) { "mongodb://mongo:27017/simplens?replicaSet=rs0" } else { $script:UserMongoUri }
    $BROKERS = if ($script:InfraSelected["kafka"]) { "kafka:9093" } else { $script:UserBrokers }
    $REDIS_URL = if ($script:InfraSelected["redis"]) { "redis://redis:6379" } else { $script:UserRedisUrl }
    $LOKI_URL = if ($script:InfraSelected["loki"]) { "http://loki:3100" } else { $script:UserLokiUrl }

    $content = @"
# SimpleNS Environment Configuration
# Generated by simplens-onboard

NODE_ENV=production

# ============================================
# API SERVER
# ============================================
NS_API_KEY=$NS_API_KEY
PORT=3000
MAX_BATCH_REQ_LIMIT=1000

# ============================================
# DATABASE
# ============================================
MONGO_URI=$MONGO_URI

# ============================================
# KAFKA
# ============================================
BROKERS=$BROKERS
DELAYED_PARTITION=1
NOTIFICATION_STATUS_PARTITION=1

# ============================================
# REDIS
# ============================================
REDIS_URL=$REDIS_URL

# ============================================
# PLUGIN SYSTEM
# ============================================
SIMPLENS_CONFIG_PATH=./simplens.config.yaml
PROCESSOR_CHANNEL=all

# ============================================
# BACKGROUND WORKER
# ============================================
OUTBOX_POLL_INTERVAL_MS=5000
OUTBOX_CLEANUP_INTERVAL_MS=60000
OUTBOX_BATCH_SIZE=100
OUTBOX_RETENTION_MS=300000
OUTBOX_CLAIM_TIMEOUT_MS=30000

# ============================================
# RETRY & IDEMPOTENCY
# ============================================
IDEMPOTENCY_TTL_SECONDS=86400
MAX_RETRY_COUNT=5
PROCESSING_TTL_SECONDS=120

# ============================================
# DELAYED NOTIFICATIONS
# ============================================
DELAYED_POLL_INTERVAL_MS=1000
DELAYED_BATCH_SIZE=10
MAX_POLLER_RETRIES=3

# ============================================
# RECOVERY SERVICE
# ============================================
RECOVERY_POLL_INTERVAL_MS=60000
PROCESSING_STUCK_THRESHOLD_MS=300000
PENDING_STUCK_THRESHOLD_MS=300000
RECOVERY_BATCH_SIZE=50
RECOVERY_CLAIM_TIMEOUT_MS=60000

# ============================================
# CLEANUP
# ============================================
CLEANUP_RESOLVED_ALERTS_RETENTION_MS=86400000
CLEANUP_PROCESSED_STATUS_OUTBOX_RETENTION_MS=86400000

# ============================================
# LOGGING
# ============================================
LOKI_URL=$LOKI_URL
LOG_LEVEL=info
LOG_TO_FILE=true

# ============================================
# ADMIN DASHBOARD
# ============================================
AUTH_SECRET=$AUTH_SECRET
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
AUTH_TRUST_HOST=true
API_BASE_URL=http://api:3000
WEBHOOK_HOST=dashboard
WEBHOOK_PORT=3002
DASHBOARD_PORT=3002

# ============================================
# PLUGIN CREDENTIALS (Gmail)
# ============================================
EMAIL_USER=$EMAIL_USER
EMAIL_PASS=$EMAIL_PASS_PLAIN
"@

    [System.IO.File]::WriteAllText($outputFile, $content, [System.Text.Encoding]::UTF8)
    Write-Success "Generated .env file"
}

# ============================================
# Service Management
# ============================================
function Start-InfraServices {
    Write-Info "Starting infrastructure services..."
    Push-Location $TargetDir
    & docker-compose -f docker-compose.infra.yaml up -d
    Pop-Location
    Write-Success "Infrastructure services started"
}

function Wait-ForInfraHealth {
    Write-Info "Waiting for infrastructure services to be healthy..."
    $maxRetries = 30
    $delay = 2

    for ($i = 1; $i -le $maxRetries; $i++) {
        $healthy = & docker ps --filter "health=healthy" --format "{{.Names}}" 2>$null
        
        if ($healthy -match "(mongo|redis)") {
            Write-Success "Infrastructure services are healthy"
            return
        }
        
        Write-Host "`rWaiting for services... ($i/$maxRetries)" -NoNewline
        Start-Sleep -Seconds $delay
    }
    
    Write-Host ""
    Write-Warn "Health check timed out, but services may still be starting"
}

function Start-AppServices {
    Write-Info "Starting application services..."
    Push-Location $TargetDir
    & docker-compose up -d
    Pop-Location
    Write-Success "Application services started"
}

function Show-ServiceStatus {
    Write-Host ""
    Write-Host "===========================================================" -ForegroundColor Green
    Write-Host "  Services Started Successfully!" -ForegroundColor Green
    Write-Host "===========================================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Access URLs:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  API Server:      http://localhost:3000"
    Write-Host "  API Health:      http://localhost:3000/health"
    Write-Host "  Dashboard:       http://localhost:3002"
    
    if ($script:InfraSelected["kafka-ui"]) { Write-Host "  Kafka UI:        http://localhost:8080" }
    if ($script:InfraSelected["grafana"]) { Write-Host "  Grafana:         http://localhost:3001 (admin/admin)" }
    
    Write-Host ""
    Write-Host "Running Containers:" -ForegroundColor Cyan
    Write-Host ""
    & docker ps --format "  * {{.Names}}" 2>$null
    
    Write-Host ""
    Write-Host "To view logs: docker-compose logs -f" -ForegroundColor Cyan
    Write-Host "To stop services: docker-compose down" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "===========================================================" -ForegroundColor Green
}

# ============================================
# Main
# ============================================
function Main {
    Show-Banner
    
    # Create target directory if needed
    if (-not (Test-Path $TargetDir)) {
        New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
    }
    
    # Step 1: Prerequisites
    Test-Prerequisites
    
    # Step 2: Infrastructure selection
    Request-IncludeInfra
    if ($script:IncludeInfra) {
        Select-InfraServices
    }
    
    # Step 3: Prompt for missing service URLs
    Request-MissingServiceUrls
    
    # Step 4: Generate compose files (only if infra selected)
    if ($script:IncludeInfra) {
        New-InfraCompose
    }
    New-AppCompose
    
    # Step 5: Generate plugin config
    New-PluginConfig
    
    # Step 6: Environment configuration
    New-EnvFile
    
    # Step 7: Start services
    Write-Host ""
    Write-Host "Service Orchestration" -ForegroundColor White
    
    $startServices = Read-Host "Do you want to start the services now? [Y/n]"
    if ($startServices -eq "" -or $startServices -match "^[Yy]") {
        if ($script:IncludeInfra) {
            Start-InfraServices
            Wait-ForInfraHealth
        }
        Start-AppServices
        Show-ServiceStatus
    } else {
        Write-Info "Services not started. You can start them later with:"
        Write-Host "  cd $TargetDir"
        if ($script:IncludeInfra) {
            Write-Host "  docker-compose -f docker-compose.infra.yaml up -d"
        }
        Write-Host "  docker-compose up -d"
    }
    
    Write-Host ""
    Write-Success "SimpleNS onboarding completed successfully!"
    Write-Host ""
}

Main
