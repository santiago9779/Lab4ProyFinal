import mysql2 from "mysql2/promise"
import "dotenv/config"

//conectar con la base de datos
export const db = await mysql2.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_database,
    namedPlaceholders: true,
  });
  
  console.log("Conectado a base de datos");