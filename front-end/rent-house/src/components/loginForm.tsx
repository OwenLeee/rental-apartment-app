import React from 'react'
import { Button, Form } from "react-bootstrap";

interface ILoginFormState {
    email:string,
    password:string
}

class loginForm extends React.Component<{},ILoginFormState>{
    constructor(props:{}){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    
    private handleEmailChange= (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({ email: event.target.value});
    }

    private handlePasswordChange= (event: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({ password: event.target.value});
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        alert("hello");
        event.preventDefault();
    }

    private redirectSignup = (event: React.MouseEvent) => {
        alert("redirect")
    }

    render() {
        return (
            < Form onSubmit={this.handleSubmit}>
                <h1> Sign in with your email Address</h1>
                <Form.Group controlId="loginEmail">
                    <Form.Control type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange} />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                </Form.Group>
                <p>Don't have an Account?</p><p onClick={this.redirectSignup}>join us</p>
                <Button variant="primary" type="submit">
                    Submit
                    </Button>
            </Form>
        )
    }
}

export default loginForm