class Page {
    constructor() {
        this.body = window.document.documentElement.innerHTML;
        this.url = window.location.href;
        this.host = window.location.host;
        this.georegex = /(?:[a-z]{2}\/|[a-z]{2}-[a-z]{2}\/)/i;
        this.versionregex = /(([a-z]){1,2})(?:\/built)/ig;
        this.sourcesregex = /(:?\/v\/|\/mideast\/)(.*)(:?\/built)/gi;
    }

    // "ae"
    getGeo = function() {
        return this.url.match(this.georegex) !== null ? this.url.match(this.georegex)[0].replace("/","") : "us";
    }

    getSources = function() {
        let allSources = this.body.match(this.sourcesregex);
        let uniqueSources = allSources.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });

        var versions = [];
        var version = "";
        for(var i = 0; i < uniqueSources.length; i++) {
            this.versionregex.lastIndex = 0; // need to reset internal pointer of regex.exec or it continues on from the index set at the first loop.
            version = this.versionregex.exec(uniqueSources[i])
            versions.push([version[1], uniqueSources[i]]); // first index refers to the matched group of regex.exec.
        }

        var sortedVersions = versions.sort((a,b) => {
            if(a[1] < b[1]) { return 1 }
            if(a[1] > b[1]) { return -1 }
            return 0;
        })

        return versions;
    }


}

export default Page;