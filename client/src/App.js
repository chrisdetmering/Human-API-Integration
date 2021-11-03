import React, { useState, } from "react";
import axios from "axios";
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import ClinicalAPI from "./Components/ClinicalAPI";
import Connect from "./Components/Connect";
import Login from "./Components/Login";
import WellnessAPI from "./Components/WellnessAPI";

function App() {
  const [sessionToken, setSessionToken] = useState('');
  const history = useHistory();

  const login = async (username, email) => {
    const config = {
      method: 'POST',
      url: '/login',
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
      console.error(error)
    }
  }

  return (
    <Switch>
      <Route exact path="/">
        <Login login={login} />
      </Route>
      <Route path="/connect">
        <Connect sessionToken={sessionToken} />
      </Route>
      <Route path="/clinical">
        <ClinicalAPI />
      </Route>
      <Route path="/wellness">
        <WellnessAPI />
      </Route>
    </Switch>
  );
}

export default App;
