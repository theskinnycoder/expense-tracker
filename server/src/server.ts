import { ApolloServer } from "apollo-server-express"
import { config } from "dotenv"
import Express, { Request, Response, static as serveStatic } from "express"
import { join } from "path"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import TransactionResolvers from "./resolvers/TransactionResolvers"
import connectDB from "./utils/connectDB"
import { __is_prod__ } from "./utils/constants"

// DotENV Config
config()

// Extract Required Environment Variables
const { PORT, NODE_ENV } = process.env

// Main Async Function to listen for requests only after connecting to the DB
;(async () => {
  // Connect to the DataBase
  await connectDB()

  // Create an Express Web-App Instance
  const app = Express()

  // Create an Apollo-Server Instance
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TransactionResolvers]
    })
  })

  // Apply the Express Web-App as middleware to the Apollo-Server
  server.applyMiddleware({ app })

  // Serve the React App's built SPA as the main route in production
  if (__is_prod__) {
    const root = join(__dirname, "../..", "client", "build")
    app.use(serveStatic(root))
    app.get("*", (_: Request, res: Response) =>
      res.sendFile("index.html", { root })
    )
  }

  // Keep listening for requests
  app.listen(PORT, () =>
    console.log(
      `Server up and running in ${NODE_ENV} mode and is listening for requests at http://localhost:${PORT}${
        !__is_prod__ ? server.graphqlPath : ""
      }`
    )
  )
})()
