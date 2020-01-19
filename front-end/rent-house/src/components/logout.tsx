import React, { useEffect, useState } from "react";
import { IRootState, ReduxThunkDispatch } from '../redux/store';
import { logoutThunk } from '../redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Logout: React.FC = () => {
    ///////////// Hooks Form /////////////
    ///////////// mapStateToProps /////////////
    const authMsg = useSelector((state: IRootState) => state.auth.msg);
    ///////////// mapDispatchToProps /////////////
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutThunk())
    }, [dispatch]);
    ///////////// DidMount or Update or WillUnMount /////////////

    ///////////// return /////////////
    return

}

export default Logout;