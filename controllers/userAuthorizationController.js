const humanApiService = require('../services/humanApiService')
const usersService = require('../services/usersService')

const postIdToken = async (req, res) => {
    const { client_user_id } = req.body

    try {
        const token = await humanApiService.getIdToken(client_user_id)
        const access_token = await humanApiService.getAccessToken(client_user_id)

        req.session.session_token = token
        req.session.client_user_id = client_user_id
        req.session.access_token = access_token

        res.status(200);
        res.send({ session_token: token });
    } catch (error) {
        res.status(error.response.data.statusCode)
            .send({ errorMessage: error.response.data.message });
    }
}

const postSessionToken = async (req, res) => {
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
}

const deleteSession = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send({ errorMessage: error.message })
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
        res.status(401).send({ message: 'You are not logged in' })
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
        console.log(error)
        res.status(500)
        res.send(error);
    }
}


module.exports = {
    postIdToken,
    postSessionToken,
    deleteSession,
    getSession,
    postAccessToken
}