# Use Node.js LTS as base image for building
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Use a minimal image for serving
FROM caddy:2-alpine

# Copy built files from builder
COPY --from=builder /app/dist /app/dist

# Copy Caddyfile
COPY Caddyfile /Caddyfile

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose port (Railway will set PORT env var)
EXPOSE 80

# Start Caddy using startup script
CMD ["/start.sh"]
