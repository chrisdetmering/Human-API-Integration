require('dotenv').config();
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const express = require('express');
const path = require('path');
const server = express();
const pool = require('./database/dbPoolService').getPool();
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')

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
server.use('/auth', authRoutes)
server.use('/api', apiRoutes)


server.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/build/index.html')));
server.listen(3000)