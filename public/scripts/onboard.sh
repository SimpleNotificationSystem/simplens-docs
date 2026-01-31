#!/bin/bash
# ============================================
# SimpleNS Onboard Script (Bash)
# Setup SimpleNS on Linux/macOS with Docker
# ============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# ============================================
# TTY Handling for curl | bash usage
# ============================================
# When piped via curl, stdin is the script content, not the terminal.
# Redirect stdin from /dev/tty to enable interactive prompts.
if [[ ! -t 0 ]]; then
    if [[ -r /dev/tty && -w /dev/tty ]]; then
        exec < /dev/tty
    else
        echo -e "${RED}Error: This script requires an interactive terminal.${NC}"
        echo ""
        echo "Please download and run manually:"
        echo "  curl -fsSL https://simplens.vercel.app/api/install/linux -o onboard.sh"
        echo "  chmod +x onboard.sh"
        echo "  ./onboard.sh"
        exit 1
    fi
fi

# Default selections (1=selected, 0=not selected)
declare -A INFRA_SELECTED=(
    ["mongo"]=0
    ["kafka"]=0
    ["kafka-ui"]=0
    ["redis"]=0
    ["loki"]=0
    ["grafana"]=0
)

# User-provided URLs for services not in infra
USER_MONGO_URI=""
USER_BROKERS=""
USER_REDIS_URL=""
USER_LOKI_URL=""

# Flag for including infrastructure
INCLUDE_INFRA=0

TARGET_DIR="${1:-.}"

# ============================================
# Banner
# ============================================
display_banner() {
    echo -e "${BLUE}"
    cat << 'EOF'
  ____  _                 _      _   _ ____  
 / ___|(_)_ __ ___  _ __ | | ___| \ | / ___| 
 \___ \| | '_ ` _ \| '_ \| |/ _ \  \| \___ \ 
  ___) | | | | | | | |_) | |  __/ |\  |___) |
 |____/|_|_| |_| |_| .__/|_|\___|_| \_|____/ 
                   |_|                        
   ___        _                         _ 
  / _ \ _ __ | |__   ___   __ _ _ __ __| |
 | | | | '_ \| '_ \ / _ \ / _` | '__/ _` |
 | |_| | | | | |_) | (_) | (_| | | | (_| |
  \___/|_| |_|_.__/ \___/ \__,_|_|  \__,_|
EOF
    echo -e "${NC}"
    echo ""
}

# ============================================
# Logging functions
# ============================================
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_info() { echo -e "${CYAN}ℹ️  $1${NC}"; }

# ============================================
# Prerequisites Check
# ============================================
check_docker_installed() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        echo "Please install Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    log_success "Docker is installed"
}

check_docker_running() {
    if ! docker ps &> /dev/null; then
        log_error "Docker daemon is not running"
        echo "Please start Docker Desktop or run: sudo systemctl start docker"
        exit 1
    fi
    log_success "Docker daemon is running"
}

detect_os() {
    case "$(uname -s)" in
        Linux*)  OS="linux" ;;
        Darwin*) OS="darwin" ;;
        *)       OS="linux" ;;
    esac
    log_success "Detected OS: $OS"
}

validate_prerequisites() {
    echo ""
    echo -e "${BOLD}🔍 Checking prerequisites...${NC}"
    echo ""
    check_docker_installed
    check_docker_running
    detect_os
}

# ============================================
# Infrastructure Selection
# ============================================
prompt_include_infra() {
    echo ""
    echo -e "${BOLD}🏗️  Infrastructure Setup${NC}"
    echo ""
    read -p "Do you want to deploy infrastructure services (MongoDB, Kafka, Redis, etc.) with Docker? [Y/n]: " include_infra
    [[ -z "$include_infra" || "$include_infra" =~ ^[Yy] ]] && INCLUDE_INFRA=1 || INCLUDE_INFRA=0
}

prompt_infra_services() {
    echo ""
    echo "Select infrastructure services to deploy:"
    echo "(Enter y/n for each, press Enter for default)"
    echo ""

    read -p "  MongoDB (Database) [Y/n]: " mongo
    [[ -z "$mongo" || "$mongo" =~ ^[Yy] ]] && INFRA_SELECTED["mongo"]=1 || INFRA_SELECTED["mongo"]=0

    read -p "  Kafka (Message Queue) [Y/n]: " kafka
    [[ -z "$kafka" || "$kafka" =~ ^[Yy] ]] && INFRA_SELECTED["kafka"]=1 || INFRA_SELECTED["kafka"]=0

    read -p "  Kafka UI (Dashboard) [Y/n]: " kafkaui
    [[ -z "$kafkaui" || "$kafkaui" =~ ^[Yy] ]] && INFRA_SELECTED["kafka-ui"]=1 || INFRA_SELECTED["kafka-ui"]=0

    read -p "  Redis (Cache) [Y/n]: " redis
    [[ -z "$redis" || "$redis" =~ ^[Yy] ]] && INFRA_SELECTED["redis"]=1 || INFRA_SELECTED["redis"]=0

    read -p "  Loki (Log Aggregation) [y/N]: " loki
    [[ "$loki" =~ ^[Yy] ]] && INFRA_SELECTED["loki"]=1 || INFRA_SELECTED["loki"]=0

    read -p "  Grafana (Observability) [y/N]: " grafana
    [[ "$grafana" =~ ^[Yy] ]] && INFRA_SELECTED["grafana"]=1 || INFRA_SELECTED["grafana"]=0

    echo ""
    log_success "Infrastructure services selected"
}

prompt_missing_service_urls() {
    echo ""
    echo -e "${BOLD}🔗 External Service URLs${NC}"
    echo ""
    echo "Provide connection URLs for services not deployed via Docker:"
    echo ""

    if [[ ${INFRA_SELECTED["mongo"]} -eq 0 ]]; then
        read -p "  MONGO_URI (e.g., mongodb://host:27017/db): " USER_MONGO_URI
    fi

    if [[ ${INFRA_SELECTED["kafka"]} -eq 0 ]]; then
        read -p "  BROKERS (Kafka brokers, e.g., host:9092): " USER_BROKERS
    fi

    if [[ ${INFRA_SELECTED["redis"]} -eq 0 ]]; then
        read -p "  REDIS_URL (e.g., redis://host:6379): " USER_REDIS_URL
    fi

    if [[ ${INFRA_SELECTED["loki"]} -eq 0 ]]; then
        read -p "  LOKI_URL (optional, e.g., http://host:3100): " USER_LOKI_URL
    fi

    echo ""
    log_success "Service URLs configured"
}

# ============================================
# Docker Compose Templates
# ============================================
generate_infra_compose() {
    local output_file="$TARGET_DIR/docker-compose.infra.yaml"
    
    log_info "Generating docker-compose.infra.yaml..."

    cat > "$output_file" << 'HEADER'
# ============================================
# SimpleNS Infrastructure Services
# Generated by simplens-onboard
# ============================================

services:
HEADER

    # MongoDB
    if [[ ${INFRA_SELECTED["mongo"]} -eq 1 ]]; then
        cat >> "$output_file" << 'MONGO'
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

MONGO
    fi

    # Kafka
    if [[ ${INFRA_SELECTED["kafka"]} -eq 1 ]]; then
        cat >> "$output_file" << 'KAFKA'
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

KAFKA
    fi

    # Kafka UI
    if [[ ${INFRA_SELECTED["kafka-ui"]} -eq 1 && ${INFRA_SELECTED["kafka"]} -eq 1 ]]; then
        cat >> "$output_file" << 'KAFKAUI'
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

KAFKAUI
    fi

    # Redis
    if [[ ${INFRA_SELECTED["redis"]} -eq 1 ]]; then
        cat >> "$output_file" << 'REDIS'
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

REDIS
    fi

    # Loki
    if [[ ${INFRA_SELECTED["loki"]} -eq 1 ]]; then
        cat >> "$output_file" << 'LOKI'
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

LOKI
    fi

    # Grafana
    if [[ ${INFRA_SELECTED["grafana"]} -eq 1 ]]; then
        cat >> "$output_file" << 'GRAFANA'
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

GRAFANA
    fi

    # Volumes section
    echo "volumes:" >> "$output_file"
    [[ ${INFRA_SELECTED["mongo"]} -eq 1 ]] && echo "  mongo_data:" >> "$output_file" && echo "  mongo_config:" >> "$output_file"
    [[ ${INFRA_SELECTED["kafka"]} -eq 1 ]] && echo "  kafka_data:" >> "$output_file"
    [[ ${INFRA_SELECTED["redis"]} -eq 1 ]] && echo "  redis_data:" >> "$output_file"
    [[ ${INFRA_SELECTED["loki"]} -eq 1 ]] && echo "  loki_data:" >> "$output_file"
    [[ ${INFRA_SELECTED["grafana"]} -eq 1 ]] && echo "  grafana_data:" >> "$output_file"

    # Networks
    cat >> "$output_file" << 'NETWORKS'

networks:
  default:
    name: simplens
NETWORKS

    log_success "Generated docker-compose.infra.yaml"
}

generate_app_compose() {
    local output_file="$TARGET_DIR/docker-compose.yaml"
    
    log_info "Generating docker-compose.yaml..."

    cat > "$output_file" << 'APPCOMPOSE'
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
APPCOMPOSE

    log_success "Generated docker-compose.yaml"
}

# ============================================
# Plugin Configuration (nodemailer-gmail)
# ============================================
generate_plugin_config() {
    local output_file="$TARGET_DIR/simplens.config.yaml"
    
    log_info "Generating simplens.config.yaml with nodemailer-gmail plugin..."

    cat > "$output_file" << 'PLUGINCONFIG'
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
        refillRate: 500  # Tokens per interva
        refillInterval: day # Options: second, minute, hour, day

channels:
  email:
    default: nodemailer-gmail
PLUGINCONFIG

    log_success "Generated simplens.config.yaml"
}

# ============================================
# Environment Configuration
# ============================================
generate_env_file() {
    local output_file="$TARGET_DIR/.env"
    
    echo ""
    echo -e "${BOLD}⚙️  Environment Configuration${NC}"
    echo ""

    # Generate random secrets
    NS_API_KEY=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
    AUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)

    echo "Generated secure API key and auth secret."
    echo ""

    # Prompt for admin password
    read -p "Enter ADMIN_PASSWORD: " ADMIN_PASSWORD

    # Prompt for Gmail credentials
    echo ""
    log_info "Gmail Plugin Configuration"
    read -p "Enter EMAIL_USER (Gmail address): " EMAIL_USER
    read -sp "Enter EMAIL_PASS (App Password): " EMAIL_PASS
    echo ""

    # Build env file
    cat > "$output_file" << ENVFILE
# SimpleNS Environment Configuration
# Generated by simplens-onboard

NODE_ENV=production

# ============================================
# API SERVER
# ============================================
NS_API_KEY=${NS_API_KEY}
PORT=3000
MAX_BATCH_REQ_LIMIT=1000

# ============================================
# DATABASE
# ============================================
ENVFILE

    # Add infra URLs based on selection or user input
    if [[ ${INFRA_SELECTED["mongo"]} -eq 1 ]]; then
        echo "MONGO_URI=mongodb://mongo:27017/simplens?replicaSet=rs0" >> "$output_file"
    else
        echo "MONGO_URI=${USER_MONGO_URI}" >> "$output_file"
    fi

    cat >> "$output_file" << ENVFILE2

# ============================================
# KAFKA
# ============================================
ENVFILE2

    if [[ ${INFRA_SELECTED["kafka"]} -eq 1 ]]; then
        echo "BROKERS=kafka:9093" >> "$output_file"
    else
        echo "BROKERS=${USER_BROKERS}" >> "$output_file"
    fi

    cat >> "$output_file" << 'ENVFILE3'
DELAYED_PARTITION=1
NOTIFICATION_STATUS_PARTITION=1

# ============================================
# REDIS
# ============================================
ENVFILE3

    if [[ ${INFRA_SELECTED["redis"]} -eq 1 ]]; then
        echo "REDIS_URL=redis://redis:6379" >> "$output_file"
    else
        echo "REDIS_URL=${USER_REDIS_URL}" >> "$output_file"
    fi

    cat >> "$output_file" << 'ENVFILE4'

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
ENVFILE4

    if [[ ${INFRA_SELECTED["loki"]} -eq 1 ]]; then
        echo "LOKI_URL=http://loki:3100" >> "$output_file"
    else
        echo "LOKI_URL=${USER_LOKI_URL}" >> "$output_file"
    fi

    cat >> "$output_file" << ENVFILE5
LOG_LEVEL=info
LOG_TO_FILE=true

# ============================================
# ADMIN DASHBOARD
# ============================================
AUTH_SECRET=${AUTH_SECRET}
ADMIN_USERNAME=admin
ADMIN_PASSWORD=${ADMIN_PASSWORD}
AUTH_TRUST_HOST=true
API_BASE_URL=http://api:3000
WEBHOOK_HOST=dashboard
WEBHOOK_PORT=3002
DASHBOARD_PORT=3002

# ============================================
# PLUGIN CREDENTIALS (Gmail)
# ============================================
EMAIL_USER=${EMAIL_USER}
EMAIL_PASS=${EMAIL_PASS}
ENVFILE5

    log_success "Generated .env file"
}

# ============================================
# Service Management
# ============================================
prompt_start_services() {
    echo ""
    read -p "Do you want to start the services now? [Y/n]: " start_services
    [[ -z "$start_services" || "$start_services" =~ ^[Yy] ]] && return 0 || return 1
}

start_infra_services() {
    log_info "Starting infrastructure services..."
    docker-compose -f docker-compose.infra.yaml up -d
    log_success "Infrastructure services started"
}

wait_for_infra_health() {
    log_info "Waiting for infrastructure services to be healthy..."
    local max_retries=30
    local delay=2

    for ((i=1; i<=max_retries; i++)); do
        healthy=$(docker ps --filter "health=healthy" --format "{{.Names}}" 2>/dev/null || echo "")
        
        if echo "$healthy" | grep -qE "(mongo|redis)"; then
            log_success "Infrastructure services are healthy"
            return 0
        fi
        
        echo -ne "\rWaiting for services... ($i/$max_retries)"
        sleep $delay
    done
    
    echo ""
    log_warning "Health check timed out, but services may still be starting"
}

start_app_services() {
    log_info "Starting application services..."
    docker-compose up -d
    log_success "Application services started"
}

display_service_status() {
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}${BOLD}  ✅ Services Started Successfully!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo ""
    
    echo -e "${CYAN}${BOLD}🔗 Access URLs:${NC}"
    echo ""
    echo -e "  ${BOLD}API Server:${NC}      http://localhost:3000"
    echo -e "  ${BOLD}API Health:${NC}      http://localhost:3000/health"
    echo -e "  ${BOLD}Dashboard:${NC}       http://localhost:3002"
    
    [[ ${INFRA_SELECTED["kafka-ui"]} -eq 1 ]] && echo -e "  ${BOLD}Kafka UI:${NC}        http://localhost:8080"
    [[ ${INFRA_SELECTED["grafana"]} -eq 1 ]] && echo -e "  ${BOLD}Grafana:${NC}         http://localhost:3001 (admin/admin)"
    
    echo ""
    echo -e "${CYAN}${BOLD}📦 Running Containers:${NC}"
    echo ""
    docker ps --format "  ✓ {{.Names}}" 2>/dev/null || true
    
    echo ""
    echo -e "${CYAN}To view logs:${NC} docker-compose logs -f"
    echo -e "${CYAN}To stop services:${NC} docker-compose down"
    echo ""
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
}

# ============================================
# Main
# ============================================
main() {
    display_banner
    
    # Create target directory if needed
    mkdir -p "$TARGET_DIR"
    
    # Step 1: Prerequisites
    validate_prerequisites
    
    # Step 2: Infrastructure selection
    prompt_include_infra
    if [[ $INCLUDE_INFRA -eq 1 ]]; then
        prompt_infra_services
    fi
    
    # Step 3: Prompt for missing service URLs
    prompt_missing_service_urls
    
    # Step 4: Generate compose files (only if infra selected)
    if [[ $INCLUDE_INFRA -eq 1 ]]; then
        generate_infra_compose
    fi
    generate_app_compose
    
    # Step 5: Generate plugin config
    generate_plugin_config
    
    # Step 6: Environment configuration
    generate_env_file
    
    # Step 7: Start services
    echo ""
    echo -e "${BOLD}🚀 Service Orchestration${NC}"
    
    if prompt_start_services; then
        cd ${TARGET_DIR}
        if [[ $INCLUDE_INFRA -eq 1 ]]; then
            start_infra_services
            wait_for_infra_health
        fi
        start_app_services
        display_service_status
    else
        log_info "Services not started. You can start them later with:"
        echo "  cd $TARGET_DIR"
        if [[ $INCLUDE_INFRA -eq 1 ]]; then
            echo "  docker-compose -f docker-compose.infra.yaml up -d"
        fi
        echo "  docker-compose up -d"
    fi
    
    echo ""
    log_success "🎉 SimpleNS onboarding completed successfully!"
    echo ""
}

main "$@"
