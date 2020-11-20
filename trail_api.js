
var Coordinates = require('./trail.js').Coordinates;
var Trail = require('./trail.js').Trail;
var TrailList = require('./trail.js').TrailList;
var https = require('https');

class Trail_API {
    constructor (latitude, longitude, distance = 10) {
        // User's latitude
        this.latitude = latitude;
        // User's longitude
        this.longitude = longitude;
        // Distance away from user trails will be found
        this.distance = distance;
        // Josh's Trail Data API key
        //'200932678-b6a96c1d20b73dc70bee2145176ce8a7'
        this.keys = '200975933-0d4568298c034509b0d68a318458e7ef';
        // The full URL for the request
        this.url = `https://www.hikingproject.com/data/get-trails?lat=${this._latitude}&lon=${this._longitude}&maxDistance=${this._distance}&key=${this._key}`;
        this.searchTrails()
        .then(console.log("Trails received"))
        .catch(err => console.log(err));
    }

    makeTrailsList(trailData){
        var trails = trailData.trails;
        this.allTrails = new TrailList();
        for (var i = 0; i < trails.length; i++) {
            // Trails arguments (name, distanceAway, length, elevation, description, latitude, longitude, difficulty)
            var aTrail = new Trail(trails[i].name,
                0,
                trails[i].length,
                trails[i].height,
                trails[i].summary,
                trails[i].latitude,
                trails[i].longitude,
                trails[i].difficulty)
                this.allTrails.addTrail(aTrail);
        }
    }
    
    searchTrails(){
        // var success = 0;
        // while (success === 0){

        // }
        return new Promise((resolve, reject) => {
            https.get(this.url, res => {
                var data = '';
                
                res.on('data', chunk => {
                    data += chunk;
                });
    
                res.on('end', ()=> {
                    this.makeTrailsList(data);
                    resolve();
                });         
            }).end();
        })
        // Returns a TrailList object
        
    }

    getTrails(){
        var trailArray = [];
        for (var i = 0; i < this.allTrails.getLength; i++){
            trailArray.append(this.allTrails.getTrail(i));
        }
        return trailArray;
    }

}

module.exports.Trail_API = Trail_API;