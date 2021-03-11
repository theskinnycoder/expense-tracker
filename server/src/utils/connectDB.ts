import { createConnection } from "typeorm"
import Transaction from "../entities/Transaction"
import { __is_prod__ } from "./constants"

// Function to create the DB Connection
export default async () => {
  try {
    const conn = await createConnection({
      type: "postgres",
      url: process.env.TYPEORM_URL,
      logging: !__is_prod__,
      synchronize: true,
      entities: [Transaction]
    })
    console.log(`Connected to the ${conn.name} PostgreSQL Database...`)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
