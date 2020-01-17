import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import ProcedureBar from '../components/ProcedureBar';
import PartOneForm from '../components/PartOneForm';
import PartTwoForm from '../components/PartTwoForm';
// import Form from '../components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/MenuBar.scss'


import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/store';
import ApartmentList from './ApartmentListing';
import loginContainer from './LoginContainer';
import { Planner } from '../planner/renderer';
import PhotosUpload from './PhotosUpload';

import PersonalProfile from "./PersonalProfile";


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
                            <NavLink to='/auth' className='ml-auto login-button' activeClassName="activeNavButtons">Sign in</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    {/* <Route path="/home" component={} /> */}
                    <Route path="/rent" component={ApartmentList} />
                    <Route path="/post" component={ProcedureBar} />
                    <Route path="/form1" component={PartOneForm} />
                    <Route path="/form2" component={PartTwoForm} />
                    <Route path="/planner" component={Planner} />
                    <Route path="/auth" component={loginContainer} />
                    <Route path="/photos" component={PhotosUpload} />
                    {/* <Route path="/profile" component={ProfilePage} /> */}
                    {/* <Route path="/login" component={} /> */}
                </Switch>



                <div>
                    <PersonalProfile />
                </div>
                
            </ConnectedRouter>
        )
    }
}

export default MenuBar;