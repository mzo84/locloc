import { thisExpression, throwStatement } from "@babel/types";
import Page from './Page';

class Tabs {
    constructor() {
        this.typeSheet = {
            't1': ['ae', 'ae-ar'],
            't2': ['sa', 'sa-ar'],
            't3': ['bh', 'bh-ar', 'eg', 'eg-ar', 'jo', 'jo-ar', 'kw', 'kw-ar', 'om', 'om-ar', 'qa', 'qa-ar'],
            'all': ['ae', 'ae-ar', 'sa', 'sa-ar', 'bh', 'bh-ar', 'eg', 'eg-ar', 'jo', 'jo-ar', 'kw', 'kw-ar', 'om', 'om-ar', 'qa', 'qa-ar'],
            'ae': ['ae'],
            'ae-ar': ['ae-ar'],
            'sa': ['sa'],
            'sa-ar': ['sa-ar'],
            'bh': ['bh'],
            'bh-ar': ['bh-ar'],
            'eg': ['eg'],
            'eg-ar': ['eg-ar'],
            'jo': ['jo'],
            'jo-ar': ['jo-ar'],
            'kw': ['kw'],
            'kw-ar': ['kw-ar'],
            'om': ['om'],
            'om-ar': ['om-ar'],
            'qa': ['qa'],
            'qa-ar': ['qa-ar'],
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
            "sea" : ["sg", "vt", "th", "my"],
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
            "sea" : ["sg", "vt", "th", "my"],
            "turkey": ["tr"],
            "us": ["us"],
        }
        this.maximumTabs = 4; // maximum number of tabs to open without requiring a confirm dialog.
        this.page = new Page();
        this.hostTyperegex = /(ic|webedit)/gi
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
                host = "http://" + host + ".apple.com/";
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
        for (var i = 0; i < geos.length; i++) {
            window.open(host + geos[i] + path);
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
        var geos = this.typeSheet[option];
        var selected = this.typeSheet[option];
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
        var isABranch = host.match(this.hostTyperegex);
        isABranch = (isABranch === null) ? false : true;

        if(isABranch) {
            sourceboxUrl += sourceboxRegion + "/branches/" + host + "/" + geo + "/";
        } else {
            sourceboxUrl += sourceboxRegion + "/trunk/" + geo + "/";
        }

        window.open(sourceboxUrl);
    }

}

export default Tabs;