const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/screams', (req, res) => {
    admin
    .firestore()
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamsId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(screams);
    })
    .catch((err) => console.error(err));
})

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin
    .firestore()
    .collection('screams')
    .add(newScream)
    .then(doc => {
        res.json({ message: 'document ${doc.id} created successfully' })
    })
    .catch((err) => {
        res.status(500).json({ error: 'Something went wrong.' });
        console.error(err);
    });
});

// exports.createScream = functions.https.onRequest((req, res) => {
//     if(req.method !== 'POST') {
//         return res.status(400).json({ error: 'Method not allowed' });
//     }
    
    
    
// });

exports.api = functions.https.onRequest(app);