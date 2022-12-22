FROM cypress/base:18.12.1
RUN mkdir /parabank
WORKDIR /parabank
COPY package.json .
RUN npm install
COPY . .
RUN $(npm bin)/cypress verify
CMD ["npm", "run", "cy:run"]