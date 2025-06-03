# Use official Node.js image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install dependencies (if package.json exists)
RUN if [ -f package.json ]; then npm install; fi

# Copy the rest of the app
COPY . .

# Copy entrypoint.sh
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose Vite default port
EXPOSE 5173

# Entrypoint to run npm install before starting the dev server
ENTRYPOINT ["/entrypoint.sh"]

# Start the Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
