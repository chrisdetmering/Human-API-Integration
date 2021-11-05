import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import axios from 'axios';
import NavBar from "../Utils/UI/NavBar";
import { formatTimeline } from "../Utils/Helpers/helpers";
import { Button, Header, Icon, Segment, Dimmer, Image, Loader } from 'semantic-ui-react'


const Reports = () => {
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        axios(`/api/reports`)
            .then(response => {
                const timeline = formatTimeline(response.data.summary);
                setItems(timeline);
                setShow(true);
            })
            .catch(error => console.error(error))
    }, [])


    const renderSegment = () => {
        if (!show) {
            return (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='massive'>Syncing your health data to generate report.</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
            )




            // (<Segment placeholder>
            //     <Header icon>
            //         <Icon name='pdf file outline' />
            //         Click below to get a timeline overview of all your health data
            //     </Header>
            //     <Button primary onClick={getReports}>Get Health Summary</Button>
            // </Segment>)
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