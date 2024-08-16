# library-management

## 📜Contents

- CCTV management app contents
  - [🔍Stacks](#stacks)
  - [🛠️Installation](#️installation)
    - [🐳Docker](#docker)
    - [🖥️Local Machine](#️-local-machine)

## 🔍Stacks

Application Stacks:

- ExpressJS
- Node JS
- Mongo DB
- Mongoose ODM
- Jest
- Makefile
- Docker
- Docker Compose

## 🛠️Installation

### 🐳Docker

To run this app (using Docker), follow this steps:

1. Make sure you have Makefile, Docker and Docker Compose installed and configured on your system.
2. Clone this repo and navigate to the project directory:

```bash
git clone https://github.com/rizqitaufiqf/eigen3dev-library-management.git && cd eigen3dev-library-management
```

3. Create .env file called `.env` and fill the following:

```env
    PORT=3000
    MONGO_URI=MONGO DB URL (ex: mongodb://book:pass@localhost:27017/)
```

4. Open your terminal and run:

```bash
make fresh-start
```

if you want to make sure to see the logs from the server run:

```bash
make logs-web
```

Wait server's container connected to MongoDB container

5. You are good to go! open the http://localhost:3000.

### 🖥️ Local Machine

To run this app on your Local Machine, follow this step:

1. Make sure you have Makefile, Docker and Docker Compose installed and configured on your system.
2. Clone this repo and navigate to the project directory:

```bash
git clone https://github.com/rizqitaufiqf/eigen3dev-library-management.git && cd eigen3dev-library-management
```

3. Create .env file called `.env` and fill the following:

```env
    PORT=3000
    MONGO_URI=MONGO DB URL (ex: mongodb://book:pass@localhost:27017/)
```

4. Open your terminal and run to install all dependencies:

```bash
pnpm i
```

if you use npm:

```bash
npm install
```

5. Initiate Collection first:

```bash
pnpm init-db
```

if you use npm:

```bash
npm run init-db
```

6. Start server:

```bash
pnpm start
```

if you use npm:

```bash
npm run start
```

7. You are good to go! open the http://localhost:3000/docs to open the API Docs.
8. If you want to run the server in development, you can use:

```bash
pnpm start:dev
```

if you use npm:

```bash
npm run start:dev
```

9. If you want to test some service you can use:

```bash
pnpm test
```

if you use npm:

```bash
npm run test
```
