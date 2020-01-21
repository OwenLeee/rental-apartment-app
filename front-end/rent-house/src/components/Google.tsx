import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginGoogleThunk } from '../redux/auth/thunks';
import { GoogleLogin } from 'react-google-login';

import * as dotenv from 'dotenv';
dotenv.config();

const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg
});

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => ({
    loginGoogle: (profileObj:{}) => dispatch(loginGoogleThunk(profileObj))
})

interface IGoogleProps {
    loginGoogle: (profileObj:{}) => void,
    msg: string | null
}

const Google: React.FC<IGoogleProps> = props => {
    
    // const [msg, setMsg] = useState;
    // const [name, setName] = useState;
    // const [email, setEmail] = useState;
    // const [url, setUrl] = useState

    const successResponse = (response: any) => {
        if (response){
            const profileObj = response.profileObj
            props.loginGoogle(profileObj);
        }else{
            failureResponse(Response)
        }
    };

    const failureResponse = (response: any) => {
       console.log(response)
      
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_APP_ID || ""}
            buttonText="Login"
            className="loginbtn google"
            onSuccess={successResponse}
            onFailure={failureResponse}
            cookiePolicy={'single_host_origin'}
        />)
}

export default connect(mapStateToProps, mapDispatchToProps)(Google)