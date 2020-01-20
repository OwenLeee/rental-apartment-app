import React, { Component } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import "../scss/auth.scss"

//improt router
// import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

//import components
import Facebook from "./Facebook";
import Google from "./Google";
import LoginForm from './loginForm'
import SignupForm from './signupForm'

interface IFormProps {
}

interface IFormStates {
    active: string
}

class LoginContainer extends Component<IFormProps, IFormStates>{
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            active: 'login'
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="mt-3">
                        {(this.state.active === 'login') && <h1 className="mb-2 title">Login to BeeBeeRent</h1>}
                        {(this.state.active === 'register') && <h1 className="mb-3 title">Create a BeeBeeRent Acount</h1>}

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
                            <Route path="/auth/signup" component={SignupForm} />
                        </Switch>
                    </Col>
                    <Col>
                        <Card bg="primary" text="white" style={{ width: '18rem' }}>
                            <Card.Header>Header</Card.Header>
                            <Card.Body>
                                <Card.Title>Primary Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk
                                    of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container >
        )
    }
}

export default LoginContainer;