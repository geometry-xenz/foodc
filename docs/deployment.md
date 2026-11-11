# DRISHYAM — Production Deployment & Operations Guide

---

## 1. Production Architecture Overview

In production, DRISHYAM runs as a multi-tier containerized stack behind a **Caddy** reverse proxy providing automatic HTTPS, TLS termination, and Brotli/Gzip compression.

```
       [ Public Internet (Web Browsers & Android Clients) ]
                                |
                         HTTPS (Port 443)
                                v
               +----------------------------------+
               |        Caddy Reverse Proxy       |
               |   - Auto Let's Encrypt TLS       |
               |   - Security Headers (HSTS, CSP) |
               |   - Gzip & zstd compression      |
               +----------------------------------+
                        |                |
             /api/*     |                |   /*
                        v                v
         +--------------------+    +--------------------+
         |   FastAPI Service  |    |  Next.js Web App   |
         |    Uvicorn :8000   |    |    Node.js :3000   |
         +--------------------+    +--------------------+
                   |
                   v
         +--------------------+
         |   PostgreSQL 15+   |
         |     Port 5432      |
         +--------------------+
```

---

## 2. Docker Compose Deployment

The complete production stack is defined in [`deploy/docker-compose.yml`](file:///home/suman/personal/foodc/deploy/docker-compose.yml):

### Launching the Stack
```bash
# 1. Clone repository on target server
git clone https://github.com/Shivam5567/Foodoscope.git drishyam && cd drishyam

# 2. Configure environment variables
cp .env.example .env
cp backend/.env.example backend/.env
# Edit .env and backend/.env with production database passwords and hostnames

# 3. Start containers in daemon mode
docker compose -f deploy/docker-compose.yml up -d --build

# 4. Run database migrations
docker compose -f deploy/docker-compose.yml exec api alembic upgrade head
```

---

## 3. Caddy Reverse Proxy Configuration

Caddy automatically provisions SSL certificates and terminates HTTPS:

```caddy
drishyam.kitchen {
    encode gzip zstd

    # Route backend REST and OpenAPI docs
    handle /api/* {
        reverse_proxy api:8000
    }
    handle /docs* {
        reverse_proxy api:8000
    }
    handle /openapi.json {
        reverse_proxy api:8000
    }

    # Route web application
    handle /* {
        reverse_proxy web:3000
    }

    # Production Security Headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```

---

## 4. Next.js Production Build

To run the Next.js frontend in standalone production mode without Docker:
```bash
# Install dependencies
npm ci

# Build optimized production bundle
npm run build

# Start production server
npm run start -- -p 3000
```

---

## 5. Security Checklist for Production

1. **Cleartext Traffic:** Android release builds strictly set `android:usesCleartextTraffic="false"` and require valid TLS certificates.
2. **Session Cookies:** `drishyam_session` cookies are set with `Secure; HttpOnly; SameSite=Lax`.
3. **Database Credentials:** Never hardcode passwords. Provide `DATABASE_URL` via environment variables or secret vaults.
4. **Rate Limiting:** FastAPI implements in-memory IP rate limiting on `/api/auth/*` and `/api/scan/deep-inspect` to prevent brute force and abuse.
