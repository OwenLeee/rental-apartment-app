import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Facebook from "../components/Facebook";
import Google from "../components/Google";

interface IProps {

}

interface IStates {

}

class FormSide extends Component<IProps, IStates>{
    constructor(props: IProps) {
        super(props);
    }

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
    }

    render() {
        return (
            <Container>
                <div>
                    <h1>Sign in BeeBeeRent</h1>
                    <Facebook />
                    <Google />
                </div>

                < Form onSubmit={this.onSubmit}>
                    <h1> Sign in with your email Address</h1>
                    <Form.Group controlId="loginEmail">
                        <Form.Control type="email" placeholder="Email Address" />
                    </Form.Group>

                    <Form.Group controlId="loginPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <p>Don't have an Account?</p><p onClick={() => { console.log("hello") }}>join us</p>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container >)
    }
}

export default FormSide;