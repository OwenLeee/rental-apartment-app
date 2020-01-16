import React from 'react';
import { connect } from 'react-redux';
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { loginFacebookThunk } from '../redux/auth/thunks';
import { GoogleLogin } from 'react-google-login';

import * as dotenv from 'dotenv';
dotenv.config();

const mapStateToProps = (state: IRootState) => ({
    msg: state.auth.msg
});

const mapDispatchToProps = (dispatch: ReduxThunkDispatch) => ({
    loginFacebook: (accessToken: string) => dispatch(loginFacebookThunk(accessToken))
})

interface IGoogleProps {
    loginFacebook: (accessToken: string) => void,
    msg: string | null
}

// interface GoogleResponse{
//     name:string
// }

const Google: React.FC<IGoogleProps> = props => {

    // const [name, setName] = useState;
    // const [email, setEmail] = useState;
    // const [url, setUrl] = useState

    const responseGoogle = (response: any) => {
        // setName(response.profileObj.name);
        // setEmail(response.profileObj.email);
        // setUrl(response.profileObj.imageUrl);
        console.log(response)
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_APP_ID || ''}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />)
}

export default connect(mapStateToProps, mapDispatchToProps)(Google)