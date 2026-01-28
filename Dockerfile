FROM node:20-slim

RUN apt-get update \
 && apt-get install -y netcat-openbsd \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# INSTALL SEMUA DEPENDENCY TERMASUK DEV
RUN npm install --include=dev

# SET NODE_ENV PRODUCTION SETELAH npm install
ENV NODE_ENV=production

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
