const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

let app = express();
app.use(cors());

const config = {
    host: 'localhost',
    user: 'root',
    password: 'info6210popeyes',
    database: 'prediction'
}

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if(err) {
        return console.error(err.message);
    } else {
        console.log("Server Connected!")
    }
});

const SELECT_ALL = "SELECT * FROM test";

app.get('/', (req, res) => {
    res.send('go to /products to see all the products')
});

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL, (err, results) => {
        if(err) {
            return console.error(err.message);
        } else {
            return res.json({
                data: results
            })
        }
    });
})

app.get('/products/add', (req, res) => {
    const { name, price } = req.query;
    const INSERT_PRODUCT = 'INSERT INTO test (name, price) VALUES ("${name}", ${price})';
    connection.query(INSERT_PRODUCT, (err, results) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('successfully added product')
        }
    })
})

app.listen(4000, () => console.log('Server started and listening on port 4000...'));