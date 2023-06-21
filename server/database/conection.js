const dotenv = require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mssql",
};

async function execute(query){
    try{
        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    execute
  }