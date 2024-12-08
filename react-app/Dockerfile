FROM node:22-alpine
WORKDIR /app
COPY . ./
RUN apk add curl
RUN npm ci
RUN npm run build

EXPOSE 3019
CMD ["npm", "start"]