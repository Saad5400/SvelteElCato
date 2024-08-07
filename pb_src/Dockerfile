FROM alpine:latest

ARG PB_VERSION=0.22.12

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the container
COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the container
COPY ./pb_hooks /pb/pb_hooks

# ceate /pb/pb_hooks/env.json file with the "environment" key set to "production"
RUN echo '{"environment": "production"}' > /pb/pb_hooks/env.json

# uncomment to copy the local pb_public dir into the container
# COPY ./pb_public /pb/pb_public

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
