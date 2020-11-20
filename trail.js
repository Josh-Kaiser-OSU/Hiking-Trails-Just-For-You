
//class for storing longitude and latitude as a set
class Coordinates{
	constructor(longitude, latitude){
		this.longitude = longitude;
		this.latitude = latitude;
	}
	get getLongitude(){
		return this.longitude;
	}
	get getLatitude(){
		return this.latitude;
	}
}

//class for storing trail data
class Trail{
	constructor(name, distanceAway, length, elevation, description, longitude, latitude, difficulty){
		this.name = name;
		this.distanceAway = distanceAway;
		this.length = length;
		this.elevation = elevation;
		this.description = description;
		this.location = new Coordinates(longitude, latitude);
		this.difficulty = difficulty;
	}
	get getName(){
		return this.name;
	}
	get getDistanceAway(){
		return this.distanceAway;
	}
	get getLength(){
		return this.length;
	}
	get getElevation(){
		return this.elevation;
	}
	get getDescription(){
		return this.description;
	}
	get getLocation(){
		return this.location;
	}
	get getDifficulty(){
		return this.difficulty;
	}
}

//class for the list of trails
class TrailList{
	constructor(){
		this.trails = [];
	}
	addTrail(newTrail){
			this.trails.push(newTrail);
	}
	getTrail(index){
		return this.trails[index];
	}
	deleteTrail(index){
		for(var i = index; i < trails.length-1; i++){
			this.trails[i] = this.trails[i+1];
		}
		this.trails.pop();
	}
	get getLength(){
		return this.trails.length;
	}
}

module.exports.Coordinates = Coordinates;
module.exports.Trail = Trail;
module.exports.TrailList = TrailList;