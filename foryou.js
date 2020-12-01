var Trail = require('./trail.js').Trail;

//implements the For You feature
class ForYouFilter{
	constructor(userProfile, allTrailsList)
	{
		if(userProfile && typeof(userProfile.userRec) != "undefined"){
			this.userRating = userProfile.userRec();
		}
		else
		{
			this.userRating = 3;
		}
		this.allTrailsList = allTrailsList;
		this.filteredTrails = [];
		this.converterArray = {"green": 1, "greenBlue": 2, "blue": 3, "blueBlack": 4, "black": 5, "dblack": 6};
	}
	
	//returns a TrailList containing the trails that match the request difficulty
	filterList(request){
		if(request == "easy" || request == "medium" || request == "hard")
		{
			for(var i = 0; i < this.allTrailsList.length; i++){
				var trailDifficulty = this.converterArray[this.allTrailsList[i].difficulty];
				if(request == 'easy' && trailDifficulty < this.userRating){
					this.filteredTrails.push(this.allTrailsList[i]);
				}
				else if(request == "medium" && trailDifficulty == this.userRating){
					this.filteredTrails.push(this.allTrailsList[i]);
				}
		
				else if(request == "hard" && trailDifficulty > this.userRating){
					this.filteredTrails.push(this.allTrailsList[i]);
				}
			}
			return this.filteredTrails;
		}
		else{
			return this.allTrailsList;	
		}
	}
}

module.exports.ForYouFilter = ForYouFilter;