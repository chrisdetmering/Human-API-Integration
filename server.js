require('dotenv').config();
const { Pool } = require('pg')
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const express = require('express');
const path = require('path');
const server = express();
const axios = require('axios');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'human_api',
    password: 'ChrisSQL',
})

server.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
        pool: pool,
    }),
    cookie: { maxAge: 60 * 60 * 1000 }
}));


server.use(express.json())
server.use('/', express.static(path.join(__dirname, 'client/build')))

server.post('/login', async (req, res) => {
    const { client_user_id, client_user_email } = req.body

    const data = {
        client_id: process.env.CLIENT_ID,
        client_user_id,
        client_user_email,
        client_secret: process.env.CLIENT_SECRET,
        type: "session"
    }

    const config = {
        method: 'POST',
        url: process.env.TOKEN_AUTH_ENDPOINT,
        data
    }

    try {
        const response = await axios(config);

        req.session.session_token = response.data.session_token
        req.session.client_user_id = client_user_id
        res.status(200);
        res.send(response.data);
    } catch (error) {
        res.status(500)
        console.log(error)
        res.send(error.data);
    }

})

server.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send({ errorMessage: error.message })
        } else {
            res.clearCookie('connect.sid')
            res.status(200)
            res.send({ message: 'You have been logged out!' })
        }

    });
})

server.get('/session', async (req, res) => {
    if (req.session.client_user_id) {
        const session_token = req.session.session_token
        res.status(200).send({ session_token })
    } else {
        res.status(401).send({ message: 'You are not logged in' })
    }
})

//HUMAN API
//ACCESS TOKEN
server.get('/api/access/token', async (req, res) => {
    const data = {
        client_id: process.env.CLIENT_ID,
        client_user_id: req.session.client_user_id,
        client_secret: process.env.CLIENT_SECRET,
        type: "access"
    }

    const config = {
        method: 'POST',
        url: process.env.TOKEN_AUTH_ENDPOINT,
        data
    }

    try {
        const response = await axios(config);
        req.session.access_token = response.data.access_token
        res.status(200);
        res.send(response.data);
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send(error);
    }
})


server.get('/api/clinical', async (req, res) => {
    const token = req.session.access_token
    const config = {
        method: 'GET',
        url: 'https://api.humanapi.co/v1/human/medical/vitals',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const response = await axios(config);
        res.status(200);
        res.send(response.data);
    } catch (error) {
        res.status(500)
        res.send(error);
    }
})

server.get('/api/reports', async (req, res) => {
    const token = req.session.access_token
    const config = {
        method: 'GET',
        url: 'https://api.humanapi.co/v1/human/medical/reports',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const response = await axios(config);
        const reportId = response.data.filter(report => report.name === 'timeline')[0].id

        const con = {
            method: 'GET',
            url: `https://api.humanapi.co/v1/human/medical/reports/${reportId}/raw?format=json`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const result = await axios(con);
        const summary = Object.entries(result.data);
        res.status(200)
            .send({ summary });
    } catch (error) {
        console.log(error)
        res.status(500)
            .send(error);
    }
})

server.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
server.listen(3000)