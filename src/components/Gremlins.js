import React, { useEffect, useState } from "react";
import styles from "./Gremlins.module.css";

const Gremlins = () => {
    const [gremlin, setGremlin] = useState(false);
    useEffect(() => {
        setGremlin(document.documentElement.textContent.includes("<<") || document.documentElement.textContent.includes(">>") || document.documentElement.textContent.includes(".merge-"))
    }, [gremlin])

    const handleClick = (e) => {
        e.preventDefault();
        window.alert("You have gremlins on this page, search for: << or >> in the source or  > / < in the UI.");
    }

    if (gremlin) {
        return (
            <div className={styles.gremlins} onClick={(e) => handleClick(e)}>
                {gremlin && "gremlin"}
            </div>
        )
    } else {
        return null;
    }
}

export default Gremlins;