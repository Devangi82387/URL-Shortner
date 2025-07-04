const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
const db = require('./db.js');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', urlRoutes);

app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  db.query('SELECT long_url FROM urls WHERE short_code = ?', [shortCode], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('URL not found');
    }
    res.redirect(results[0].long_url);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
