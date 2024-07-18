# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
<<<<<<< HEAD
RUN yarn install

COPY . .

RUN yarn run build
=======
RUN npm install

COPY . .

RUN npm run build
>>>>>>> refs/remotes/origin/devops-docker-files

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

COPY .env.example .env

EXPOSE 3000

<<<<<<< HEAD
CMD ["yarn", "start"]
=======
CMD ["npm", "start"]
>>>>>>> refs/remotes/origin/devops-docker-files
