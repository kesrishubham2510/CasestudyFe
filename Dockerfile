# Step 1: Build the app in a Node environment
FROM node:18-alpine AS build-stage
WORKDIR /app

ARG REACT_APP_API_KEY
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

COPY package*.json ./
RUN npm install
COPY . .
RUN CI=false npm run build

# Step 2: Copy the build to a tiny Nginx server
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]