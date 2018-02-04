// IMPORTS //
const firebase = require('firebase')
const admin = require('firebase-admin')

// FIREBASE INIT //
const serviceAccount = require('./serviceAccountKey.json')

firebase.initializeApp({
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
})

exports.db = admin.database()

exports.default = firebase
