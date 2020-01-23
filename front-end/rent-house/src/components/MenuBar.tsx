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
import Logout from './logout';

import PhotosUpload from './PhotosUpload';
import VideoUpload from './VideoUpload';
import { PrivateRoute } from '../PrivateRoute';
// import Logout from './logout';
import Content from './Content';
import HomePage from './HomePage';
import { IRootState } from '../redux/store'
import { connect } from 'react-redux';


const mapStateToProps = (state: IRootState) => ({
    isAuth: state.auth.isAuthenticated
});

interface iPop {
    isAuth: boolean | null
}

class MenuBar extends React.Component<iPop, {}>{
    constructor(props: iPop) {
        super(props);
    }
    public render() {
        return (
            <ConnectedRouter history={history}>
                <Navbar bg="light" expand="lg">
                    <NavLink to='/' className='home-button'>BeeBeeRent</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            
                            <NavLink to='/rent' className='nav-buttons rent-button' activeClassName="activeNavButtons">Rent</NavLink>
                            <NavLink to='/post/details/1' className='nav-buttons post-button' activeClassName="activeNavButtons">Post</NavLink>
                           
                        </Nav>
                        <Nav className="ml-auto">
                        {this.props.isAuth != false ? <NavLink to='/auth/login' className='ml-auto login-button' activeClassName="activeNavButtons">Sign in</NavLink> : ""}
                        {this.props.isAuth == true ? <Logout /> : ""}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <Switch>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route exact={true} path="/rent" component={ApartmentList} />
                    <PrivateRoute path="/post/details/1" component={DetailsOne} />
                    <PrivateRoute path="/post/details/2" component={DetailsTwo} />
                    <PrivateRoute path="/post/details/3" component={DetailsThree} />
                    <Route path="/auth" component={loginContainer} />
                    <PrivateRoute path="/post/photos" component={PhotosUpload} />
                    <PrivateRoute path="/post/video" component={VideoUpload} />
                    <PrivateRoute path="/post/planner" component={PlannerStyle} />
                    <PrivateRoute exact={true} path="/rent/content/:id" component={Content} />
                    {/* <Route path="/profile" component={ProfilePage} /> */}
                    {/* <Route path="/login" component={} /> */}
                    <Route exact={true} path="/post">
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

export default connect(mapStateToProps)(MenuBar);