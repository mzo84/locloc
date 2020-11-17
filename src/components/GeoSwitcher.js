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
        path: tabs.getPath(),
        pathname: window.location.pathname.replace(/\/[a-z]{2}-[a-z]{2}\/|\/[a-z]{2}\//i, ""),
        query: window.location.hash + window.location.search,
        origin: window.location.origin
    });

    const geoalt = () => {
        // use geo to determine sourcebox folder
        let sourceboxUrl = "https://sourcebox.apple.com/repos/applecom/";
        var isTrunk = pageInfo.realHost.match(tabs.hostTyperegex);
        let geoalt = getGeoAltPath();
        isTrunk = (isTrunk === null) ? false : true;
        if(isTrunk) {
            sourceboxUrl += `us/trunk/us/internal/geo-alt/${geoalt}`;
        } else {
            sourceboxUrl += `us/branches/${pageInfo.host}/us/internal/geo-alt/${geoalt}`;
        }
        window.open(sourceboxUrl);
    }

    const getGeoAltPath = () => {
        if(pageInfo.pathname.length > 0) {
            return pageInfo.pathname;
        } else {
            return "home";
        }
    }

    const getRegionFromGeo = (geo) => {
        let regions = {
            "alac" : [ "br", "cl", "co", "la", "lae", "mx"],
            "anz" : ["au", "nz"],
            "canada": ["ca"],
            "eu" : ["fr", "uk", "it", "es", "de", "nl"],
            "gc" : ["cn", "hk", "mo", "tw"],
            "india" : ["in"],
            "japan" : ["jp"],
            "korea" : ["kr"],
            "me" : ['ae', 'ae-ar', 'sa', 'sa-ar', 'bh', 'bh-ar', 'eg', 'eg-ar', 'jo', 'jo-ar', 'kw', 'kw-ar', 'om', 'om-ar', 'qa', 'qa-ar'],
            "russia" : ["ru"],
            "sea" : ["sg", "vn", "th", "my"],
            "turkey": ["tr"],
            "us": ["us"],
        }

        for(var i in regions) {
            if(typeof regions[i] !== "undefined") {
                for(var j = 0; j < regions[i].length; j++) {
                    if(regions[i][j] === geo) {
                        return i;
                    }
                }
            }
        }

    }

    const sourcebox = () => {
        // use geo to determine sourcebox folder
        var sourceboxUrl = "https://sourcebox.apple.com/repos/applecom/";
        var sourceboxRegion = getRegionFromGeo(pageInfo.geo);
        var isTrunk = pageInfo.host.match(tabs.hostTyperegex);
        isTrunk = (isTrunk === null) ? false : true;

        if(isTrunk) {
            sourceboxUrl += `${sourceboxRegion}/trunk/`;
        } else {
            sourceboxUrl += `${sourceboxRegion}/branches/${pageInfo.host}/`;
        }

        window.open(sourceboxUrl);
    }


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    const options = props.options.map((option) => {
        if(option.type === 'me') {
            let url = `${pageInfo.origin}/${option.name}/${pageInfo.pathname}${pageInfo.query}`
            return <li key={option.name} className={styles.geo}><a href={url} target="_blank" rel="noopener noreferrer">{option.name}</a></li>;
        } else if(option.type === "us") {
            let url = `${pageInfo.origin}/${pageInfo.pathname}${pageInfo.query}`
            return <li key={option.name} className={styles.external}><a href={url} target="_blank" rel="noopener noreferrer">{option.name}</a></li>;
        } else if(option.type === 'geo-alt') {
            return <li key={option.name} onClick={geoalt} className={styles.sourcebox}>{option.name}</li>;
        } else if(option.type === 'sb') {
            return <li key={option.name} onClick={sourcebox} className={styles.sourcebox}>{option.name}</li>;
        } else if(option.type === 'pool') {
            return <li key={option.name} className={styles.rand}><a onClick={(e) => openPool(option.type, e)} target="_blank" rel="noopener noreferrer">{option.name}</a></li>
        } else {
            return <li key={option.name} className={styles.geo}><a onClick={(e) => openTiers(option.type, e)} target="_blank" rel="noopener noreferrer">{option.name}</a></li>
        }
    });

    const openTiers = (tier, e) => {
        e.preventDefault();
        let tiers = [];
        if(tier == "no-tv") {
            tiers = ["kw", "kw-ar"];
        } else if(tier == "no-watch") {
            tiers = ["jo", "jo-ar"];
        } else if(tier == "english") {
            tiers = ["bh","eg","jo","kw","om","qa"];
        } else {
            tiers = ["bh-ar","eg-ar","jo-ar","kw-ar","om-ar","qa-ar"];
        }
        for(let i = 0; i < tiers.length; i++) {
            let url = `//${pageInfo.realHost}.apple.com/${tiers[i]}/${pageInfo.pathname}${pageInfo.query}`
            window.open(url);
        }
    }

    const openPool = (tier, e) => {
        e.preventDefault();

        const setA = shuffle(['sa', 'bh', 'eg', 'jo', 'kw', 'om', 'qa']);
        const setB = shuffle(['sa-ar', 'bh-ar', 'eg-ar', 'jo-ar', 'kw-ar', 'om-ar', 'qa-ar']);
        const tiers = [setA[0],setA[1],setA[2],setB[0],setB[1],setB[2]];

        for(let i = 0; i < tiers.length; i++) {
            let url = `${pageInfo.origin}/${tiers[i]}/${pageInfo.pathname}${pageInfo.query}`
            window.open(url);
        }
    }


    return (
        <div className={styles.geoContainer}>
            <ul className={styles.container}>{options}</ul>
        </div>
    );

}




export default GeoSwitcher;