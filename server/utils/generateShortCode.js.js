function generateShortCode(callback, db) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 6;

    function generate() {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function checkAndReturn() {
        const code = generate();
        db.query('SELECT * FROM urls WHERE short_code = ?', [code], (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) {
                callback(null, code);
            } else {
                checkAndReturn(); 
            }
        });
    }

    checkAndReturn();
}

module.exports = generateShortCode;
