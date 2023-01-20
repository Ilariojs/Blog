import React from "react";
import { Route} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import StoreContext from "../../Services/Context";
import { useContext } from "react";


const RoutesPrivate = ({ children, redirectTo}) => {

    const { token } = useContext(StoreContext)
    return token ? children : <Navigate to={redirectTo}/>
}

export default RoutesPrivate