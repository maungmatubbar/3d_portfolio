# --- Build stage ---
FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies (including dev deps needed to build)
COPY package*.json ./
RUN npm ci

# Build the application
COPY . .
RUN npm run build

# Drop dev dependencies so we can copy a lean node_modules into the runtime image
RUN npm prune --omit=dev

# --- Runtime stage ---
FROM node:24-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Copy only what we need to run
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

EXPOSE 4000

CMD ["node", "dist/main"]
