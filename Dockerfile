
# Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código y compilar
COPY . .
RUN npm run build

# Producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Instalar TypeScript 
RUN npm install typescript

# Copiar lo necesario desde la etapa de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/node_modules ./node_modules

# Puerto
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]
