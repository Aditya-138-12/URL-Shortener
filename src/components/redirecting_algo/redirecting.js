import {React, useEffect, useState} from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig/firebaseConfig";
import {ref, set, push, onValue} from 'firebase/database';

const Redirect = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState([]);

    //console.log(location.pathname.slice(1));

    let shortLink = location.pathname.slice(1)
    
    useEffect(()=>{
        const dbRef = ref(db, "shortURLs/");

        onValue(dbRef, (snapshot)=>{
            const dataArray = Object.values(snapshot.val());
            setData(dataArray);
            //console.log(Object.values(data));
            console.log(data);
        })

        for(let i = 0; i < 2; i++){
            console.log(data[i]);
        }

        //navigate('//youtube.com');
    }, []);

    useEffect(()=>{
        console.log(data);
        for(let i = 0; i < data.length; i++){
            if(data[i]['name'] == shortLink){
                console.log("The link matched.");
                navigate(`//${data[i]['link']}`)
                break;
            }else{
                console.log("The link does not matched.");
            }
            console.log(data[i]);
        }
    }, [data]);

    return (
        <>
        Redirecting you!
        </>
    );
}

export default Redirect;