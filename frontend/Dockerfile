# Build Stage
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json first to improve caching
COPY package*.json ./

# Install npm dependencies
RUN npm install -g npm @angular/cli && npm install

# Copy source files
COPY . .

# Check if Angular CLI is available
RUN node -v && npm -v && npx -v && ng version

# Build Angular app
RUN ng build --configuration=production

# Nginx Stage
FROM nginx:latest
COPY --from=build /app/dist/frontend/browser/. /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
