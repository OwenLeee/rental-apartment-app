import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch } from 'react-router-dom';
import ProcedureBar from './DetailsOne';
import DetailsTwo from './DetailsTwo';
import DetailsThree from './DetailsThree';
// import Form from '../components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/MenuBar.scss'


import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/store';
import ApartmentList from './ApartmentListing';
import loginContainer from './LoginContainer';
import PlannerStyle from './PlannerStyle';
import DetailsOne from './DetailsOne';
// import PhotosUpload from './PhotosUpload';

<<<<<<< HEAD
// import PersonalProfile from "./PersonalProfile";
=======
>>>>>>> d8f7261c75b41a8f277889856ecc374acb3dc79e


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
                    <Route path="/details/1" component={DetailsOne} />
                    <Route path="/details/2" component={DetailsTwo} />
                    <Route path="/details/3" component={DetailsThree} />
                    <Route path="/planner" component={PlannerStyle} />
                    <Route path="/auth" component={loginContainer} />
                    {/* <Route path="/photos" component={PhotosUpload} /> */}
                    {/* <Route path="/profile" component={ProfilePage} /> */}
                    {/* <Route path="/login" component={} /> */}
                </Switch>



<<<<<<< HEAD
                {/* <div>
                    <PersonalProfile />
                </div> */}

=======
>>>>>>> d8f7261c75b41a8f277889856ecc374acb3dc79e
            </ConnectedRouter>
        )
    }
}

export default MenuBar;