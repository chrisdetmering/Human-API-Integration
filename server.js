require('dotenv').config();
const humanApiService = require('./services/humanApiService');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const express = require('express');
const path = require('path');
const server = express();
const pool = require('./database/dbPoolService').getPool();
const usersService = require('./services/usersService');

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



server.post('/api/id/token', async (req, res) => {
    const { client_user_id } = req.body

    try {
        const token = await humanApiService.getIdToken(client_user_id)
        const access_token = await humanApiService.getAccessToken(client_user_id)

        //setting session properties 
        //keep the session token in case the user refreshes the page
        req.session.session_token = token

        //client user id is used for? 
        req.session.client_user_id = client_user_id

        //this is needed to make request to the Human API as the Bearer Token
        req.session.access_token = access_token

        res.status(200);
        res.send({ session_token: token });
    } catch (error) {
        res.status(error.response.data.statusCode)
            .send({ errorMessage: error.response.data.message });
    }

})


server.post('/api/session/token', async (req, res) => {
    const { client_user_id, client_user_email } = req.body

    try {
        const isExistingUser = await usersService.isExistingUser(client_user_id)

        if (isExistingUser) {
            res.status(409)
                .send({ message: 'client_user_id already exists' })
        } else {
            await usersService.addUser(client_user_id, client_user_email)
        }

        const token = await humanApiService.getSessionToken(client_user_id, client_user_email)

        req.session.session_token = token
        req.session.client_user_id = client_user_id

        res.status(200);
        res.send({ session_token: token });
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
    if (req.session.session_token) {
        const session_token = req.session.session_token
        res.status(200).send({ session_token })
    } else {
        res.status(401).send({ message: 'You are not logged in' })
    }
})

//HUMAN API
server.get('/api/access/token', async (req, res) => {
    const { client_user_id } = req.session

    try {
        const access_token = await humanApiService.getAccessToken(client_user_id);
        req.session.access_token = access_token
        res.status(200);
        res.send({ access_token });
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send(error);
    }
})


server.get('/api/clinical', async (req, res) => {
    const token = req.session.access_token

    try {
        const response = await humanApiService.getVitals(token)
        res.status(200);
        res.send(response.data);
    } catch (error) {
        res.status(500)
        res.send(error);
    }
})

server.get('/api/reports', async (req, res) => {
    const token = req.session.access_token

    try {
        const response = await humanApiService.getAllReports(token)
        const reports = response.data;
        const summary = await humanApiService.getReportsSummaryBy('timeline', reports, token)

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