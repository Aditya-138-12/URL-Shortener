import React, { useState } from "react";
import './urlShortener.css';

const URL_Shortener = () => {

    const [url, setURL] = useState("");

    const handleClick = () => {
        console.log(url);
    }

    return (
        <>
            <div className="URL_Shortener_main_div">
                <p className="heading_URL_Shortener">Paste the URL to be shortened</p>
                <div className="URL_Shortener_text_box">
                    <input type="text" onChange={(e)=>{setURL(e.target.value)}}></input>
                    <button onClick={handleClick}>Shorten URL</button>
                </div>
            </div>
        </>
    );
}

export default URL_Shortener;