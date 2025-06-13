# Step 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy project files
COPY package*.json ./
RUN npm install

COPY . .

# Build the app
RUN npm install -g env-cmd
RUN npm run build-production

# Step 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
