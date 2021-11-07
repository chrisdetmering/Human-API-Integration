const humanApiService = require('../services/humanApiService')

const getClinical = async (req, res) => {
    const token = req.session.access_token

    try {
        const response = await humanApiService.getVitals(token)
        res.status(200);
        res.send(response.data);
    } catch (error) {
        if (error.response) {
            error.message = error.response.data.message
            error.status = error.response.data.statusCode
        }
        res.status(error.status || 500)
        res.send(error.message || 'There was a server error');
    }
}

const getReports = async (req, res) => {
    const token = req.session.access_token

    try {
        const response = await humanApiService.getAllReports(token)
        const reports = response.data;
        const summary = await humanApiService.getReportsSummaryBy('timeline', reports, token)

        res.status(200)
            .send({ summary });
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
    getClinical,
    getReports
}