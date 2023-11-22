FROM node:18

WORKDIR /app

# COPY package*.json ./
COPY . /app

RUN npm install

# COPY . .

# ENV PORT=3000

# EXPOSE 3000

ENTRYPOINT ["npm", "start"]