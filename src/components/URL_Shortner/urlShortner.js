import React, { useState } from "react";
import './urlShortener.css';
import { db } from "../firebaseConfig/firebaseConfig";
import {ref, set, push} from 'firebase/database';

const URL_Shortener = () => {

    const [url, setURL] = useState("");
    const [shURL, setshURL] = useState('');
    const [linkTHere, setlinkTHere] = useState(false);

    const handleClick = async () => {

        const BASE62_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        function encodeBase62(num) {
            let encoded = "";
            while (num > 0) {
                encoded = BASE62_CHARS[num % 62] + encoded;
                num = Math.floor(num / 62);
            }
            return encoded || "0"; // Default to '0' for num=0
        }

        async function hashAndEncodeBase62(text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text + Date.now() + Math.random()); // This mostly solves the problem, but if 2 people still press the button at the same time, for which we can do Math.random()
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
        
            // Convert hash to a large positive number (use more bytes)
            let num = hashArray.slice(0, 8).reduce((acc, byte) => (acc * 256) + byte, 1); // Start from 1 to avoid 0
            
            return encodeBase62(num);
        }

        const putDataInFirebaseTest = async (data) => {
            const dbRef = ref(db, "shortURLs/");
            const newRef = push(dbRef);
            await set(newRef, data)
                .then(()=>{console.log("URL Added Sucessfully.")})
                .catch((error)=>console.log("Error Adding URL: ", error))
        };

        let shortURL = await hashAndEncodeBase62(url);
        setshURL(shortURL);
        setlinkTHere(true);
        putDataInFirebaseTest({name: shortURL, link: url, hits: 0});
        
    }

    return (
        <>
            <div className="URL_Shortener_main_div">
                <p className="heading_URL_Shortener">Paste the URL to be shortened</p>
                <div className="URL_Shortener_text_box">
                    <input className="URL_Shortener_input" placeholder="Enter link here" type="text" onChange={(e)=>{setURL(e.target.value)}}></input>
                    <button className="URL_Shortener_button" onClick={handleClick}>Shorten URL</button>
                </div>
                {linkTHere && <div className="shorten_link_div">
                    <a href={"https://url-shortener-eosin-nu.vercel.app/"+shURL} target="_blank">{"https://url-shortener-eosin-nu.vercel.app/"+shURL}</a>
                </div>}
                <p className="someTextInURL_Shortener">URL Shortener is a free tool to shorten URLs and generate short links <br/>URL shortener allows to create a shortened link making it easy to share</p>
            </div>
        </>
    );
}

export default URL_Shortener;