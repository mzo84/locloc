import React, { useState } from 'react';
import Tabs from '../Tabs';
import Page from '../Page';
import styles from './GeoSwitcher.module.css';

const GeoSwitcher = (props) => {
    const tabs = new Tabs();
    const page = new Page();

    const [pageInfo, setPageInfo] = useState({
        geo: page.getGeo(),
        host: tabs.getHost(),
        realHost: tabs.getRealHost(),
        path: tabs.getPath()
    });

    const sourcebox = () => {
        // use geo to determine sourcebox folder
        let sourceboxUrl = "https://sourcebox.apple.com/repos/applecom/";
        let sourceboxRegion = tabs.getRegionFromGeo(pageInfo.geo);
        var isTrunk = pageInfo.realHost.match(tabs.hostTyperegex);
        isTrunk = (isTrunk === null) ? false : true;
        if(isTrunk) {
            sourceboxUrl += sourceboxRegion + "/trunk/" + pageInfo.geo + "/";
        } else {
            sourceboxUrl += sourceboxRegion + "/branches/" + pageInfo.host + "/" + pageInfo.geo + "/";
        }
        window.open(sourceboxUrl);
    }

    const options = props.options.map((option) => {
        if(option.type === 'me') {
            let url = `//${pageInfo.realHost}.apple.com/${option.name}${pageInfo.path}`
            return <li key={option.name} className={styles.geo}><a href={url} target="_blank" rel="noopener noreferrer">{option.name}</a></li>;
        } else if(option.type === "external") {
            // if its an external geo then use the hosted url and not the local.
            let url = option.name === "ww" ? `//${pageInfo.host}.apple.com/${pageInfo.path}` : `//${pageInfo.host}.apple.com/${option.name}${pageInfo.path}`;
            return <li key={option.name} className={styles.external}><a href={url} target="_blank" rel="noopener noreferrer">{option.name}</a></li>;
        } else if(option.type === 'sb') {
            return <li key={option.name} onClick={sourcebox} className={styles.sourcebox}>{option.name}</li>;
        } else if(option.type === "host") {
            let url = `//${option.name}.apple.com/${pageInfo.geo}${pageInfo.path}`;
            return <li key={option.name} className={styles.host}><a href={url} target="_blank" rel="noopener noreferrer">{option.name}</a></li>;
        }

        return "";
    });

    return (
        <div className={styles.geoContainer}>
            <ul className={styles.container}>{options}</ul>
        </div>
    );

}




export default GeoSwitcher;