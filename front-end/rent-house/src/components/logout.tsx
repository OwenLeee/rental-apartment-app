<<<<<<< HEAD
export const a ='b';
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
=======
import React, { useState } from 'react';
import { logoutThunk } from '../redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { Button } from 'react-bootstrap'

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const IsAuth = useSelector((state: IRootState) => state.auth.isAuthenticated);

    const logout = (event: React.MouseEvent) => {
        event.preventDefault();
        if (IsAuth == true) {
            dispatch(logoutThunk())
        }
    }

    return (
        <Button variant="primary" onClick={logout}>Logout</Button>
    )
}

export default Logout
>>>>>>> e98bb77c7d95ab00c9aa54ab1cbd74d92030d1d2
