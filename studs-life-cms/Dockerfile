FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies needed for sharp (image processing) and others
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Strapi admin
ENV NODE_ENV=production
# These variables are required for the build step, but their values don't matter for the admin panel UI itself
# They will be overridden by the actual env vars at runtime
ENV APP_KEYS="toBeModified1,toBeModified2"
ENV API_TOKEN_SALT="toBeModified"
ENV ADMIN_JWT_SECRET="toBeModified"
ENV TRANSFER_TOKEN_SALT="toBeModified"
ENV JWT_SECRET="toBeModified"
ENV DATABASE_CLIENT="sqlite"

RUN npm run build

# Expose port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
