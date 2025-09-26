# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy only necessary files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/paths.js ./
COPY --from=builder /app/tsconfig.json ./
# Copy Swagger YAML files
COPY --from=builder /app/src/docs ./src/docs

# Create storage directory
RUN mkdir -p storage

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]