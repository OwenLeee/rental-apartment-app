import React from 'react'
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginFacebookThunk } from '../redux/auth/thunks';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

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

    function fBCallback(userInfo:ReactFacebookLoginInfo & {accessToken:string}) {
        if (userInfo.accessToken) {
            props.loginFacebook(userInfo.accessToken);
        }
        return null;
    }

    return (
        <div >
        <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
            fields="name,email,picture"
            onClick={fBOnCLick}
            cssClass="btn facebook"
            callback={fBCallback}
        />
</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
