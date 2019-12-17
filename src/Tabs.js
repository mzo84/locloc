import Page from './Page';

class Tabs {
    constructor() {
        this.typeSheet = {
            't1': ['ae', 'ae-ar'],
            't2': ['sa', 'sa-ar'],
            't3': ['bh', 'bh-ar', 'eg', 'eg-ar', 'jo', 'jo-ar', 'kw', 'kw-ar', 'om', 'om-ar', 'qa', 'qa-ar'],
            'all': ['ae', 'ae-ar', 'sa', 'sa-ar', 'bh', 'bh-ar', 'eg', 'eg-ar', 'jo', 'jo-ar', 'kw', 'kw-ar', 'om', 'om-ar', 'qa', 'qa-ar'],
            'english': ['ae', 'sa', 'bh', 'eg', 'jo', 'kw', 'om', 'qa'],
            'arabic': ['ae-ar', 'sa-ar', 'bh-ar', 'eg-ar', 'jo-ar', 'kw-ar', 'om-ar', 'qa-ar'],
            'ae' : ['ae'],
            'ae-ar' : ['ae-ar'],
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
            'other-geos': ['ru', 'sg', 'tr', 'kr', 'in'],
        };
        this.regions = {
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
        this.maximumTabs = 4; // maximum number of tabs to open without requiring a confirm dialog.
        this.page = new Page();
        this.hostTyperegex = /(www|ictrunk)/gi;
        this.georegex = /(?:[a-z]{2}\/|[a-z]{2}-[a-z]{2}\/)/i;
    }

    // www, icxx, www-stage-view
    getHost = function () {
        var host = window.location.host.split(".")[0].replace("-local", "");
        return host;
    }

    // "/iphone-11/specs/"
    getPath = function () {
        return window.location.pathname.replace(this.georegex, '');
    }

    openTabs = function (geos, host, path, environments) {
        var totalTabs = environments.length * geos.length;
        if (totalTabs > this.maximumTabs) {
            // make sure not to accidentally open too many windows.
            if (window.confirm("You are opening " + totalTabs + " tabs. Are you sure?")) {
                this.loopEnvironments(geos, host, path, environments);
            }
        } else {
            this.loopEnvironments(geos, host, path, environments);
        }
    }

    loopEnvironments = function (geos, host, path, environments) {
        for (var i = 0; i < environments.length; i++) {
            if (environments[i] === "local") {
                host = "http://" + host + "-local.apple.com/";
            } else if (environments[i] === "stage") {
                host = "https://www-stage-view.apple.com/";
            } else if (environments[i] === "live") {
                host = "https://www.apple.com/";
            } else {
                // toggle between local and server
                host = "https://" + host + ".apple.com/";
            }
            this.loopGeos(host, geos, path);
        }
    }

    loopGeos = function (host, geos, path) {
        var url = "";
        for (var i = 0; i < geos.length; i++) {
            url = (geos[i] === "us") ? (host + path) : (host + geos[i] + path);
            window.open(url);
        }
    }


    getEnvironments(env) {
        let selected = [];
        if (env.local) { selected.push("local") }
        if (env.server) { selected.push("server") }
        if (env.stage) { selected.push("stage") }
        if (env.live) { selected.push("live") }

        return selected;
    }

    delegate(option, environments) {
        var host = this.getHost();
        var path = this.getPath();
        var selectedEnvironments = this.getEnvironments(environments);
        var selected = this.typeSheet[option] || [option];
        if (selected.length >= 1) {
            this.openTabs(selected, host, path, selectedEnvironments);
        } else {
            alert("The option " + selected + " is not supported.");
        }
    }

    getRegionFromGeo = function(geo) {
        var regions = this.regions;
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

    sourcebox = function() {
        // use geo to determine sourcebox folder
        var sourceboxUrl = "https://sourcebox.apple.com/repos/applecom/";
        var geo = this.page.getGeo();
        var sourceboxRegion = this.getRegionFromGeo(geo);
        var host = this.getHost();
        host = host.replace("-local","");
        var isTrunk = host.match(this.hostTyperegex);
        isTrunk = (isTrunk === null) ? false : true;

        if(isTrunk) {
            sourceboxUrl += sourceboxRegion + "/trunk/" + geo + "/";
        } else {
            sourceboxUrl += sourceboxRegion + "/branches/" + host + "/" + geo + "/";
        }

        window.open(sourceboxUrl);
    }

}

export default Tabs;