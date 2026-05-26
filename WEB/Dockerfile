# DLL-Transports — static preview of 4 design variants
# Serves DOCS/Dizaina_paraugi via nginx-alpine on port 80.
FROM nginx:1.27-alpine

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

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1
