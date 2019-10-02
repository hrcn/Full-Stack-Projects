const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyAW0PslpBbrSjN-8HnazZ_yUAX8BxCrYfQ",
    authDomain: "social-media-app-c5b59.firebaseapp.com",
    databaseURL: "https://social-media-app-c5b59.firebaseio.com",
    projectId: "social-media-app-c5b59",
    storageBucket: "social-media-app-c5b59.appspot.com",
    messagingSenderId: "750572210139",
    appId: "1:750572210139:web:a8731944985cbf62e509fe",
    measurementId: "G-QCY0SXSRYW"
  };

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
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

    db
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

// SIGN UP ROUTE
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            return res.status(201).json({ message: 'user ${data.user.uid} signed up successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
})

// VALIDATE DATA
db.doc('/users/${newUser.handle}').get()
    .then(doc => {
        if(doc.exists){
            return res.status(400).json({ handle: 'this handle is already taken' });
        } else {
            firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    })

exports.api = functions.https.onRequest(app);