const Model = (function() {
	const options = document.getElementById('selectSearch').children;
	
	
	
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
					View.displayCardArtist(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});
			}

			if(track.selected == true){
				fetch(`https://folksa.ga/api/tracks?key=flat_eric&title=${searchWord}&sort=desc&limit=12`)
				.then((response) => response.json())
				.then((data) => {
					View.displayCardTrack(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});
			}

			if(album.selected == true){
				fetch(`https://folksa.ga/api/albums?key=flat_eric&title=${searchWord}&populateArtists=true&sort=desc&limit=15`)
				.then((response) => response.json())
				.then((data) => {
					View.displayCard(data, 'noLetter');
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});
			}

			if(playlist.selected == true){
				fetch(`https://folksa.ga/api/playlists?key=flat_eric&title=${searchWord}&sort=desc&limit=12`)
				.then((response) => response.json())
				.then((data) => {
					View.showPlaylists(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});
			}

			if(genre.selected == true){
				fetch(`https://folksa.ga/api/artists?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					View.displayCardArtist(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});

				fetch(`https://folksa.ga/api/tracks?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					View.displayCardTrack(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});

				fetch(`https://folksa.ga/api/albums?key=flat_eric&genres=${searchWord}&populateArtists=true&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					View.displayCard(data, 'noLetter');
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
					console.log(error)
				});

				fetch(`https://folksa.ga/api/playlists?key=flat_eric&genres=${searchWord}&sort=desc&limit=6`)
				.then((response) => response.json())
				.then((data) => {
					View.showPlaylists(data);
				})
				.catch((error) => {
					View.errorMessage('Något gick fel. Försök igen senare.');
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
				View.errorMessage('Något gick fel. Försök igen senare.');
				console.log(error)
			});	
		},

		getComments: function(id) {
			fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric&limit=1000`)
			.then((response) => response.json())
			.then((comments) => {
				console.log(comments);
				View.displayComments(comments, id);
			})
			.catch((error) => {
				View.errorMessage('Något gick fel. Försök igen senare.');
				console.log(error)
			});
		},

		getAlbums: function(letter){  
			fetch('https://folksa.ga/api/albums?key=flat_eric&populateArtists=true&limit=200')
			  .then((response) => response.json())
			  .then((albums) => {
				  Controller.sortAlbums(albums,letter);
			})
			.catch((error) => {
				View.errorMessage('Något gick fel. Försök igen senare.');
				console.log(error)
			});
		},

		getTrackInfo: function(trackId){
			return fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`)
		  .then((response) => response.json())
		  .then((singleTrack) => {    
				return singleTrack;
		  })
		  .catch((error) => {
				View.errorMessage('Något gick fel. Försök igen senare.');
				console.log(error)
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
				Model.postArtist(elementsfromArtistForm);	
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
				View.messageArtistForm(artist);
			  })
				.catch(function () {
				console.log('error')
				View.errorMessage('Något gick fel. Försök igen senare.');
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
				Model.postAlbum(elementsFromAlbumForm);
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
				View.messageAlbumForm(album);
			  })
			  .catch(function () {
				View.errorMessage('Något gick fel. Försök igen senare.');
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
				Model.postTrack(elementsFromTracksForm);
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
				View.messageTrackForm(track);
			  })
			  .catch(function () {
				View.errorMessage('Något gick fel. Försök igen senare.');
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
			Model.createPlaylist(title, createdBy, coverImage, genres);
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
				  View.messagPlaylistForm(playlist); 
			  })
			  .catch(function () {
				  View.errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		getExistingPlaylists: function(){
			fetch('https://folksa.ga/api/playlists?limit=200&key=flat_eric')
			  .then((response) => response.json())
			  .then((playlists) => {
				// Pushing info about existing playlists forward to functions that displays them in a drop down-menu in DOM:
				View.createDropdown(playlists); 
			  })
			   .catch(function () {
				View.errorMessage('Något gick fel. Försök igen senare.');
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
				View.errorMessage('Något gick fel. Försök igen senare.');
			  })	
		},

		getTopPlaylists: function(){
			fetch('https://folksa.ga/api/playlists?key=flat_eric')
			  .then((response) => response.json())
			  .then((playlists) => {
				Controller.cloneAndCalculateAverage(playlists); 
			  })
			  .catch(function () {
				View.errorMessage('Något gick fel. Försök igen senare.');
			  })	
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
				})
				.catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
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
					
				})
				.catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
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
				})
				.catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				});  
		},

		deleteArtist: function(artistId, artistName){
			const deleteConfirm = confirm(`Vill du verkligen ta bort ${artistName}?`);

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				  .catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				  });

				View.deleteArtistFromDOM(artistId);
			}
		},

		deletePlaylist: function(playlistId){
			const deleteConfirm = confirm("Vill du verkligen ta bort spellistan?");
			if(deleteConfirm){
				fetch(`https://folksa.ga/api/playlists/${playlistId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				  .catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				  });
				
				View.deletePlaylistFromDOM(playlistId);
			}
		},

		deleteComment: function(commentId){
			const deleteConfirm = confirm("Vill du verkligen ta bort kommentaren?");
			if(deleteConfirm){
				fetch(`https://folksa.ga/api/comments/${commentId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				  .catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				  });
				
				View.deleteCommentFromDOM(commentId);
			}
		},

		deleteTrack: function(trackId){
			const deleteConfirm = confirm("Vill du verkligen ta bort låten?");

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				  .catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				  });

				  View.deleteTrackFromDOM(trackId);
			}
		},

		deleteAlbum: function(albumId){
			const deleteConfirm = confirm("Vill du verkligen ta bort albumet?");

			if(deleteConfirm){
				fetch(`https://folksa.ga/api/albums/${albumId}?key=flat_eric`,{
					method: 'DELETE'
				  })
				  .then((response) => response.json())
				  .catch(function () {
					View.errorMessage('Något gick fel. Försök igen senare.');
				  });

				View.deleteAlbumFromDOM(albumId);
			}
		}
	}
})();
