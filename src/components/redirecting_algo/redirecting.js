import {React, useEffect} from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig/firebaseConfig";
import {ref, set, push, onValue} from 'firebase/database';

const Redirect = () => {

    const location = useLocation();
    const navigate = useNavigate();

    //console.log(location.pathname.slice(1));

    let shortLink = location.pathname.slice(1)
    
    useEffect(()=>{
        const dbRef = ref(db, "shortURLs/");

        onValue(dbRef, (snapshot)=>{
            const data = snapshot.val();
            console.log(Object.values(data));
        })

        //navigate('//youtube.com');
    }, []);

    return (
        <>
        Redirecting you!
        </>
    );
}

export default Redirect;