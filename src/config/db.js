import { createPool } from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER} from "./config.js";

export const pool = createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_DATABASE,
    port: DB_PORT
    
})