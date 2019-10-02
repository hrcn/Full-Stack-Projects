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

const FBAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized.' });
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token', err);
            return res.status(403).json(err);
        })
}

// POST ONE SCREAM
app.post('/scream', FBAuth, (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.handle,
        createdAt: new Date().toISOString()
    };

    db.collection('screams')
    .add(newScream)
    .then(doc => {
        res.json({ message: 'document ${doc.id} created successfully' })
    })
    .catch((err) => {
        res.status(500).json({ error: 'Something went wrong.' });
        console.error(err);
    });
});

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

// SIGN UP ROUTE
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    let errors = {};

    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty'
    } else if(!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    if(isEmpty(newUser.password)) errors.password = 'Must not be empty'
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Password must match'
    if(isEmpty(newUser.handle)) errors.handle = 'Must not be empty'

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    // validate data
    let token, userId;
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
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc('/users/${newUser.handle}').set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        }) 
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
        .catch((err) => {
            console.error(err);
            if(err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is already in use' });
            } else {
                return res.status(500).json({ error:err.code });
            }
        });
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    
    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Must not be empty';
    if(isEmpty(user.password)) errors.password = 'Must not be empty';

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken;
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/wrong-password') {
                return res.status(403).json({ general: 'Wrong password, please try again.' })
            } else {
                return res.status(500).json({ error:err.code });
            }
        });
});

exports.api = functions.https.onRequest(app);