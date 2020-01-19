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