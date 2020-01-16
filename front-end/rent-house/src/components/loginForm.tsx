import React from 'react'
import { Button, Form, Alert } from "react-bootstrap";
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginThunk } from '../redux/auth/thunks';
import { Link, Switch, Route } from 'react-router-dom';

const mapStateToProps = (state: IRootState) => ({
    status: state.auth.status,
    msg: state.auth.msg //IAuthState.msg
});

const mapDispatchtoProps = (dispatch: ReduxThunkDispatch) => {
    return {
        login: (email: string, password: string) => dispatch(loginThunk(email, password)),
    }
}

interface ILoginFormState {
    email: string,
    password: string,
}

interface ILoginProps {
    login: (email: string, password: string) => void
    status: string | null
    msg: string | null
}

class LoginForm extends React.Component<ILoginProps, ILoginFormState>{
    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    private handleChange = (field: 'email' | 'password', event: React.FormEvent<HTMLInputElement>) => {
        // state:Partial<ILoginFormState>
        const state: any = {
            [field]: event.currentTarget.value
        };
        this.setState(state);
    }

    private login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    public render() {
        return (
            <Form onSubmit={this.login}>
                <h1>Sign in with your email Address</h1>
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
                {this.props.status == "failed"?
                    <Alert color="danger">
                        {this.props.msg}
                    </Alert> : ""
                }
                <p>Don't have an Account? <Link to="/auth/signup" className="link">Sign up</Link></p>
                <Button variant="primary" type="submit">
                    Sign in
                    </Button>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(LoginForm)
