FROM node:25 AS build
WORKDIR /app
ARG VUE_APP_API_BASE_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL" > .env && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
