# Entre nous — API REST (backend)

Backend du mini-réseau social « Entre nous », réalisé dans le cadre de l'évaluation ESGI 2e année (API REST — Node.js / Express / MySQL / Sequelize).

## Prérequis

- Node.js (v18+ recommandé)
- MySQL (ou MAMP, qui embarque MySQL)
- npm

## Installation

Depuis le dossier `backend/` :

```bash
npm install
```

## Configuration MySQL

Le backend se connecte à une base MySQL via Sequelize. La configuration se fait dans un fichier `.env` à la racine de `backend/` (non versionné) :

```
JWT_KEY = <une_cle_secrete_jwt>
DB_HOST = localhost
DB_NAME = eval-api
DB_USER = root
DB_PASSWORD = root
DB_PORT = 8889
```

- `DB_NAME` : nom de la base MySQL à créer au préalable (ex. `eval-api`).
- `DB_PORT` : port MySQL (`8889` par défaut avec MAMP, `3306` avec une installation MySQL standard).
- `JWT_KEY` : clé utilisée pour signer/vérifier les tokens JWT d'authentification.

Créer la base avant de lancer l'application, par exemple via phpMyAdmin ou en ligne de commande :

```sql
CREATE DATABASE `eval-api`;
```

## Initialisation des tables

Les tables (`users`, `posts`, `comments`) sont créées automatiquement via Sequelize. Lancer le script de synchronisation une fois la base créée et le `.env` configuré :

```bash
node script/sync.js
```

Ce script crée (ou met à jour, via `alter: true`) les tables et leurs relations à partir des modèles Sequelize. Les données persistent entre les redémarrages du serveur (pas de réinitialisation automatique).

## Lancement du serveur

```bash
node server.js
```

Le serveur écoute sur `http://localhost:3001`. Toutes les routes de l'API sont préfixées par `/api`.

Vérifier que le serveur et la base répondent via :

```
GET http://localhost:3001/api/health
```

## Lancement du client React

Le client est fourni dans `frontend/`. Se référer à son propre `README.md` pour le détail ; en résumé :

```bash
cd frontend
npm install
npm run dev
```

Le proxy Vite du client redirige automatiquement les requêtes `/api` vers le serveur backend (`http://localhost:3001`), sans configuration CORS supplémentaire nécessaire.

## Routes principales

| Méthode | Route | Accès |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protégé |
| POST | `/api/auth/logout` | Protégé |
| GET | `/api/posts` | Public |
| POST | `/api/posts` | Protégé |
| POST | `/api/posts/:postId/comments` | Protégé |

Les routes protégées nécessitent un en-tête `Authorization: Bearer <token>` obtenu via `/api/auth/register` ou `/api/auth/login`.

## Collection de requêtes API

Une collection de requêtes (Postman/Talend/Bruno) couvrant les 7 routes ci-dessus est fournie dans le dépôt pour faciliter les tests.
