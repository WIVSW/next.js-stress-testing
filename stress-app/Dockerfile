FROM node:22-alpine
WORKDIR /app
COPY . ./
RUN apk add apache2-utils
RUN  npm ci
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]