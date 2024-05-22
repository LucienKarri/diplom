# Keycloak docker-compose

Проект развертывания Keycloak с помощью docker-compose.
Docker контейнер содержит следующие образы:

- postgres
- keycloak
- dpage/pgadmin4

## Usage

in root dir:

```sh
docker-compose down
docker-compose up
```

## Get interfaces

_pgAdmin web: http://localhost:9090/_
_pgAdmin web: http://localhost:8090/_
