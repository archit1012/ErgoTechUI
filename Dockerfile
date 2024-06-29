# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app/iot_ui_new_client

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

RUN npm install --quite

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5000

# Command to serve the built files using serve from node_modules
CMD ["npx", "serve", "-s", "dist", "-l", "5000"]
