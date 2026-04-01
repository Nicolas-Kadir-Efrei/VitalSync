# Multi-stage build: on exécute tests + install en stage build, puis on copie uniquement
# le nécessaire en prod pour réduire la surface d’attaque et la taille de l’image finale.

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm test

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=build /app/server.js ./server.js
EXPOSE 3000
CMD ["node", "server.js"]
