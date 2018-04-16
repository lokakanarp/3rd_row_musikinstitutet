const Controller = (function() {
	
	// Array that holds the track you're currently adding:
	var playlistTrack = [];
	
	return {
		sortAlbums: function(albums, letter){
			albums.sort((a,b) => {
				var nameA = a.artists[0] ?  a.artists[0].name : '';
				var nameB = b.artists[0] ?  b.artists[0].name : '';
				return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
			})
				View.displayCard(albums, letter);        
		},
		
		addTrackToPlaylist: function(trackId){
			// Saving track id to array:
			playlistTrack.push(trackId);
			// Fetching existing playlist so that user can choose which playlist they want to add track to:
			Model.getExistingPlaylists();
		},
		
		cloneAndCalculateAverage: function(playlists){  
			let playlistClone = [...playlists];

			/* Instead of array of single votes, ratings property is replaced to average in array clone: */
			for(i = 0; i < playlistClone.length; i++){
				let ratingsArray = playlistClone[i].ratings;
				console.log(ratingsArray);
				let averageToplistRating = Controller.calculateAverageRating(ratingsArray);
				console.log(averageToplistRating);
				playlistClone[i].ratings = [];
				playlistClone[i].ratings = averageToplistRating;  
			}

			Controller.sortTopFive(playlistClone); 
		},

		sortTopFive: function(playlistClone){
			playlistClone.sort((a,b) => {
				var nameA = a.ratings ?  a.ratings : '';
				var nameB = b.ratings ?  b.ratings : '';
				return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
			})

			for(let i = 0; i < 5; i++){
				let playlist = playlistClone[i];
				View.displayCardPlaylist(playlist); 
			}  
		},
		
		calculateAverageRating: function(incomingArrayOfRatings){
			let denominator = 0;

			for(let i = 0; i < incomingArrayOfRatings.length; i++){
				denominator += incomingArrayOfRatings[i]; 
			}

			let numerator = incomingArrayOfRatings.length;
			let result = denominator / numerator;
			result = result.toFixed(1);
			console.log(result);

			if(isNaN(result)){
				return ''; // Returns blank if result is NaN (probably means no one has votes)
			}else{
				return result;
			}   
		},
		
	}
	
})();