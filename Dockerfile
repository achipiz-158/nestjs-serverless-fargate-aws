# Etapa de construcción (build)
FROM node:16.20.1 as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /hyachipiz

# Copiar package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar todas las dependencias, incluyendo las de desarrollo
RUN npm install

# Copiar todo el código fuente al directorio de trabajo ///
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:16.20.1

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /hyachipiz

# Copiar package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar solo las dependencias de producción (sin dependencias de desarrollo)
RUN npm install --only=production

# Copiar los archivos de construcción (la aplicación compilada) desde la etapa de construcción
COPY --from=build /hyachipiz/dist ./dist

# Especificar el comando para iniciar la aplicación en producción
CMD ["npm", "run", "start:prod"]

