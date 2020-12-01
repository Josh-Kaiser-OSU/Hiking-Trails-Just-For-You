var Trail = require('./trail.js').Trail;

//implements the For You feature
class ForYouFilter{
	constructor(userProfile, allTrailsList)
	{
		if(userProfile && typeof(userProfile.userRec) != "undefined"){
			this.userRating = userProfile.userRec
		}
		else
		{
			this.userRating = 3;
		}
		this.allTrailsList = allTrailsList;
		this.filteredTrails = [];
	}
	
	//returns a TrailList containing the trails that match the request difficulty
	filterList(request){
		if(request == "easy"){
			this.addTrails(easyCheck);
			return filteredTrails;
		}
		else if(request == "medium"){
			addTrails(medCheck);
			return filteredTrails;
		}
		
		else if(request == "hard"){
			addTrails(hardCheck);
			return filteredTrails;
		}
		
		else{
			return this.allTrailsList;
		}
	}
	
	//goes through the main TrailList and adds Trails matching the request difficulty to the filtered TrailList
	addTrails(checkTrail){
		for(var i = 0; i < allTrailsList.length; i++){
			if(checkTrail(allTrailsList[i])){
				filteredTrails.push(allTrailsList[i]);
			}
		}
	}
		
//checks if trail difficulty is easier than user rating		
	easyCheck(aTrail){
		var trailDifficulty = difficultyConverter(aTrail);
		if(userRating < trailDifficulty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty matches user rating		
	medCheck(aTrail){
		var trailDifficulty = difficultyConverter(aTrail);
		if(userRating == trailDifficulty){
			return true;
		}
		else{
			return false;
		}
	}
	
//checks if trail difficulty is harder than user rating		
	hardCheck(aTrail){
		var trailDifficulty = difficultyConverter(aTrail);
		if(userRating < trailDifficulty){
			return true;
		}
		else{
			return false;
		}
	}
	
//Since the API stores difficulty as a string, this function converts it to an int
	difficultyConverter(aTrail){
		switch(aTrail.getDifficulty){
			case "dblack":
				return 6;
				break;
			case "black":
				return 5;
				break;
			case "blueBlack":
				return 4;
				break;
			case "blue":
				return 3;
				break;			
			case "greenBlue":
				return 2;
				break;
			case "green":
				return 1;
				break;
		}
	}
}

module.exports.ForYouFilter = ForYouFilter;