# Dockerfile

# Use the official Node.js image
FROM node:19.1.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose the port that your application will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.js"]
