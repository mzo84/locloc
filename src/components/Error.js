import React, { useEffect, useState } from 'react';
import styles from "./Error.module.css";

const Error = () => {

    const [error, setError] = useState(false);
    const [none, setNone] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        window.alert(`There are SSI errors on this page.\n\nSearch for: "[an error occurred while processing this directive]" and "(none)"`)
    }

    useEffect(() => {
        setError(document.documentElement.textContent.includes("an error occurred"));
        setNone(document.documentElement.textContent.includes("(none)"))
    }, [error, none])


    if (error || none) {
        return (
            <div className={styles.apacheError} onClick={(e) => handleClick(e)}>
                {error && "ssi"} {none && "none"}
            </div>
        )
    } else {
        return null;
    }

}

export default Error;