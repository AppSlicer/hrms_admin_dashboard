# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy lockfile and package.json to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the builder stage to Nginx's default web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Healthcheck to ensure the container is running correctly
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -f -q -O /dev/null http://localhost/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
