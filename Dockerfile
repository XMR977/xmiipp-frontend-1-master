# Use a Node.js base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire Next.js app into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app will listen on (e.g., 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
