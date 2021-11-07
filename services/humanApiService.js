const axios = require('axios');

const getAccessToken = async (client_user_id) => {

    const data = {
        client_id: process.env.CLIENT_ID,
        client_user_id: client_user_id,
        client_secret: process.env.CLIENT_SECRET,
        type: "access"
    }

    const config = {
        method: 'POST',
        url: process.env.TOKEN_AUTH_ENDPOINT,
        data
    }

    const response = await axios(config);
    const { access_token } = response.data
    return access_token
}

const getIdToken = async (client_user_id) => {
    const data = {
        client_id: process.env.CLIENT_ID,
        client_user_id: client_user_id,
        client_secret: process.env.CLIENT_SECRET,
        type: "id"
    }

    const config = {
        method: 'POST',
        url: process.env.TOKEN_AUTH_ENDPOINT,
        data
    }

    const response = await axios(config);
    const { id_token } = response.data;
    return id_token
}

const getSessionToken = async (client_user_id, client_user_email) => {
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

    const response = await axios(config);
    return response.data.session_token;
}


const getVitals = async (token) => {
    const config = {
        method: 'GET',
        url: 'https://api.humanapi.co/v1/human/medical/vitals',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios(config);
    return response
}

const getAllReports = async (token) => {
    const config = {
        method: 'GET',
        url: 'https://api.humanapi.co/v1/human/medical/reports',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios(config);
    return response;
}

const getReportsSummaryBy = async (reportType, reports, token) => {
    const reportId = reports.filter(report => report.name === reportType)[0].id

    const con = {
        method: 'GET',
        url: `https://api.humanapi.co/v1/human/medical/reports/${reportId}/raw?format=json`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const result = await axios(con);
    const summary = Object.entries(result.data);
    return summary;
}


module.exports = {
    getVitals,
    getAccessToken,
    getIdToken,
    getAllReports,
    getReportsSummaryBy,
    getSessionToken
}