FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./yarn* ./
RUN yarn
COPY ./ ./
RUN npm run build

FROM nginx:1.20
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
ENV NODE_ENV=production
EXPOSE 3000
