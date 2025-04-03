import React, { useState, useEffect } from "react";
import './urlShortener.css';
import { db } from "../firebaseConfig/firebaseConfig";
import { ref, set, push, onValue, off } from 'firebase/database';

const URL_Shortener = () => {
    const [url, setURL] = useState("");
    const [shURL, setshURL] = useState('');
    const [linkTHere, setlinkTHere] = useState(false);
    const [clickCount, setClickCount] = useState(null);
    const [shortCodeForListener, setShortCodeForListener] = useState(null);
    const [llongURL, setllongURL] = useState('');

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
            const cleanText = text.replace(/^https?:\/\//, ""); // ✅ Remove http:// or https://
            console.log("Clean URL: ", cleanText);

            const data = encoder.encode(cleanText + Date.now() + Math.random());
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));

            let num = hashArray.slice(0, 8).reduce((acc, byte) => (acc * 256) + byte, 1);
            return { shortCode: encodeBase62(num), cleanText };
        }

        const putDataInFirebaseTest = async (shortURL, longURL) => {
            const dbRef = ref(db, "shortURLs/");
            const newRef = push(dbRef);
            await set(newRef, { name: shortURL, link: longURL, hits: 0 })
                .then(() => console.log("URL Added Successfully:", longURL))
                .catch((error) => console.log("Error Adding URL: ", error));
            return newRef.key; // Return Firebase key for tracking
        };

        let { shortCode, cleanText } = await hashAndEncodeBase62(url);
        
        setllongURL(cleanText); // ✅ Store cleaned URL correctly
        setshURL(shortCode);
        setlinkTHere(true);

        const firebaseKey = await putDataInFirebaseTest(shortCode, cleanText);
        setShortCodeForListener(firebaseKey); // Save Firebase key for tracking hits
    };

    const handleClickShortenURl = async () => {
        if (!shortCodeForListener) return;

        const hitsRef = ref(db, `shortURLs/${shortCodeForListener}/hits`);
        set(hitsRef, clickCount + 1).then(() => {
            window.open(`https://url-shortener-eosin-nu.vercel.app/${shURL}`, "_blank"); // ✅ Open long URL in new tab
        }).catch(error => {
            console.error("Error updating hits:", error);
        });
    };

    useEffect(() => {
        if (!shortCodeForListener) return;

        const hitsRef = ref(db, `shortURLs/${shortCodeForListener}/hits`);
        const listener = onValue(hitsRef, (snapshot) => {
            const count = snapshot.val();
            setClickCount(count !== null && count !== undefined ? count : 0);
        }, (error) => {
            console.error("Error listening to hit count:", error);
            setClickCount('Error');
        });

        return () => off(hitsRef, listener);
    }, [shortCodeForListener]);

    return (
        <div className="URL_Shortener_main_div">
            <p className="heading_URL_Shortener">Paste the URL to be shortened</p>
            <div className="URL_Shortener_text_box">
                <input 
                    className="URL_Shortener_input" 
                    placeholder="Enter link here" 
                    type="text" 
                    onChange={(e) => setURL(e.target.value)}
                />
                <button className="URL_Shortener_button" onClick={handleClick}>Shorten URL</button>
            </div>
            {linkTHere && (
                <>
                    <div className="shorten_link_div">
                        <a href={"https://url-shortener-eosin-nu.vercel.app/" + shURL} onClick={handleClickShortenURl}>
                            {"https://url-shortener-eosin-nu.vercel.app/" + shURL}
                        </a>
                        <div className="shorten_link_button" onClick={handleClickShortenURl}>Click here</div>
                    </div>
                    <p className="click_count">Clicks: {clickCount === null ? 'Loading...' : clickCount}</p>
                </>
            )}
            <p className="someTextInURL_Shortener">
                URL Shortener is a free tool to shorten URLs and generate short links <br />
                URL shortener allows to create a shortened link making it easy to share
            </p>
        </div>
    );
};

export default URL_Shortener;
