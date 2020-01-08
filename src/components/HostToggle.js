import React from 'react';
import Tabs from '../Tabs';
import Page from '../Page';
import styles from './HostToggle.module.css';

const HostToggle = () => {

    const tabs = new Tabs();
    const page = new Page();
    const host = tabs.getRealHost();
    const local = (host.match("local") !== null) ? true : false;

    var toggleUrl = "";

    if(local) {
        toggleUrl = `https://${tabs.getHost()}.apple.com/${page.getGeo()}${tabs.getPath()}`;
    } else {
        toggleUrl = `http://${tabs.getHost()}-local.apple.com/${page.getGeo()}${tabs.getPath()}`;
    }

    return (
            <span role="button" aria-label="toggle host" className={styles.hostToggle}><a href={toggleUrl} target="_blank" rel="noopener noreferrer"><span role="img">&#x262F;</span></a></span>
    );
}

export default HostToggle;