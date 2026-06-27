FROM node:20-alpine AS base

# Install dependencies needed for sharp (Next.js image optimization)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ---- deps stage ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder stage ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (NEXT_PUBLIC_ vars are baked into the bundle)
ARG NEXT_PUBLIC_STRAPI_URL=https://admin-studs-life.defyzer.com
ARG NEXT_PUBLIC_GOOGLE_SHEETS_URL
ARG STRAPI_API_TOKEN

ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_GOOGLE_SHEETS_URL=$NEXT_PUBLIC_GOOGLE_SHEETS_URL
ENV STRAPI_API_TOKEN=$STRAPI_API_TOKEN
ENV NODE_ENV=production

RUN npm run build

# ---- runner stage ----
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["npm", "start"]
