const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

let app = express();

app.use(cors());
 
// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// to support URL-encoded bodies
app.use(bodyParser.json());

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
    res.send('home page')
});

let INSERT_NEW_QUESTION_QUERY = 'INSERT INTO questionnaire SET ?';

app.post('/api/newquestion', (req, res) => {
    let data = req.body;
    connection.query(INSERT_NEW_QUESTION_QUERY, data, (error, results) => {
           if (error) throw error;
           res.end(JSON.stringify(results));
         });
});

connection.connect((err) => {
    if(err) {
        return console.error(err.message);
    } else {
        console.log("Server Connected!")
    }
});

const port = 4000;
app.listen(port, () => console.log('Server started and listening on ' + port));