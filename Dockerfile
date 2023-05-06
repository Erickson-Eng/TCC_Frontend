FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm install typescript@latest -g

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Expose port 4200
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
