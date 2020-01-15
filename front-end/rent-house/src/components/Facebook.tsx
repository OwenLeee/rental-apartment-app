import React from 'react'
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginFacebookThunk } from '../redux/auth/thunks';
import FacebookLogin from 'react-facebook-login';

import * as dotenv from 'dotenv';
dotenv.config();

const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg
});

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => ({
    loginFacebook: (accessToken: string) => dispatch(loginFacebookThunk(accessToken))
})

interface IFacebookProps {
    loginFacebook: (accessToken: string) => void,
    msg: string | null
}

//Functional Component
const Facebook: React.FC<IFacebookProps> = props => {

    function fBOnCLick() {
        return null;
    }

    function fBCallback(userInfo:any) {
        if (userInfo.accessToken) {
            props.loginFacebook(userInfo.accessToken);
        }
        return null;
    }

    return (
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
            autoLoad={true}
            fields="name,email,picture"
            onClick={fBOnCLick}
            cssClass="my-facebook-button-class"
            callback={fBCallback}
        />

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
