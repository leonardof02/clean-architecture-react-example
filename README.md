# Clear Architecture Todo App Example with React + Typescript

This is a sample app that I create follow the clean architecture principles applied to frontend, I have a full tutorial of this at [my YouTube channel](https://www.youtube.com/channel/UCikk0dXuvTMDVDmXVAhwAAw/) explining all the concepts that I applied to build this example, check it out if you are interested:

Link to the playlist: [Clean Architecture with React Series](https://www.youtube.com/watch?v=1tiz9_AbmZ0&list=PL1-d6o0SXOR4ciPRz3q6G1tsxRAGqSVbz)

## Installation

To run this app, install the dependencies with yout favorite package manager:

```shell
pnpm install # pnpm (my favorite)
npm install # npm
yarn install # yarn
```

### JSON Server

This project use JSON Server to mock server API. To run JSON server go to the app directory and use the following command in your favorite package manager.

```shell
# In app directory
pnpm dlx json-server ./src/features/todos/infrastructure/json-server/db.json -
p 8000 # pnpm
npx json-server ./src/features/todos/infrastructure/json-server/db.json -
p 8000 #npm
yarn dlx json-server ./src/features/todos/infrastructure/json-server/db.json -
p 8000 # yarn
```

After that you can test the app.
