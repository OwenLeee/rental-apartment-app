// import React from "react";
// import { RouteProps, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { IRootState } from "./store";
// // import LoginPage from "../containers/Login";

// //input parameter {component, ...rest}
// const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
//     //Use the state from auth/state.ts by useSelector(callback: (state) => boolean || null)
//   const isAuthenticated = useSelector(
//     (state: IRootState) => state.auth.isAuthenticated
//   );
//   if (isAuthenticated === null) {
//     return null;
//   }
//   // const finalComponent = isAuthenticated ? component : LoginPage;
//   return <Route {...rest} component={finalComponent} />;
// };

// //export this Functional Component, <PrivateRoute />
// export default PrivateRoute;

export const jason = 'hi';