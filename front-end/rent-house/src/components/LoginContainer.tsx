import React, { Component } from "react";
import { Container, Col, Row/*, Card, Button*/ } from "react-bootstrap";
import "../scss/auth.scss"

//improt router
// import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

//import components
import Facebook from "./LoginFacebook";
import Google from "./LoginGoogle";
import LoginForm from './loginForm'
import SignupForm from './LoginSignupForm'
import LoginTitle from "./loginTitle";
import SignupTitle from "./LoginSignupTitle";
import Profile from "./loginProfilo";
import {IRootState} from "../redux/store"
import { connect } from "react-redux";

const mapStateToProps = (state: IRootState) => ({
    status: state.user.status,
});

interface IFormProps {
    status:string
}

interface IFormStates {
}

class LoginContainer extends Component<IFormProps, IFormStates>{
    // constructor(props: IFormProps) {
    //     super(props);
    // }

    render() {
        return (
            <Container>
                <Row className="mt-5 mb-5">
                    <Col className="mt-3 mb-2">

                        <Switch>
                            <Route path="/auth/login" component={LoginTitle} />
                            <Route path="/auth/signup" component={SignupTitle} />
                        </Switch>

                        <Row>
                            <Col className="mt-3"> <Facebook /></Col>
                        </Row>

                        <Row>
                            <Col className="mt-3">  <Google /> </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4 break"> <span className="brokenword">OR</span></Col>
                        </Row>
                        <Switch>
                            <Route path="/auth/login" exact={true} component={LoginForm} />
                            <Route path="/auth/signup" exact={true} component={SignupForm} />
                        </Switch>
                    </Col>
                    <Col className="loginBackground loginLogo">
                        {this.props.status === "User was found"?<Profile />: 
                        <h1 className="loginLgoo">BeeBee Rent</h1>}
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default connect(mapStateToProps)(LoginContainer);