import axios from "axios";
import {
    NavLink,
    useHistory
} from "react-router-dom";
import { Button, Menu } from 'semantic-ui-react'


const NavBar = () => {
    const history = useHistory()

    const logout = () => {
        axios('/auth/session', { method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    history.push('/')
                }
            })
    }
    return (<>
        <Menu stackable>
            <Menu.Menu position='left'>
                <Menu.Item
                    name='connect'
                >
                    <NavLink to='/connect'>Connect</NavLink>
                </Menu.Item>

                <Menu.Item
                    name='clinical'
                >
                    <NavLink to='/clinical' activeClassName="active">Clinical</NavLink>
                </Menu.Item>
                <Menu.Item
                    name='reports'
                >
                    <NavLink to='/reports'>Reports</NavLink>
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>
                <Menu.Item
                    name='connect'

                >
                    <Button
                        onClick={logout}
                        primary>Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    </>)
}

export default NavBar;