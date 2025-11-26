# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm install --omit=dev

FROM base AS builder
ENV NODE_ENV=development
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/invoice_generator?schema=public
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./tsconfig.json
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS production
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/invoice_generator?schema=public
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
EXPOSE 4000
CMD ["node", "dist/index.js"]
