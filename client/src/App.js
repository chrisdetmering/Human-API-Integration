import React, { useEffect, useState, } from "react";
import axios from "axios";
import {
  Switch,
  Route,
  useHistory,
  Redirect
} from "react-router-dom";
import Clinical from "./Components/Clinical";
import Connect from "./Components/Connect";
import Login from "./Components/Login";
import Reports from "./Components/Reports";
import SignUp from "./Components/SignUp";

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();


  useEffect(() => {
    axios('/auth/session')
      .then(response => {
        if (response.status === 200) {
          setSessionToken(response.data.session_token)
        }
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const isLoggedToken = () => {
    return sessionToken.length > 0
  }

  const login = async (username, email) => {
    const config = {
      method: 'POST',
      url: '/auth/id/token',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({ client_user_id: username, client_user_email: email })
    }

    try {
      const response = await axios(config);
      if (response.status === 200) {
        setSessionToken(response.data.session_token)
        history.push('/connect')
      }
    } catch (error) {
      alert('You need to sign up first before you can login')
      console.error(error.message)
    }
  }

  const signUp = async (username, email) => {
    const config = {
      method: 'POST',
      url: '/auth/session/token',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify({ client_user_id: username, client_user_email: email })
    }

    try {
      const response = await axios(config);
      if (response.status === 200) {
        setSessionToken(response.data.session_token)
        history.push('/connect')
      }
    } catch (error) {
      alert('You already have an account :)')
      console.error(error.message)
    }
  }

  if (isLoading) {
    return <div></div>
  }

  return (
    <Switch>
      <Route exact path="/">
        <Login login={login} />
      </Route>
      <Route exact path="/signup">
        <SignUp signUp={signUp} />
      </Route>
      <Route path="/connect" render={() => {
        if (isLoggedToken()) {
          return <Connect sessionToken={sessionToken} />
        } else {
          return <Redirect to="/signup" />
        }
      }} />

      <Route path="/clinical" render={() => {
        if (isLoggedToken()) {
          return <Clinical />
        } else {
          return <Redirect to="/signup" />
        }
      }} />

      <Route path="/reports" render={() => {
        if (isLoggedToken()) {
          return <Reports />
        } else {
          return <Redirect to="/signup" />
        }
      }} />
    </Switch>
  );
}

export default App;
