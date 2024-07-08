const mysql = require("mysql2");

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"karan@123",
    database:"crudmysql"
});

conn.connect((err) => {
    if(err) throw err;
    console.log("DB Connnected");
})

module.exports = conn;