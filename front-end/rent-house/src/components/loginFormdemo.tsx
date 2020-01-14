import React from 'react'
import { Button, Form, Alert } from "react-bootstrap";
// import { link, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginThunk } from '../redux/auth/thunks';


interface ILoginFormState {
    email: string,
    password: string,
}

interface ILoginProps {
    loginThunk: (email: string, password: string) => void
    msg: string | null
    // switchPage: string
    // switchPage: (component: string) => void
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

    private login = () => {
        const { email, password } = this.state;
        if (email && password) {
            this.props.loginThunk(email, password);
        }
    }

    public render() {
        return (
            <Form>
                <h1> Sign in with your email Address</h1>
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
                {/* <p>Don't have an Account?</p><link >join us</p> */}
                <Button variant="primary" type="submit" onClick={this.login}>
                    Submit
                    </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg //IAuthState.msg
    // switchPage: state.auth.swithPage
});

const mapDispatchtoProps = (dispatch: ReduxThunkDispatch) => {
    return {
        login: (email: string, password: string) => dispatch(loginThunk(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(LoginForm)
