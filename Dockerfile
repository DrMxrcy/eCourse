# Build
FROM node:20.11.1-buster as build

WORKDIR /build

COPY ui/package*.json .
RUN npm install

COPY ui .

# Use build arguments to pass environment variables
ARG VITE_PROD_PB_URL
ARG VITE_DEV_PB_URL

# Generate .env file based on the build arguments
RUN echo "VITE_PROD_PB_URL=${VITE_PROD_PB_URL:-http://127.0.0.1:8090}" > .env && \
    echo "VITE_DEV_PB_URL=${VITE_DEV_PB_URL:-http://127.0.0.1:8090}" >> .env

RUN npm run build

# Pocket Base
FROM alpine:latest as pb

ARG PB_VERSION=0.21.3

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

COPY pb/pb_migrations /pb/pb_migrations
COPY pb/pb_hooks /pb/pb_hooks

# Runner
FROM alpine:latest

WORKDIR /app

COPY --from=pb /pb pb/
COPY --from=build /build/dist/ pb/pb_public/

# Ensure the volume is correctly set up
VOLUME /app/pb/pb_data

EXPOSE 8090

CMD ["pb/pocketbase", "serve", "--http=0.0.0.0:8090"]