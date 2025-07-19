FROM oven/bun:latest
WORKDIR /
COPY . .
RUN bun install
CMD ["bun", "start"]
