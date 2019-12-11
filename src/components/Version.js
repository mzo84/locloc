import React from 'react';
import './Version.css';

function Version(props) {

    function handleClick(e) {
        e.preventDefault();
        var path = e.target.title.replace("/","").replace(/\/built/g,'');
        // navigator.clipboard.writeText(path); - does not work in a chrome content script
        window.alert(path);
    }

    const versions = props.versions.map((version, index) =>
        <span
        className={version[1].search("mideast") !== -1 ? "Version Version--mideast" : "Version Version--global"} 
        key={index}
        title={version[1]}
        onClick={handleClick}>{version[0]}</span>
    );

    return (
        <div className="VersionContainer">{versions}</div>
    );
}

export default Version;