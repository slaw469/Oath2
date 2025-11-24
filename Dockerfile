FROM node:20-bullseye AS base

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY tsconfig.json next.config.ts postcss.config.js tailwind.config.ts prisma.config.ts ./

RUN npm ci

# Generate Prisma client (does not require a live database)
RUN npx prisma generate

# Now copy the rest of the source
COPY . .

EXPOSE 3000

# By default run the dev server for hot reloading
CMD ["npm", "run", "dev"]


