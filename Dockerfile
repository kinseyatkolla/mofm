# Use Node.js LTS as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files (including server.js)
COPY . .

# Build the application
RUN npm run build

# Expose port (Railway will set PORT env var)
EXPOSE 80

# Start the Node.js server
CMD ["npm", "start"]
