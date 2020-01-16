import React, { Component } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";

//improt router
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

//import components
import Facebook from "./Facebook";
import Google from "./Google";
import LoginForm from './loginForm'
import SignupForm from './signupForm'

interface IFormProps {
    msg: string
    previousBoardIds: Array<number>
}

interface IFormStates {
    email: string,
    password: string,
    active: string
}

class LoginContainer extends Component<IFormProps, IFormStates>{
    constructor(props: IFormProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            active: 'login'
        }
    }

    private handleChange = (field: 'email' | 'password', event: React.FormEvent<HTMLInputElement>) => {
        // state:Partial<ILoginFormState>
        const state: any = {
            [field]: event.currentTarget.value
        };
        this.setState(state);
    }

    private switchActive = () => {
        const active = this.state.active
        if (active === 'login') {
            const state: any = {
                active: 'register'
            }
            this.setState(state);
        } else {
            const state: any = {
                active: 'login'
            }
            this.setState(state);
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="mt-3">
                        {(this.state.active === 'login') && <h1 className="mb-3">Login to BeeBeeRent</h1>}
                        {(this.state.active === 'register') && <h1 className="mb-3">Create a BeeBeeRent Acount</h1>}

                        <Facebook />{"\n"}
                        <Google />
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