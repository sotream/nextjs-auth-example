<h1 align="center">
    Next.js home savings app
</h1>
<br>

<div align="center">
    <!-- Last commit -->
    <img src="https://img.shields.io/github/last-commit/sotream/nextjs-home-savings.svg?longCache=true&style=flat-square" alt="Last commit"
    />
    <!-- Dependencies -->
    <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg?longCache=true&style=flat-square" alt="Dependencies"
    />
    <!-- Contributors welcome -->
    <img src="https://img.shields.io/badge/contributions-welcome-orange.svg?longCache=true&style=flat-square" alt="Last update"
    />
</div>
<div align="center">
    <!-- Мій LinkedIn -->
    <a href="https://www.linkedin.com/in/andrii-prisniak">
        <img src="https://img.shields.io/badge/Let's%20connect%20on%20LinkedIn-LinkedIn-blue.svg?longCache=true&style=for-the-badge&link=https://www.linkedin.com/in/andrii-prisniak"
            alt="Lets connect" />
    </a>
</div>
<br>

<p>
    👨🏼‍🔬 I will add some description soon.
</p>
<br>


## Project technologies:

1. [Next.js](https://nextjs.org/)
2. [React query](https://tanstack.com/query)
3. [ElephantSQL (for production)](https://www.elephantsql.com/)
4. [Docker](https://www.docker.com/)
5. [Docker Compose](https://docs.docker.com/compose/)

## 1. Install dependencies

```bash
npm install
```

## 2. Setup local environment

```bash
docker-compose -f ./docker/docker-compose.yml up -d
```

This command will run local PostgreSQL and local Redis instances.

## 3. Create local `.env` file

```yaml
POSTGRES_DATABASE="nextjsauth"
POSTGRES_HOST="127.0.0.1"
POSTGRES_PORT="5433"
POSTGRES_PASSWORD="RSu6a3ncKRRSF6Yv"
POSTGRES_USER="admin"
JWT_TOKEN_SECRET="pa$$w0rD"
```

## 4. Initialize local DB

```bash
npm run setup:db:dev
```

## 5. Running the app in dev mode

```bash
npm run dev
```
