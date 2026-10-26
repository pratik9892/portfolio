# Build context is the repo root (see docker-compose.yml) so nginx/ is reachable.

# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_DATA_SOURCE=static
ENV VITE_DATA_SOURCE=$VITE_DATA_SOURCE
# The optional GitHub token is mounted as a build secret so it never lands in an image layer.
RUN --mount=type=secret,id=github_token \
    GITHUB_TOKEN="$(cat /run/secrets/github_token 2>/dev/null || true)" npm run build

# --- serve stage ---
FROM nginx:1.27-alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/healthz || exit 1
