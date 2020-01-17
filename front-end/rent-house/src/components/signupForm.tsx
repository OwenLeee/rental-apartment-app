import React from 'react'
import { Button, Form, Alert } from "react-bootstrap";
// import { link, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { signupThunk } from '../redux/auth/thunks';
import { Link } from 'react-router-dom';


const mapStateToProps = (state: IRootState) => ({
    status: state.auth.status,
    msg: state.auth.msg //IAuthState.msg
});

const mapDispatchtoProps = (dispatch: ReduxThunkDispatch) => {
    return {
        signup: (email: string, password: string) => dispatch(signupThunk(email, password)),
    }
}

interface ISignupFormState {
    email: string,
    password: string,
    validated: boolean
}

interface ISignupProps {
    signup: (email: string, password: string) => void
    status: string | null
    msg: string | null
}

class SignupForm extends React.Component<ISignupProps, ISignupFormState>{
    constructor(props: ISignupProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            validated: false
        }
    }

    private handleChange = (field: 'email' | 'password', event: React.FormEvent<HTMLInputElement>) => {
        const state: any = {
            [field]: event.currentTarget.value
        };
        this.setState(state);
    }

    // private signup = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //      else {
    //         return
    //     }
    // }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({ validated: true });
        const { email, password } = this.state;
        if (email && password) {
            console.log(email, password);
            this.props.signup(email, password);
        }
    };

    public render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <h1>Sign up with your email Address</h1>
                <Form.Group controlId="SignupEmail">
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleChange.bind(this, 'email')} />
                    <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="SignupPassword">
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this, 'password')} />
                    <Form.Control.Feedback type="invalid">Please provide a password involve at least 8 letter and one Capital Letter</Form.Control.Feedback>
                </Form.Group>
                <p>Alredy have Account? <Link to="/auth/login" className="link">Sign In</Link></p>
                <Button variant="primary" type="submit">
                    Sign up
                    </Button>
                {this.props.status === "failed" ? <Alert color="danger">{this.props.msg}</Alert> : ""}
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SignupForm)
