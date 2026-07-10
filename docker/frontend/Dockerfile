FROM node:24 AS build-stage
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
# 1. On supprime la configuration par défaut qui affiche la page "Welcome to nginx!"
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/default.conf
# 1. On supprime le fichier de configuration par défaut pour éviter les conflits
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

# 2. CORRECTION ICI : On écrase nginx.conf à la RACINE de /etc/nginx/
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/bsn-network-ui/browser /usr/share/nginx/html
EXPOSE 80
