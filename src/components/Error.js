import React, { useEffect, useState } from 'react';
import styles from "./Error.module.css";

const Error = () => {

    const [error, setError] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        window.alert(`There are SSI errors on this page.\n\nSearch for: "[an error occurred while processing this directive]"`)
    }

    useEffect(() => {
        setError(document.documentElement.textContent.includes("an error occurred"));
    }, [error])


    if (error) {
        return (
            <div className={styles.apacheError} onClick={(e) => handleClick(e)}>
                error
            </div>
        )
    } else {
        return null;
    }

}

export default Error;