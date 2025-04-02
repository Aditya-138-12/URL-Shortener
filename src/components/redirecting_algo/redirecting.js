import {React, useEffect} from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

const Redirect = () => {

    const location = useLocation();
    const navigate = useNavigate();

    console.log(location.pathname.slice(1));
    
    useEffect(()=>{
        navigate('//youtube.com');
    }, []);

    return (
        <>
        Redirecting you!
        </>
    );
}

export default Redirect;