import React, { useEffect } from 'react';
import styles from "./Error.module.css";

const Error = () => {

    const apacheError = document.documentElement.textContent.includes("an error occurred");
    
    if(apacheError) {
        return (
            <div className={styles.apacheError}>
                Error
            </div>
        )
    } else {
        return <div data-no-error/>;
    }
    
}

export default Error;