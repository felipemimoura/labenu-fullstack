import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export default class ConnectionDataBase {
  protected static connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      multipleStatements: true
    }
  })

  static test = async () => ConnectionDataBase.connection.raw(`
    SELECT 1 + 1
  `)

  static destroy = async () => ConnectionDataBase.connection.destroy()
}