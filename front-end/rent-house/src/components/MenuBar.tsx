import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import ProcedureBar from '../components/ProcedureBar';
import Form from '../components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/MenuBar.scss'


import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/store';
import ApartmentList from './ApartmentListing';



class MenuBar extends React.Component {


    public render() {
        return (
            <ConnectedRouter history={history}>
                <Navbar bg="light" expand="lg">
                    <NavLink to='/home' className='home-button'>BeeBeeRent</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to='/rent' className='nav-buttons rent-button' activeClassName="activeNavButtons">Rent</NavLink>
                            <NavLink to='/post' className='nav-buttons post-button' activeClassName="activeNavButtons">Post</NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink to='/login' className='ml-auto login-button' activeClassName="activeNavButtons">Sign in</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    {/* <Route path="/home" component={} /> */}
                    <Route path="/rent" component={ApartmentList} />
                    <Route path="/post" component={ProcedureBar} />
                    {/* <Route path="/login" component={} /> */}
                </Switch>

            </ConnectedRouter>
        )
    }
}

export default MenuBar;