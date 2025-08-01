# Dockerfile
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build

# ---- Production image ----
FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

RUN npm install --omit=dev -g pnpm  && pnpm install --prod --ignore-scripts

CMD ["node", "dist/main"]
