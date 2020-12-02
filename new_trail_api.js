var Coordinates = require('./trail.js').Coordinates;
var Trail = require('./trail.js').Trail;
var TrailList = require('./trail.js').TrailList;
var https = require('https');
const fetch = require("node-fetch");

class Trail_API {
    constructor (latitude, longitude, distance = 100) {
        // User's latitude
        this.resolved = 0;
        this.latitude = latitude;
        // User's longitude
        this.longitude = longitude;
        // Distance away from user trails will be found
        this.distance = distance;
        // Maximum trails the api will return
        this.maxResults = 100;
        // Sarah's Trail Data API key
        this.keys = '200980056-37c2769698383bb98c9b48965aa68f84';
        // The full URL for the request
        this.url = `https://www.hikingproject.com/data/get-trails?lat=${this.latitude}&lon=${this.longitude}&maxDistance=${this.distance}&maxResults=${this.maxResults}&key=${this.keys}`;
    }

    makeTrailsList(trailData){
        // console.log(trailData);
        // console.log(typeof(trailData));
        let trails = trailData.trails;
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
        return new Promise((resolve, reject) => {
            https.get(this.url, res => {
                var data = '';
                
                res.on('data', chunk => {
                    data += chunk;
                });
    
                res.on('end', ()=> {
                    resolve(data);
                });         
            }).end();
        })
        // Returns a TrailList object
        
    }

    async getTrails(){
        return fetch(this.url)
        .then(res => res.json())
        .then((result)=>{
            this.makeTrailsList(result);
            var trailArray = [];
            // console.log(this.allTrails);
            for (var i = 0; i < this.allTrails.getLength; i++){
                trailArray.push(this.allTrails.getTrail(i));
            }
            return(trailArray);
        }).catch((err)=>{
            console.log(err);
        })
    }

}

// let latitude = 34.0522;
// let longitude = -118.2437;
// let api = new Trail_API(latitude, longitude);
// // console.log(api.url);
// api.getTrails().then(
//     (result) => {
//         console.log(result);
//     });


module.exports.Trail_API = Trail_API;
