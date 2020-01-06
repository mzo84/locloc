import React from 'react';
import Tabs from '../Tabs';
import Page from '../Page';
import styles from './GeoSwitcher.module.css';

const GeoSwitcher = (props) => {
    const tabs = new Tabs();
    const page = new Page();
    const options = props.options.map((option) => {
        // if its an external geo, always use the hosted url and not the local.
        if(option.type === 'me') {
            var url = `//${tabs.getRealHost()}.apple.com/${option.name}${tabs.getPath()}`
            return <li key={option} className={styles.geo}><a href={url} target="_blank">{option.name}</a></li>;
        } else if(option.type === "external") {
            var url = option.name === "ww" ? `//${tabs.getHost()}.apple.com/${tabs.getPath()}` : `//${tabs.getHost()}.apple.com/${option.name}${tabs.getPath()}`;
            return <li key={option.name} className={styles.external}><a href={url} target="_blank">{option.name}</a></li>;
        } else if(option.type === 'sb') {
            return <li key={option.name} onClick={sourcebox} className={styles.sourcebox}>{option.name}</li>;
        } else if(option.type === "host") {
            var geo = page.getGeo();
            var url = `//${option.name}.apple.com/${geo}/${tabs.getPath()}`;
            return <li key={option.name} className={styles.host}><a href={url} target="_blank">{option.name}</a></li>;
        }
    });

    return (
        <div className={styles.geoContainer}>
            <ul className={styles.container}>{options}</ul>
        </div>
    );

}


const sourcebox = () => {
    // use geo to determine sourcebox folder
    const page = new Page();
    const tabs = new Tabs();
    var sourceboxUrl = "https://sourcebox.apple.com/repos/applecom/";
    var geo = page.getGeo();
    var sourceboxRegion = tabs.getRegionFromGeo(geo);
    var host = tabs.getHost();
    host = host.replace("-local","");
    var isTrunk = host.match(tabs.hostTyperegex);
    isTrunk = (isTrunk === null) ? false : true;

    if(isTrunk) {
        sourceboxUrl += sourceboxRegion + "/trunk/" + geo + "/";
    } else {
        sourceboxUrl += sourceboxRegion + "/branches/" + host + "/" + geo + "/";
    }

    window.open(sourceboxUrl);
}

export default GeoSwitcher;