import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Utils/UI/NavBar";
import VitalsSelect from "../Utils/UI/VitalsSelect";
import Chart from "../Utils/UI/Chart";
import { formatDate } from "../Utils/Helpers/helpers";
import { Segment, Header, Icon } from "semantic-ui-react";


const ClinicalAPI = () => {
    const [isVitalSelected, setIsVitalSelected] = useState(false);
    const [yAxis, setYAxis] = useState('')
    const [points, setPoints] = useState([]);
    const [vitals, setVitals] = useState([]);

    useEffect(() => {
        getVitals()
    }, [])

    const getVitals = () => {
        axios(`/api/clinical`)
            .then(response => {
                setVitals(response.data)
            })
            .catch(error => {
                console.error(error)
                alert('There was an error getting vitals. Have you connected a resource?')
            })
    }


    const formatVitalsToDataPoints = (selectedVital) => {
        const points = []
        const filteredVitals = vitals.filter(vital => {
            return vital.results.some(v => v.name === selectedVital)
        })


        for (let i = filteredVitals.length - 1; i >= 0; i--) {
            const vital = filteredVitals[i]
            const date = formatDate(vital.dateTime)
            const values = vital.results.find(v => v.name === selectedVital).values[0]
            const value = values.value
            points.push({ x: date, y: value })

            if (i === 0) {
                setYAxis(values.unit)
            }
        }

        return points;
    }

    const handleVitalChange = (e, { value }) => {
        if (!isVitalSelected) {
            setIsVitalSelected(true)
        }
        const points = formatVitalsToDataPoints(value)
        setPoints(points)
    }

    const renderChart = () => {
        if (isVitalSelected) {
            return (
                <Chart
                    points={points}
                    yAxis={yAxis}
                />
            )
        } else {
            return (
                <Segment placeholder>
                    <Header icon>
                        <Icon name='hand point up outline' />
                        Please select a vital!
                    </Header>
                </Segment>

            )
        }
    }

    return (<>
        <NavBar />
        <VitalsSelect
            onChange={handleVitalChange}
            placeholder='Select your vital'
        />
        {renderChart()}
    </ >
    );
}

export default ClinicalAPI;