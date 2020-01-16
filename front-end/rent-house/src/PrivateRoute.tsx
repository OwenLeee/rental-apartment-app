import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { IRootState } from "./redux/store";
import { connect } from 'react-redux';

interface IPrivateRouteProps extends RouteProps {
    isAuthenticated: boolean | null;
}

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }: IPrivateRouteProps) => {
    const Component = component;
    if (Component == null) {
        return null;
    }
    let render:(props:any)=>JSX.Element 
    if(isAuthenticated){
        render = (props:any)=>(
            <Component {...props} />
        )    
    }else{
        render = (props:any)=>(
            <Redirect to={ {
                pathname: '/login',
                state: { from: props.location }
            } } />
        )
    }
    return <Route {...rest} render={render}/>    
};

export const PrivateRoute = connect((state: IRootState) => ({
    isAuthenticated: state.auth.isAuthenticated
}))(PurePrivateRoute);