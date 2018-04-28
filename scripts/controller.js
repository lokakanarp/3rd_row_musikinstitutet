const Controller = (function() {
	
	// Array that holds the track you're currently adding:
	var playlistTrack = [];
	
	return {
        playlistTrack: playlistTrack,
        
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
				let averageToplistRating = Controller.calculateAverageRating(ratingsArray);
				playlistClone[i].ratings = [];
				playlistClone[i].ratings = averageToplistRating;  
			}

			Controller.sortTopFive(playlistClone); 
		},

		sortTopFive: function(playlistClone){
            
            /* Solving sorting problem (in a weird way) with first getting 10 points playlist in new array (in for-loop below)... 
            Why? Because I can't get sort to sort in numbers correctly (10 = 1, and that's not right)'*/
            let sortedWithTen = []; 
            /* How many 10 points playlists are there? */
            let tenCount = 0;
            
			for(let i = 0; i < playlistClone.length; i++){
                if(playlistClone[i].ratings == 10){
                    sortedWithTen.push(playlistClone[i]);
                    tenCount++; 
                    /* The list is a top 5 only, so break if there's more than 5 */
                    if(tenCount == 5){
                        break;
                    }
                }
			}  

            /* Sorting all playslists "alphabetically" */
			playlistClone.sort((a,b) => {
				var nameA = a.ratings ?  a.ratings : '';
				var nameB = b.ratings ?  b.ratings : '';
				return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
			})
            
            /* How many sports are left on top 5 after counting 10 ponits playlists? */
            let underTenCount = 5 - tenCount;
            
			for(let i = 0; i < underTenCount; i++){   
                sortedWithTen.push(playlistClone[i]);
			} 
            
			for(let i = 0; i < 5; i++){   
				let playlist = sortedWithTen[i];
				View.displayCardPlaylist(playlist, 'allreadySorted'); 
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

			if(isNaN(result)){
				return ''; // Returns blank if result is NaN (probably means no one has votes)
			}else{
				return result;
			}   
		},
        
        // Add 0 before month if month is before October
        addZero: function(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        },
        
        getBirthday: function(date) {
            let fullDateTime = new Date(date);
            let year = fullDateTime.getFullYear();
            let month = Controller.addZero((fullDateTime.getMonth()) + 1);
            let day = Controller.addZero(fullDateTime.getDate());
            return year + '-' + month + '-' + day;
        }
        
	}
	
})();