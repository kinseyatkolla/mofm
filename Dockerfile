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

# Expose port
EXPOSE 80

# Start Caddy
CMD ["caddy", "run", "--config", "/Caddyfile", "--adapter", "caddyfile"]
