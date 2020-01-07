import React from 'react';
import './Version.css';

function Version(props) {

    const versionsToCopy = getVersionStrings(props.versions);

    function getVersionStrings(versions) {
        const versionStrings = [];
        for(var i = 0; i < versions.length; i++) {
            versionStrings.push(versions[i][1].replace('/',''));
        }

        return versionStrings.toString().replace(/(,|\/built)/gi," ");
    }

    function handleClick(e) {
        e.preventDefault();
        window.prompt("Copy to clipboard: Cmd+C, Enter", versionsToCopy);
    }

    const versions = props.versions.map((version, index) =>
        <span
        className={version[1].search("mideast") !== -1 ? "Version Version--mideast" : "Version Version--global"} 
        key={index}
        title={version[1].replace(/(,|\/built)/gi,"")}
        onClick={handleClick}>{version[0]}</span>
    );

    const toggleFormButton = <span className="toggleForm" onClick={props.toggleForm} role="button" aria-label="opens geo tab opener"><span role="img" aria-label="Earth emoji">&#127757;</span></span>;

    return (
        <div className="VersionContainer">
            <div className="Versions">
                {versions}
            </div>
            {toggleFormButton}
        </div>
    );
}

export default Version;