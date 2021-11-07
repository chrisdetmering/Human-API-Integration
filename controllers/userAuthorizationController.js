const humanApiService = require('../services/humanApiService')
const usersService = require('../services/usersService')

const postIdToken = async (req, res) => {
    const { client_user_id } = req.body

    try {
        const isExistingUser = await usersService.isExistingUser(client_user_id)

        if (!isExistingUser) {
            const error = new Error
            error.status = 404
            error.message = 'User does not exist'
            throw error
        }
        const token = await humanApiService.getIdToken(client_user_id)
        const access_token = await humanApiService.getAccessToken(client_user_id)

        req.session.session_token = token
        req.session.client_user_id = client_user_id
        req.session.access_token = access_token

        res.status(200);
        res.send({ session_token: token });
    } catch (error) {

        if (error.response) {
            error.message = error.response.data.message
            error.status = error.response.data.status
        }
        res.status(error.status || 500)
            .send(error.message || 'There was a server error');
    }
}

const postSessionToken = async (req, res) => {
    const { client_user_id, client_user_email } = req.body

    try {
        const isExistingUser = await usersService.isExistingUser(client_user_id)

        if (isExistingUser) {
            const error = new Error()
            error.status = 409
            error.message = 'user already exists'
            throw error
        }

        await usersService.addUser(client_user_id, client_user_email)
        const token = await humanApiService.getSessionToken(client_user_id, client_user_email)

        req.session.session_token = token
        req.session.client_user_id = client_user_id

        res.status(200);
        res.send({ session_token: token });
    } catch (error) {
        if (error.response) {
            error.message = error.response.data.message
            error.status = error.response.data.statusCode
        }
        res.status(error.status || 500)
        res.send(error.message || 'There was a server error');
    }
}

const deleteSession = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.clearCookie('connect.sid')
            res.status(200)
            res.send({ message: 'You have been logged out!' })
        }

    });
}

const getSession = async (req, res) => {
    if (req.session.session_token) {
        const session_token = req.session.session_token
        res.status(200).send({ session_token })
    } else {
        res.status(401).send('You are not logged in')
    }
}

const postAccessToken = async (req, res) => {
    const { client_user_id } = req.session
    try {
        const access_token = await humanApiService.getAccessToken(client_user_id);
        req.session.access_token = access_token
        res.status(200);
        res.send({ access_token });
    } catch (error) {
        if (error.response) {
            error.message = error.response.data.message
            error.status = error.response.data.statusCode
        }
        res.status(error.status || 500)
        res.send(error.message || 'There was a server error');
    }
}


module.exports = {
    postIdToken,
    postSessionToken,
    deleteSession,
    getSession,
    postAccessToken
}