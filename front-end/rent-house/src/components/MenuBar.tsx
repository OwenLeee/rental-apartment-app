import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import '../scss/MenuBar.scss'
import ListApartment from '../components/ListApartment';


import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/store';



class MenuBar extends React.Component {


    public render() {
        return (
            <ConnectedRouter history={history}>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>BeeBeeRent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to='/rent' className='nav-buttons'>Rent</NavLink>
                            <NavLink to='/post' className='nav-buttons'>Post</NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink to='/login' className='ml-auto'>Sign in</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    {/* <Route path="/" component={} /> */}
                    {/* <Route path="/" component={} /> */}
                    {/* <Route path="/" component={} /> */}
                    <Route path="/post" component={ListApartment} />
                </Switch>

            </ConnectedRouter>
        )
    }
}

export default MenuBar;