import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import { Banner } from "../Utils/UI/HumanAPIBanner";


const SignUp = ({ signUp }) => {
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const handleSignUp = () => {
        signUp(userName, email)
    }

    const isDisabled = () => {
        return userName.length === 0 || email.length === 0
    }

    return (<>
        <Banner />
        <Grid textAlign='center' style={{ height: '60vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Enter username and email
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            onChange={(_, { value }) => setUsername(value)}

                        />
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-mail address'
                            onChange={(_, { value }) => setEmail(value)}
                        />

                        <Button
                            disabled={isDisabled()}
                            color='blue'
                            fluid
                            size='large'
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <Link to="/">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </>)
}

export default SignUp;