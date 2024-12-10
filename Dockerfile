# Etapa 1: Construcción
FROM node:20.12.2-alpine AS builder

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente de la aplicación
COPY . .

# Crear la carpeta "dist" con la construcción de producción
RUN npm run build

# Etapa 2: Producción
FROM node:20.12.2-alpine AS production

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar los archivos .env
COPY .env* ./

ENV NODE_ENV=production

# Iniciar el servidor usando la construcción de producción
CMD ["npm", "run", "start:prod"]    