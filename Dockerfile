FROM oven/bun:latest

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build CSS
RUN mkdir -p dist && bun x tailwindcss -i ./src/global.css -o ./dist/out.css

# Expose port
EXPOSE 3000

# Start the server with the serve script
CMD ["bun", "run", "serve"]
