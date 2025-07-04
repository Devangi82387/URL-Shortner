const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yamunaji5",
    database: "url_shortener"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL DB");

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS urls (
            id INT AUTO_INCREMENT PRIMARY KEY,
            long_url TEXT NOT NULL,
            short_code VARCHAR(6) NOT NULL UNIQUE,
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("URLs table ensured.");
    });
});

module.exports = db;
