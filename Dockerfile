# One stage build 

# FROM alpine:3.20

# WORKDIR /app
# RUN apk add npm nodejs

# COPY Cloud/src/ /app/src/
# COPY Cloud/tests/ /app/tests/
# COPY Cloud/dist/ /app/dist/
# COPY Cloud/package.json /app

# RUN npm install 

# EXPOSE 3000 

# CMD ["npm", "run", "start"]


# Multistage build

# stage compilation
FROM alpine:latest AS builder
# toutes les étapes nécessaires à la compilation de l'application
WORKDIR /app

COPY Cloud/package.json /app
COPY Cloud/tsconfig.json /app

COPY Cloud/src/ /app/src/
COPY Cloud/tests/ /app/tests/
COPY Cloud/dist/ /app/dist/

RUN apk add npm
RUN npm install

RUN npm run build

# stage exécution
FROM alpine:latest AS runner
# toutes les étapes nécessaires à l'exécution de l'application
WORKDIR /app

RUN apk add --no-cache nodejs npm

# indice : pour récupérer des fichiers depuis le stage précédent
COPY --from=builder /app /app

CMD ["npm", "run", "start"]
