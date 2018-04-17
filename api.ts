import * as express from 'express';
import * as mysql from 'mysql';

const router = express.Router();
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myapp',
    password: ''
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected!');
    }
});


router.post('/signup', (req, res) =>  {
    console.log(req.body);
    if (!req.body || !req.body.u || !req.body.u || !req.body.p) {
        return res.status(400).send('You must send the username and the password');
    }
    con.query('INSERT INTO users (name, email, password) VALUES ("' + req.body.u + '", "' + req.body.u + '", "' + req.body.u + '"); ', function (err, rows, fields) {
        // conn.end();
        console.log(err);
        if (!err) {
            console.log('The solution is: ', rows);
            res.status(200).send({
                id_token: 'test'
            });
        } else {
            console.log('Error while performing Query.');
            return res.status(200).send('error');
        }
    });
});
router.get('/users', function (req, res, next) {
    console.log(1);
    con.query('SELECT * from users LIMIT 10', function (err, rows, fields) {
        // conn.end();
        console.log(err);
        if (!err) {
            console.log('The solution is: ', rows);
            return res.status(200).send(rows);
        } else {
            console.log('Error while performing Query.');
            return res.status(200).send('error');
        }
    });
    // res.send('respond with a resource');
});


router.get('*', function (req, res, next) {
    console.log('****************************');
    res.send('respond with a resource');
});

module.exports = router;