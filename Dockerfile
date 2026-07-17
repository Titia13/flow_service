# Dépendances
FROM node:20-slim AS deps
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci 
# "npm ci" est plus rapide que "npm install", mais nécessite un package-lock.json


FROM node:20-slim AS builder
# RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'env nécessaires AU BUILD (pourquoi??)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Install platform-specific dependencies
RUN npm install --platform=linux --arch=x64 lightningcss
RUN npm rebuild lightningcss
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV production
# Création d'un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copie des fichiers nécessaires depuis l'étape 'builder'
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]