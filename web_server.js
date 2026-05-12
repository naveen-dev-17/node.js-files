const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const get_records   = require("./show_records");
const save_record   = require("./save_record");
const delete_record = require("./delete_record");

const app  = express();
const PORT = 4999;

app.use(cors());
app.use(express.json());

const db_connection = mysql.createConnection({
    host    : "localhost",
    port    : 3306,
    database: "dbNaveen1",
    user    : "naveen1",
    password: "Naveen1@##$$$"
});

db_connection.connect(err => {
    if (err)
    {
        console.error("DB connection failed:", err.message);
        process.exit(1);
    }
    console.log("Connected to MySQL");
});

app.get("/get_records/:table", get_records(db_connection));
app.post("/save_record", save_record(db_connection));
app.delete("/delete_record/:table/:id/:pk", delete_record(db_connection));

app.listen(PORT, "0.0.0.0", () =>
{
    console.log(`Server running on port:${PORT}`);
});