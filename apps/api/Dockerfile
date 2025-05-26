# Base image
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

# ---------------------------
# Builder stage
# ---------------------------
FROM base AS builder

# Install Turbo and pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo

# Copy the full monorepo
COPY . .

# Prune the workspace for only api
RUN turbo prune --scope=api --docker

# ---------------------------
# Dependencies installer
# ---------------------------
FROM base AS installer
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy pruned dependency files
COPY --from=builder /app/out/json/ ./

# Install only necessary dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY --from=builder /app/out/full/ ./

# Copy .env file if present
COPY apps/api/.env ./apps/api/.env

# Build the api app
RUN pnpm turbo run build --filter=api...

# ---------------------------
# Final runner
# ---------------------------
FROM base AS runner
WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app
USER app

# Copy built output and node_modules
COPY --from=installer /app ./

# Copy .env file for runtime
COPY apps/api/.env ./apps/api/.env

EXPOSE 3000
CMD ["node", "dist/apps/api/main"]

