import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { JSCharting } from "jscharting-react";
import { Select } from "semantic-ui-react";


const ClinicalAPI = () => {
    const [points, setPoints] = useState([]);
    const [vital, setVital] = useState('');

    const formatVitalsToDataPoints = (vitals, selectedVital) => {
        const points = vitals.filter(vital => {
            return vital.results.some(v => v.name === selectedVital)
        }).map(vital => {
            const date = vital.createdAt
            const value = vital.results.find(v => v.name === selectedVital).values[0].value
            return { x: date, y: value }
        })
        return points;
    }

    const getVitals = (selectedVital) => {
        axios(`/api/clinical`, { withCredentials: true })
            .then(response => {
                const points = formatVitalsToDataPoints(response.data, selectedVital)
                setPoints(points)
            })
    }

    const handleVitalChange = (e, { value }) => {
        setVital(value)
        getVitals(value)
    }


    const vitalsOptions = [
        { key: 'Heart rate', value: 'Heart rate', text: 'Heart Rate' },
        { key: 'Systolic blood pressure', value: 'Systolic blood pressure', text: 'Systolic Blood Pressure' },
        { key: 'Diastolic blood pressure', value: 'Diastolic blood pressure', text: 'Diastolic Blood Pressure' },
        { key: 'Body mass index (BMI) [Ratio]', value: 'Body mass index (BMI) [Ratio]', text: 'BMI' },
    ]

    const config = {
        type: 'line',
        series: [
            {
                points: points
            }
        ]
    };

    const divStyle = {
        maxWidth: '700px',
        height: '400px',
        margin: '0px auto'
    };


    return (
        <div>
            <NavBar />
            <Select
                onChange={handleVitalChange}
                placeholder='Select your vital'
                options={vitalsOptions}
            />

            <div style={divStyle}><JSCharting options={config} /></div>
        </div>
    );
}

export default ClinicalAPI;