FROM node:18-alpine AS base

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

COPY . .

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy env file
COPY apps/web/.env apps/web/.env

# Build the React app with Vite
RUN pnpm --filter web build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy build output
COPY --from=builder /app/apps/web/dist ./

# Copy custom nginx config (optional)
# COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
