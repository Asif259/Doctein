# Use the official Node.js image
FROM node:20.18.1-alpine3.19

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
