const express = require('express');
const router = express.Router();
const db = require('../db.js');
const generateShortCode = require('../utils/generateShortCode.js'); 

router.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "URL required" });

    db.query('SELECT * FROM urls WHERE long_url = ?', [longUrl], (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });

        if (results.length > 0) {
            return res.json({ shortCode: results[0].short_code });
        } else {
            generateShortCode((err, code) => {
                if (err) return res.status(500).json({ error: "Error generating code" });

                db.query('INSERT INTO urls (long_url, short_code) VALUES (?, ?)', [longUrl, code], (err) => {
                    if (err) return res.status(500).json({ error: "Insert error" });
                    return res.json({ shortCode: code });
                });
            }, db);
        }
    });
});

module.exports = router;