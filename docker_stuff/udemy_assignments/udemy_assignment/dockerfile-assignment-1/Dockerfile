FROM node:gallium-bullseye


USER node

WORKDIR /here
COPY --chown=node:node . . 
EXPOSE 3000
RUN npm install 
CMD ["npm", "start"]




