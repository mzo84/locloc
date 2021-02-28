import React, { useState, useEffect } from "react";
import styles from "./DoubleEcho.module.css";

const DoubleEcho = () => {

    const doubleEchoRegex = /apple.com((\/[a-z]{1,2}-[a-z]{1,2}\/[a-z]{1,2}-[a-z]{1,2}\/)|(\/[a-z]{2}\/[a-z]{2}\/))/g;
    const [double, setDouble] = useState(false);

    useEffect(() => {
        setDouble(document.documentElement.textContent.match(doubleEchoRegex));
        console.log(double);
    }, [double]);

    const handleClick = (e) => {
        e.preventDefault();
        window.alert("You have double echos: search for -->/<!-- or /ae/ae/ for example.")
    }

    if (double !== null) {
        return (
            <div className={styles.double} onClick={(e) => handleClick(e)}>
                double
            </div>
        )
    } else {
        return null;
    }
}

export default DoubleEcho;