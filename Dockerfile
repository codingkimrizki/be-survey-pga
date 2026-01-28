# Pakai image Node.js official
FROM node:20-slim

# Install netcat
RUN apt-get update \ 
    && apt-get install -y netcat-openbsd \ 
    && rm -rf /var/lib/apt/lists/*

# Buat working directory di container
WORKDIR /app

# Copy package.json dan package-lock.json dulu biar cache npm bisa dipakai
COPY package*.json ./

# Install dependencies
RUN npm install --include=dev

# Copy semua file project
COPY . .

# Copy entrypoint script dan kasih hak eksekusi
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set environment variable (opsional, bisa juga pakai .env)
ENV NODE_ENV=production

# Expose port aplikasi
EXPOSE 3000

# Ganti CMD default jadi entrypoint
ENTRYPOINT ["/entrypoint.sh"]
