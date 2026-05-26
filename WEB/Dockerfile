# DLL-Transports — static preview of 4 design variants + legacy site snapshot
# Serves on port 80 via nginx-alpine.
FROM nginx:1.27-alpine

# Build-time version info (override at build with --build-arg BUILD_VERSION=...)
# Defaults to the build timestamp if not provided by the CI/Coolify build.
ARG BUILD_VERSION
ENV BUILD_VERSION=${BUILD_VERSION}

RUN rm -rf /usr/share/nginx/html/*

COPY index.html /usr/share/nginx/html/index.html
COPY tweaks-panel.jsx /usr/share/nginx/html/tweaks-panel.jsx
COPY README.md /usr/share/nginx/html/README.md
COPY assets/ /usr/share/nginx/html/assets/
COPY variant-a/ /usr/share/nginx/html/variant-a/
COPY variant-c/ /usr/share/nginx/html/variant-c/
COPY variant-d/ /usr/share/nginx/html/variant-d/
COPY variant-e/ /usr/share/nginx/html/variant-e/

# Static snapshot of the current production site (served at /old/)
COPY OLD/ /usr/share/nginx/html/old/

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Inject the build version into every HTML file's __BUILD_VERSION__ placeholder.
# If BUILD_VERSION wasn't passed at build-time, fall back to the image build date.
RUN BV="${BUILD_VERSION:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}" \
 && echo "Stamping HTML with build version: ${BV}" \
 && find /usr/share/nginx/html -type f -name "*.html" \
      -exec sed -i "s|__BUILD_VERSION__|${BV}|g" {} + \
 && echo "${BV}" > /usr/share/nginx/html/build.txt

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
