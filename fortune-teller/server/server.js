const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // to support JSON-encoded bodies
app.use(bodyParser.json()); // to support URL-encoded bodies

// connect to MySQL database
const connection = mysql.createConnection(config);

// SQL queries
let INSERT_NEW_QUESTION_QUERY = 'INSERT INTO questionnaire SET ?';
let INSERT_NEW_FACE_QUERY = 'INSERT INTO user_face (faceImage) VALUES (?)';

// add new user question to MySQL database
app.post('/api/newquestion', (req, res) => {
    let data = req.body;
    connection.query(INSERT_NEW_QUESTION_QUERY, data, (error, results) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// add new user face image to MySQL database
app.post('/api/newface', upload.single('faceImage'), (req, res) => {
    const faceImage = req.file
    fs.readFile(faceImage.path, (err, data) => {
        connection.query(INSERT_NEW_FACE_QUERY, data, (error, results) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        })
    })
    // connection.query(INSERT_NEW_FACE_QUERY, faceImage, (error, results) => {
    //     if (error) throw error;
    //     res.end(JSON.stringify(results));
    // });
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