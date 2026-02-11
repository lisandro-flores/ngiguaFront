# Multi-stage Dockerfile for Angular frontend (SPA served by nginx)

FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy sources
COPY . .

# Allow injection of BACKEND_URL at build time
ARG BACKEND_URL
RUN bash -lc 'cat > src/environments/environment.prod.ts <<EOF
export const environment = {
  production: true,
  apiUrl: "${BACKEND_URL}"
};
EOF'

RUN npm run build --silent

# Serve with nginx
FROM nginx:stable-alpine AS runner
COPY --from=builder /app/dist/ngigua-frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
