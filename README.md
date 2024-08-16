# library-management

## 📜Contents

- CCTV management app contents
  - [🔍Stacks](#stacks)
  - [🛠️Installation](#️installation)

## 🔍Stacks

Application Stacks:

- ExpressJS
- Node JS
- Mongo DB
- Mongoose ODM
- Jest

## 🛠️Installation

To run this app, follow this steps:

1. Clone this repo and navigate to the project directory:

   ```bash
   git clone https://github.com/rizqitaufiqf/eigen3dev-library-management.git && cd eigen3dev-library-management
   ```

2. Create .env file called `.env` and fill the following:

   ```env
    PORT=3000
    MONGO_URI=MONGO DB URL (ex: mongodb://book:pass@localhost:27017/)
   ```

3. Open your terminal and run to install all dependencies:

   ```bash
   pnpm i
   ```

   if you use npm:

   ```bash
   npm install
   ```

4. Initiate Collection first:

   ```bash
   pnpm init-db
   ```

   if you use npm:

   ```bash
   npm run init-db
   ```

5. Start server:

   ```bash
   pnpm start
   ```

   if you use npm:

   ```bash
   npm run start
   ```

6. You are good to go! open the http://localhost:3000/docs to open the API Docs.
7. If you want to run the server in development, you can use:

   ```bash
   pnpm start:dev
   ```

   if you use npm:

   ```bash
   npm run start:dev
   ```

8. If you want to test some service you can use:

   ```bash
   pnpm test
   ```

   if you use npm:

   ```bash
   npm run test
   ```
