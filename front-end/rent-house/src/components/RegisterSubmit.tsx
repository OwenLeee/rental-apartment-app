import React from 'react'
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { RegisterThunk } from '../redux/auth/thunks';

//Mapping Store & Thunk to Props
const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg
});

const mapDispatchtoProps = (dispatch: ReduxThunkDispatch) => {
    return {
        register: (email: string, password: string) => dispatch(RegisterThunk(email, password)),
    }
}

//interface
interface IRegisterProps {
    register: (email: string, password: string) => void
    msg: string | null,
    email: string,
    password: string
}

// Functional Component
const RegisterSubmmit: React.FC<IRegisterProps> = props => {
    const { email, password } = props;

    function registerFunction() {
        if (email && password) {
            props.register(email, password);
        }
    }

    return (
        <Button variant="primary" type="submit" onClick={registerFunction}> Sign Up </Button>
        )
}

//export 
export default connect(mapStateToProps, mapDispatchtoProps)(RegisterSubmmit)
