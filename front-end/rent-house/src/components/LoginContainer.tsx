import React, { Component } from "react";
import { Container, Form, Alert, Col, Row,Card } from "react-bootstrap";
import Facebook from "./Facebook";
import Google from "./Google";
import LoginSubmmit from './LoginSubmit'
import RegisterSubmmit from './RegisterSubmit'
// import loginForm from './loginFormdemo'

interface IFormProps {
    msg: string
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

                        {(this.state.active === 'login') && <h2 className="mb-3 mt-3">Sign in with your email address</h2>}
                        {(this.state.active === 'register') && <h2 className="mb-3 mt-3">Sign up with your email Address</h2>}
                        <Form>
                            <Form.Group controlId="loginEmail">
                                <Form.Control type="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange.bind(this, 'email')} />
                            </Form.Group>

                            <Form.Group controlId="loginPassword">
                                <Form.Control type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange.bind(this, 'password')} />
                            </Form.Group>
                            {this.props.msg ?
                                <Alert color="danger">
                                    {this.props.msg}
                                </Alert> : ""
                            }
                            {(this.state.active === 'login') && <p>Don't have an Account?</p>}
                            {(this.state.active === 'login') && <p onClick={this.switchActive}>Join us</p>}
                            {(this.state.active === 'register') && <p>Alredy have Account?</p>}
                            {(this.state.active === 'register') && <p onClick={this.switchActive}>Sign in</p>}
                            {(this.state.active === 'login') && <LoginSubmmit email={this.state.email} password={this.state.password} />}
                            {(this.state.active === 'register') && <RegisterSubmmit email={this.state.email} password={this.state.password} />}
                        </Form>

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