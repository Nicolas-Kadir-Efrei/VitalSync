# VitalSync (E6) — CI/CD conteneurisée

Application minimaliste composée de :
- **backend** : API Node.js/Express (port **3000**)
- **frontend** : page statique servie par **Nginx** (port **8080** en local)
- **database** : PostgreSQL (volume persistant)

## Architecture (schéma)

```mermaid
flowchart LR
  U[Utilisateur / Navigateur] -->|HTTP :8080| FE[Nginx Frontend]
  FE -->|/api/* proxy_pass| BE[API Express :3000]
  BE -->|TCP 5432| DB[(PostgreSQL)]
```

## Prérequis
- Docker Desktop (avec Docker Compose)
- Node.js (uniquement si vous lancez le backend hors Docker)

## Lancer en local (Docker Compose)

1) Créer le fichier `.env` à partir de l’exemple :

```bash
cp .env.example .env
```

2) Démarrer :

```bash
docker compose up --build
```

3) Vérifications rapides :
- Front : `http://localhost:8080`
- Health API direct : `http://localhost:3000/health`
- Health via proxy front : `http://localhost:8080/api/health`

## CI/CD (GitHub Actions)

Pipeline (dossier `.github/workflows/ci-cd.yml`) :
- **Lint & Tests** : install + `npm test` + `npm run lint` (backend)
- **Build Docker** : build + push images **backend** et **frontend** vers **GHCR**, taggées avec le **SHA** du commit
- **Staging** : lancement via `docker compose up` et **healthcheck** HTTP. Échec si `/health` ne répond pas.

## Registry
Les images sont poussées sur **GitHub Container Registry (GHCR)** :
- `ghcr.io/<owner>/vitalsync-backend:<sha>`
- `ghcr.io/<owner>/vitalsync-frontend:<sha>`

