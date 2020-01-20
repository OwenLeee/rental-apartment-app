import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import DetailsOne from './DetailsOne';
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

<<<<<<< HEAD
=======
import PhotosUpload from './PhotosUpload';
import { PrivateRoute } from '../PrivateRoute';
import Logout from './logout';
>>>>>>> 690191ce1bc3a73b1794fb4ce3b4ab7425469a93

// import PersonalProfile from "./PersonalProfile";


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
                            <NavLink to='/post/details/1' className='nav-buttons post-button' activeClassName="activeNavButtons">Post</NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <NavLink to='/auth/login' className='ml-auto login-button' activeClassName="activeNavButtons">Sign in</NavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <Logout />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    {/* <Route path="/home" component={} /> */}
                    <Route path="/rent" component={ApartmentList} />
<<<<<<< HEAD
                    <Route path="/post" component={ProcedureBar} />
                    <Route path="/form1" component={PartOneForm} />
                    <Route path="/form2" component={PartTwoForm} />
                    <Route path="/planner" component={PlannerStyle} />
                    <Route path="/auth" component={loginContainer} />
                    {/* <Route path="/photos" component={PhotosUpload} /> */}
                  
=======
                    <PrivateRoute path="/post/details/1" component={DetailsOne} />
                    <PrivateRoute path="/post/details/2" component={DetailsTwo} />
                    <PrivateRoute path="/post/details/3" component={DetailsThree} />
                    <Route path="/auth/login" component={loginContainer} />
                    <Route path="/post/photos" component={PhotosUpload} />
                    <Route path="/post/video" component={PhotosUpload} />
                    <Route path="/post/planner" component={PlannerStyle} />
                    {/* <Route path="/profile" component={ProfilePage} /> */}
>>>>>>> 690191ce1bc3a73b1794fb4ce3b4ab7425469a93
                    {/* <Route path="/login" component={} /> */}
                    <Route exact path="/post">
                        <Redirect to="/post/details/1"></Redirect>
                    </Route>
                </Switch>



                {/* <div>
                    <PersonalProfile />
                </div> */}

            </ConnectedRouter>
        )
    }
}

export default MenuBar;