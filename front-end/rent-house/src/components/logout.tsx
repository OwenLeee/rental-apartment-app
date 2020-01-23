// import React, { useEffect, useState } from "react";
// import { IRootState, ReduxThunkDispatch } from '../redux/store';
// import { logoutThunk } from '../redux/auth/thunks';
// import { useDispatch, useSelector } from 'react-redux';

// const Logout: React.FC = () => {
//     ///////////// Hooks Form /////////////
//     ///////////// mapStateToProps /////////////
//     const authMsg = useSelector((state: IRootState) => state.auth.msg);
//     ///////////// mapDispatchToProps /////////////
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(logoutThunk())
//     }, [dispatch]);
//     ///////////// DidMount or Update or WillUnMount /////////////

//     ///////////// return /////////////
//     return

// }

// export default Logout;

import React /*, { useState }*/ from 'react';
import { logoutThunk } from '../redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { NavLink } from 'react-router-dom';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const IsAuth = useSelector((state: IRootState) => state.auth.isAuthenticated);

    const logout = (event: React.MouseEvent) => {
        event.preventDefault();
        // eslint-disable-next-line 
        if (IsAuth == true) {
            dispatch(logoutThunk())
        }
    }

    return (
        <NavLink to='/auth/login' className='ml-auto login-button'>
            <div onClick={logout}>Logout</div>
        </NavLink>
    )
}

export default Logout

