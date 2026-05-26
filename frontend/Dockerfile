FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Aceptar variables de construcción
ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL

# Exponer puerto de Vite
EXPOSE 5173

# Ejecutar Vite en modo desarrollo con acceso remoto
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
