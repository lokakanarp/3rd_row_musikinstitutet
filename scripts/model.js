const Model = (function() {
	
	// Array that holds the track you're currently adding:
	var playlistTrack = [];
	
	return {
		getDataFromSearch: function(){
			let searchWord = searchField.value;
			const artist = options[0];
			const track = options[1];
			const album = options[2];
			const playlist = options[3];
			const genre = options[4];

			if(artist.selected == true){
				fetch(`https://folksa.ga/api/artists?key=flat_eric&name=${searchWord}&sort=desc&limit=12`)
				.then((response) => response.json())
				.then((data) => {
					displayCardArtist(data);
				})
				.catch((error) => {
					console.log(error)
				});
			}

			if(track.selected == true){
				fetch(`https://folksa.ga/api/tracks?key=flat_eric&title=${searchWord}&sort=desc&limit=12`)
				.then((response) => response.json())
				.then((data) => {
					displayCardTrack(data);
				})
				.catch((error) => {
					console.log(error)
				});
			}

			if(album.selected == true){
				fetch(`https://folksa.ga/api/albums?key=flat_eric&title=${searchWord}&populateArtists=true&sort=desc&limit=15`)
				.then((response) => response.json())
				.then((data) => {
					displayCard(data, 'noLetter');
				})
				.catch((error) => {
					console.log(error)
				});
			}

			if(playlist.selected == true){
				fetch(`https://folksa.ga/api/playlists?key=flat_eric&title=${searchWord}&sort=desc&limit=12`)
				.then((response) => response.json())
				.then((data) => {
					showPlaylists(data);
				})
				.catch((error) => {
					console.log(error)
				});
			}

			if(genre.selected == true){
				fetch(`https://folksa.ga/api/artists?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					displayCardArtist(data);
				})
				.catch((error) => {
					console.log(error)
				});

				fetch(`https://folksa.ga/api/tracks?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					displayCardTrack(data);
				})
				.catch((error) => {
					console.log(error)
				});

				fetch(`https://folksa.ga/api/albums?key=flat_eric&genres=${searchWord}&populateArtists=true&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					displayCard(data, 'noLetter');
				})
				.catch((error) => {
					console.log(error)
				});

				fetch(`https://folksa.ga/api/playlists?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					showPlaylists(data);
				})
				.catch((error) => {
					console.log(error)
				});
			}
		},

		getAlbumImg: function(albumId){
			fetch(`https://folksa.ga/api/albums/${albumId}?key=flat_eric`)
			.then((response) => response.json())
			.then((album) => {
		//        console.log(album)
		//        console.log(album.coverImage);
			});
		},

		postComment: function(input, createdBy, id) {
			console.log(input, createdBy, id);
			let comment = {
			playlist: id,
			body: input,
			username: createdBy
			}
			fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(comment)
			})
			.then((response) => response.json())
			.then((playlist) => {
			console.log(playlist);
		  })
			.catch((error) => {
					console.log(error)
				});	
		},

		getComments: function(id) {
			fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric&limit=1000`)
			.then((response) => response.json())
			.then((comments) => {
				console.log(comments);
				displayComments(comments, id);
			})
			.catch((error) => {
					console.log(error)
				});
		},

		getAlbums: function(letter){  
			fetch('https://folksa.ga/api/albums?key=flat_eric&populateArtists=true&limit=200')
			  .then((response) => response.json())
			  .then((albums) => {
				  sortAlbums(albums,letter);
			});
		},

		sortAlbums: function(albums, letter){
			albums.sort((a,b) => {
				var nameA = a.artists[0] ?  a.artists[0].name : '';
				var nameB = b.artists[0] ?  b.artists[0].name : '';
				return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
			})
				displayCard(albums, letter);        
		},

		getTrackInfo: function(trackId){
			return fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`)
		  .then((response) => response.json())
		  .then((singleTrack) => {    
				return singleTrack;
		  });
		},

		getElementsfromArtistForm: function() {
			const nameOfArtist = document.getElementById('nameOfArtist');
			const bornDateArtist = document.getElementById('bornDateArtist');
			const genderOfArtist = document.getElementById('genderOfArtist');
			const genresOfArtist = document.getElementById('genresOfArtist');
			const countryBornArtist = document.getElementById('countryBornArtist');
			const spotifyURLOfArtist = document.getElementById('spotifyURLOfArtist');
			const coverImageOfArtist = document.getElementById('coverImageOfArtist');
			if(nameOfArtist.value === ''){
			  alert('Var vänlig fyll i artistens namn.');
			} else {
				const elementsfromArtistForm = {
					name: nameOfArtist.value,
					born: bornDateArtist.value,
					gender: genderOfArtist.value,
					genres: genresOfArtist.value, 
					countryBorn: countryBornArtist.value,
					spotifyURL: spotifyURLOfArtist.value,
					coverImage: coverImageOfArtist.value	
				}
				postArtist(elementsfromArtistForm);	
			}
		},

		postArtist: function(artist){
			fetch('https://folksa.ga/api/artists?key=flat_eric',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(artist)
			  })
			  .then((response) => response.json())
			  .then((artist) => {
				console.log(artist);
				messageArtistForm(artist);
			  })
				.catch(function () {
				console.log('error')
				errorMessage('Något gick fel. Försök igen senare.');
			})
		},

		getElementsFromAlbumForm: function() {
			let artistId = document.getElementById('artistId');
			let titleOfAlbum = document.getElementById('titleOfAlbum');
			let dateOfRelease = document.getElementById('dateOfRelease');
			let genresOfAlbum = document.getElementById('genresOfAlbum');
			let spotifyURLOfAlbum = document.getElementById('spotifyURLOfAlbum');
			let coverImageOfAlbum = document.getElementById('coverImageOfAlbum');
			if(titleOfAlbum.value === '' ){
			  alert('Var vänlig fyll i albumtitel.');
			} else {
				let elementsFromAlbumForm = {
				title: titleOfAlbum.value,
				artists: artistId.value, 
				releaseDate: dateOfRelease.value,
				genres: genresOfAlbum.value, 
				spotifyURL: spotifyURLOfAlbum.value,
				coverImage: coverImageOfAlbum.value
				}
				postAlbum(elementsFromAlbumForm);
			}
		},

		postAlbum: function(album) {
			fetch('https://folksa.ga/api/albums?key=flat_eric',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(album)
			  })
			  .then((response) => response.json())
			  .then((album) => {
				console.log(album);
				messageAlbumForm(album);
			  })
			  .catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		getElementsFromTracksForm: function() {
			const titleOfTrack = document.getElementById('titleOfTrack');
			const artistId = document.getElementById('artistId');
			const albumId = document.getElementById('albumId');
			const genresOfTrack = document.getElementById('genresOfTrack');
			const coverImageOfAlbum = document.getElementById('coverImageOfAlbum')
			const coverImageColor = document.getElementById('coverImageColorOfTrack');
			const spotifyURLOfTrack = document.getElementById('spotifyURLOfTrack');
			const youtubeURLOfTrack = document.getElementById('youtubeURLOfTrack');
			const soundcloudURLOfTrack = document.getElementById('soundcloudURLOfTrack');
			if(titleOfTrack.value === '' ){
			  alert('Var vänlig fyll i låttitel.');
			}else {
				const elementsFromTracksForm = {
				title: titleOfTrack.value,
				artists: artistId.value,
				album: albumId.value, 
				genres: genresOfTrack.value,
				coverImage: coverImageOfAlbum.value, 
				coverImageColor: coverImageColor.value,
				spotifyURL: spotifyURLOfTrack.value,
				youtubeURL: youtubeURLOfTrack.value,
				soundcloudURL: soundcloudURLOfTrack.value
				}
				postTrack(elementsFromTracksForm);
			}
		},

		postTrack: function(track) {
			fetch('https://folksa.ga/api/tracks?key=flat_eric',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(track)
			  })
			  .then((response) => response.json())
			  .then((track) => {
				console.log(track);
				messageTrackForm(track);
			  })
			  .catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })
		},

		getElementsFromPlaylistForm: function() {
			const newPlayListTitle = document.getElementById('newPlayListTitle');
			const createdByInput = document.getElementById('createdBy');
			const newPlaylistGenres = document.getElementById('newPlaylistGenres');
			const newPlaylistImage = document.getElementById('newPlaylistImage');
			const title = newPlayListTitle.value;
			const createdBy = createdByInput.value;
			const coverImage = newPlaylistImage.value
			const genres = newPlaylistGenres.value;
			createPlaylist(title, createdBy, coverImage, genres);
		},

		createPlaylist: function(title, createdBy, coverImage, genres){
			let playlist = {
				title: title,
				genres: genres,
				createdBy: createdBy,
				coverImage: coverImage
			}
			fetch('https://folksa.ga/api/playlists?key=flat_eric',{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(playlist)
			  })
			  .then((response) => response.json())
			  .then((playlist) => {
			  console.log(playlist);
			  messagPlaylistForm(playlist); 
			  })
			  .catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},


		addTrackToPlaylist: function(trackId){
			// Saving track id to array:
			playlistTrack.push(trackId);
			// Fetching existing playlist so that user can choose which playlist they want to add track to:
			getExistingPlaylists();
		},


		getExistingPlaylists: function(){
			fetch('https://folksa.ga/api/playlists?limit=200&key=flat_eric')
			  .then((response) => response.json())
			  .then((playlists) => {
				// Pushing info about existing playlists forward to functions that displays them in a drop down-menu in DOM:
				createDropdown(playlists); 
			  })
			   .catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		postToPlaylist: function(playlistId){
			// Make a string out of the track-array:
			let tracks = playlistTrack.toString();

			fetch(`https://folksa.ga/api/playlists/${playlistId}/tracks?key=flat_eric`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ tracks: tracks })
			  })
			  .then((response) => response.json())
			  .then((playlist) => {
				console.log('this is the playlist: ', playlist);
					playlistTrack = ''; 
					alert(`Great! The track was added to ${playlist.title}`);
			  })
				.catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		getTopPlaylists: function(){
			fetch('https://folksa.ga/api/playlists?key=flat_eric')
			  .then((response) => response.json())
			  .then((playlists) => {
				cloneAndCalculateAverage(playlists); 
			  })
			  .catch(function () {
				errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		cloneAndCalculateAverage: function(playlists){  
			let playlistClone = [...playlists];

			/* Instead of array of single votes, ratings property is replaced to average in array clone: */
			for(i = 0; i < playlistClone.length; i++){
				let ratingsArray = playlistClone[i].ratings;
				console.log(ratingsArray);
				let averageToplistRating = calculateAverageRating(ratingsArray);
				console.log(averageToplistRating);
				playlistClone[i].ratings = [];
				playlistClone[i].ratings = averageToplistRating;  
			}

			sortTopFive(playlistClone); 
		},

		sortTopFive: function(playlistClone){
			playlistClone.sort((a,b) => {
				var nameA = a.ratings ?  a.ratings : '';
				var nameB = b.ratings ?  b.ratings : '';
				return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
			})

			for(let i = 0; i < 5; i++){
				let playlist = playlistClone[i];
				displayCardPlaylist(playlist);
			}  
		},

		rateAlbum: function(albumId, albumRating){
			fetch(`https://folksa.ga/api/albums/${albumId}/vote?key=flat_eric`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rating: albumRating })
				})
				.then((response) => response.json())
				.then((album) => {
					console.log(album);
				});
		},

		rateTrack: function(trackId, trackRating){
			fetch(`https://folksa.ga/api/tracks/${trackId}/vote?key=flat_eric`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rating: trackRating })
				})
				.then((response) => response.json())
				.then((track) => {
					//console.log(track);
				});
		},

		ratePlaylist: function(playlistId, playlistRating){
		   fetch(`https://folksa.ga/api/playlists/${playlistId}/vote?key=flat_eric`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rating: playlistRating })
				})
				.then((response) => response.json())
				.then((playlist) => {
					console.log(playlist);
				});  
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

		deleteArtist: function(artistId, artistName){
			const deleteConfirm = confirm(`Vill du verkligen ta bort ${artistName}?`);

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())

				deleteArtistFromDOM(artistId);
			}
		},

		deletePlaylist: function(playlistId){
			const deleteConfirm = confirm("Vill du verkligen ta bort spellistan?");
			if(deleteConfirm){
				fetch(`https://folksa.ga/api/playlists/${playlistId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				deletePlaylistFromDOM(playlistId);
			}
		},

		deleteComment: function(commentId){
			const deleteConfirm = confirm("Vill du verkligen ta bort kommentaren?");
			if(deleteConfirm){
				fetch(`https://folksa.ga/api/comments/${commentId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				deleteCommentFromDOM(commentId);
			}
		},

		deleteTrack: function(trackId){
			const deleteConfirm = confirm("Vill du verkligen ta bort låten?");

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())

				  deleteTrackFromDOM(trackId);
			}
		},

		deleteAlbum: function(albumId){
			const deleteConfirm = confirm("Vill du verkligen ta bort albumet? Albumets låtar kommer försvinna.");

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/albums/${albumId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())

				deleteAlbumFromDOM(albumId);
			}
		}
	}
})();
