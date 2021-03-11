# **PERN-Stack Expense-Tracker using Apollo, TypeScript, and GraphQL**

> An Expense Tracker Web-App built using TypeORM, TypeGraphQL, GraphQL Code Generator etc

## **A. Environemnt Variables**

- Create a **`.env`** file in the project root and add the required data

```env
PORT = 4000
TYPEORM_URI = <Your DB's Connection String>
```

## **B. Install Dependencies**

1. **Install the Server's Dependencies**

```bash
cd server
npm i # yarn
```

2. **Install the Client's Dependencies**

```bash
cd client
npm i # yarn
```

## **C. Scripts**

### 1. **Server Scripts :**

1. **`npm start`** : Runs the server in prod mode
2. **`npm run dev`** : Runs the server in dev mode
3. **`tsc -w`** : Compiles TS to ES-6 in dev mode
4. **`tsc -b`** : Builds TS to ES-6

### 2. **Server Scripts :**

1. **`npm start`** : Runs the client's dev server
1. **`npm run build`** : Builds the client into static assets
