FROM oven/bun:latest AS deps

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

FROM oven/bun:latest AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["bun", "server.js"]
