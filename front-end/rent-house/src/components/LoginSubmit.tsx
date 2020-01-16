import React from 'react'
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginThunk } from '../redux/auth/thunks';

//Mapping Store & Thunks to Props
const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg
});

const mapDispatchtoProps = (dispatch: ReduxThunkDispatch) => {
    return {
        login: (email: string, password: string) => dispatch(loginThunk(email, password)),
    }
}

//Interface
interface ILoginProps {
    login: (email: string, password: string) => void
    msg: string | null,
    email: string,
    password: string
}

//Functional Component
const LoginSubmmit: React.FC<ILoginProps> = props => {
    const { email, password } = props;

    function loginFunction() {
        if (email == "" && password == ""){
            return 
        }
        if (email && password) {
            props.login(email, password);
        }else {
            console.log("error")
        }
    }

    return (
        <Button variant="primary" type="submit" onClick={loginFunction}> Log In </Button>
        )
}

//export 
export default connect(mapStateToProps, mapDispatchtoProps)(LoginSubmmit)
