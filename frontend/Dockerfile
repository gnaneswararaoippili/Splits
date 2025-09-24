# frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
# This is a key optimization.
COPY package*.json ./

# Install all dependencies from package.json
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Run the build command
RUN npm run build

# Expose the port your frontend runs on
EXPOSE 5173

# Define the command to run the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]