import React, { useState } from "react";
import { Chrono } from "react-chrono";
import axios from 'axios';
import NavBar from "../Utils/UI/NavBar";
import { Button, Header, Icon, Segment } from 'semantic-ui-react'


const Reports = () => {
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])


    const getReports = () => {
        axios(`/api/reports`)
            .then(response => {
                console.log(response)
                const timeline = formatTimeline(response.data.summary);
                setItems(timeline);
                setShow(true);
            })
            .catch(error => console.error(error))
    }

    const formatTimeline = (reports) => {
        const timeline = reports.map(report => {
            const procedures = report[1].map(r => {
                return `-${r.objectType}`
            })
            return {
                title: report[0],
                cardTitle: ` ${report[0]} Summary`,
                cardSubtitle: `Total health data points created this year: ${report[1].length}`,
                cardDetailedText: procedures,
            }
        })

        return timeline
    }

    const renderSegment = () => {
        if (!show) {
            return (<Segment placeholder>
                <Header icon>
                    <Icon name='pdf file outline' />
                    Click below to get a timeline overview of all your health data
                </Header>
                <Button primary onClick={getReports}>Get Health Summary</Button>
            </Segment>)
        }
    }

    const renderTimelineReport = () => {
        if (items.length > 0) {
            return (
                <div style={{ width: "100%", height: "80vh" }}>
                    <Chrono
                        items={items}
                        slideShow
                        theme={{
                            primary: "cornflowerblue",
                            secondary: "cornflowerblue",
                            cardBgColor: "white",
                            cardForeColor: "black",
                            titleColor: "white"
                        }}
                        mode="VERTICAL_ALTERNATING" />
                </div>
            )
        }
    }

    return (
        <>
            <NavBar />
            {renderSegment()}
            {renderTimelineReport()}
        </>
    );
}

export default Reports;