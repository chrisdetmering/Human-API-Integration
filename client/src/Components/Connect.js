import { useEffect, useState } from 'react'
import * as HumanConnect from "humanapi-connect-client";
import NavBar from './NavBar';
import {
    Button,
    Container,
    Header,
    Icon,
} from 'semantic-ui-react'
import axios from 'axios';
import ConnectModal from './Modal';


const Connect = ({ sessionToken }) => {
    const [open, setOpen] = useState(false)
    const [summary, setSummary] = useState({})

    useEffect(() => {
        HumanConnect.on("close", (response) => {
            console.log(response)
            setSummary(response)
            setOpen(true)
        });
        HumanConnect.on("connect", () => { console.log('connected') });
        HumanConnect.on("disconnect", (response) => { console.log("Source disconnected", response) });
    }, [])

    useEffect(() => {
        var event = document.createEvent('Event');
        event.initEvent('load', true, true);
        window.dispatchEvent(event)
    }, [])

    useEffect(() => {
        axios('/api/access/token')
            .then(response => response)
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <NavBar />
            <Container
                text
            >
                <Header
                    as='h1'
                    content='You have to connect one Health or Wellness source.'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '3em',
                        textAlign: 'center',
                        color: 'black'
                    }}
                />
                <Header
                    as='h2'
                    content='This has to be done before you query your data. 
                    If you have already done this, then process to the Clinical page'
                    inverted
                    style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                        textAlign: 'center',
                        color: 'black'
                    }}
                />
                <p className="has-text-centered hapi__token-container">
                    <span style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Button
                            primary
                            size='huge'
                            className="square"
                            data-hapi-token={sessionToken}>
                            Get Started
                            <Icon name='right arrow' />
                        </Button>
                        <ConnectModal
                            open={open}
                            setOpen={setOpen}
                            summary={summary}
                        />
                    </span>
                </p>
            </Container>
        </div>
    );
}

export default Connect;
