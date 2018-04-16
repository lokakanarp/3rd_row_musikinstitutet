const View = (function (){
	
	const contentElement = document.getElementById('content');
	const searchButton = document.getElementById('search');
	const options = document.getElementById('selectSearch').children;
	const searchField = document.getElementById('searchField');	
	const addArtistForms = document.createElement('div'); 
	const headingForms = document.createElement('div');
	const confirmationMessageArtist = document.createElement('div');
	const artistFormElement = document.createElement('div');

	return {
		displayCardTrack: function(data){
			const headline = document.createElement('h2');
			headline.classList.add('sectionHeadline');
			headline.innerHTML = 'Låtar';
			contentElement.appendChild(headline);

			for(let i = 0; i < data.length; i++){
				let trackId = data[i]._id;
				let artistName = '';
				if(data[i].artists[0].name){
					artistName = data[i].artists[0].name;
				}else{
					artistName = 'unknown artist';
				}

				let trackTitle = data[i].title;
				let trackLink = data[i].spotifyURL;
				let genresArray = data[i].genres;
				let genre = '';
				for(let i = 0; i < genresArray.length; i++){
					genre += genresArray[i] + ' ';
				}
				let albumId = data[i].album._id;
				let albumImg = getAlbumImg(albumId);
				//console.log(albumImg);
				let trackRatingArray = data[i].ratings;
				let trackRating = calculateAverageRating(trackRatingArray);

				const cardWrapperElement = document.createElement('div');
				cardWrapperElement.classList.add('cardWrapper');

				if(!(artistName === 'unknown artist')){
				   cardWrapperElement.innerHTML = `
					<div class="cardArtistImg"><a href="${trackLink}"><img src="${albumImg}" alt="${artistName}" class="cardArtistImg" /></a></div>
					<a href="${trackLink}"><h2>${trackTitle}</h2></a>
					<p>${artistName}</p>
					<p>${genre}</p>
					<select id="rateTrack${trackId}" data-track="${trackId}" class="rateTrack">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
					<img src="images/star.svg" alt="stars" class="ratingStar" /> ${trackRating} <button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteButton"><img src="images/delete.svg" alt="Delete track" title="Delete track" /></button>
				`;
				}


				contentElement.appendChild(cardWrapperElement);

				//Rate track
				const rateTrackDropdown = document.getElementById(`rateTrack${trackId}`);
				rateTrackDropdown.addEventListener('change', function(event){
					event.preventDefault();
					//console.log(this);
					//console.log('id: ', this.dataset.track);
					let trackId = this.dataset.track;
					let trackRating = this[this.selectedIndex].value;

					//console.log('maybe the rating: ',  this[this.selectedIndex].value);
					Model.rateTrack(trackId, trackRating);
				});

				// Delete track
				const deleteTrackButton = document.getElementById(`deleteTrack${trackId}`);
				deleteTrackButton.addEventListener('click', function(event){
					event.preventDefault();
					let trackId = this.dataset.track;
					Model.deleteTrack(trackId);
				});
			}
		},
		
		displayCardArtist: function(data){
			const headline = document.createElement('h2');
			headline.classList.add('sectionHeadline');
			headline.innerHTML = 'Artister';
			contentElement.appendChild(headline);

			for(let i = 0; i < data.length; i++){
				let artistCoverImage = data[i].coverImage;
				let artistName = data[i].name;
				let artistBorn = data[i].born;
				let artistId = data[i]._id;
				let genresArray = data[i].genres;
				let genre = '';
				for(let i = 0; i < genresArray.length; i++){
					genre += genresArray[i] + ' ';
				}

				const cardWrapperElement = document.createElement('div');
				cardWrapperElement.classList.add('cardWrapper');
				cardWrapperElement.id = `${artistId}`;

				const cardArtistImgElement = document.createElement('div');
				cardArtistImgElement.innerHTML = `<img src="${artistCoverImage}" alt="${artistName}" />`;
				cardArtistImgElement.classList.add('cardArtistImg');

				const cardArtistNameElement = document.createElement('h2');
				cardArtistNameElement.innerHTML = artistName;
				cardArtistNameElement.classList.add('cardArtistName');

				cardArtistBornElement = document.createElement('div');
				cardArtistBornElement.innerHTML = `Född: ${artistBorn}`;
				cardArtistBornElement.classList.add('cardArtistBorn');

				const cardGenresElement = document.createElement('div');
				cardGenresElement.innerHTML = genre;
				cardGenresElement.classList.add('cardArtistGenres');
				cardGenresElement.classList.add('cardPlaylistGenres');

				const deleteButtonElement = document.createElement('div');
				deleteButtonElement.innerHTML = `
					<button id="deleteArtist${artistId}" data-track="${artistId}" class="deleteButton"><img src="images/delete.svg" alt="Delete artist" title="Delete artist" /></button>
				`;

				if(`${artistCoverImage}`){
					cardWrapperElement.appendChild(cardArtistImgElement);
				}
				cardWrapperElement.appendChild(cardArtistNameElement);
				cardWrapperElement.appendChild(cardArtistBornElement);
				cardWrapperElement.appendChild(cardGenresElement);
				cardWrapperElement.appendChild(deleteButtonElement);
				contentElement.appendChild(cardWrapperElement);

				const deleteTrackButton = document.getElementById(`deleteArtist${artistId}`);
				deleteTrackButton.addEventListener('click', function(event){
					event.preventDefault();
					let artistId = this.dataset.track;
					Model.deleteArtist(artistId, artistName);
				});
			}
		},

		deleteArtistFromDOM: function(artistId){
			const artistToDelete = document.getElementById(`${artistId}`);
			artistToDelete.parentNode.removeChild(artistToDelete);
		},

		showPlaylists: function(data) {
			const headline = document.createElement('h2');
			headline.classList.add('sectionHeadline');
			headline.innerHTML = 'Spellistor';
			contentElement.appendChild(headline);

			for(let i = 0; i < data.length; i++){
				View.displayCardPlaylist(data[i]);
			}
		},

		displayCardPlaylist: function(playlist){
			const cardWrapperElement = document.createElement('div');
			cardWrapperElement.classList.add('cardWrapper');
			cardWrapperElement.classList.add('cardWrapperPlaylist');
			cardWrapperElement.id = playlist._id;
			const cardPlaylistTitleElement = document.createElement('div');
			cardPlaylistTitleElement.classList.add('cardPlaylistName');
			const cardMenuElement = document.createElement('div');
			cardMenuElement.classList.add('cardMenuElement');
			const cardPlaylistGenresElement = document.createElement('div');
			cardPlaylistGenresElement.classList.add('cardPlaylistGenres');
			const cardCreatedByElement = document.createElement('div');
			cardCreatedByElement.classList.add('cardCreatedBy');
			const cardTrackListElement = document.createElement('div');
			cardTrackListElement.classList.add('cardTrackPlaylist');
			const cardCommentInputElement = document.createElement('div');
			cardCommentInputElement.classList.add('cardCommentInput');
			const cardCommentElement = document.createElement('div');
			cardCommentElement.classList.add('cardComment');
			cardCommentElement.id = `cardComment${playlist._id}`;

			cardWrapperElement.appendChild(cardPlaylistTitleElement);
			cardWrapperElement.appendChild(cardMenuElement);
			cardWrapperElement.appendChild(cardPlaylistGenresElement);
			cardWrapperElement.appendChild(cardCreatedByElement);
			cardWrapperElement.appendChild(cardTrackListElement);
			cardWrapperElement.appendChild(cardCommentInputElement);
			cardWrapperElement.appendChild(cardCommentElement);
			contentElement.appendChild(cardWrapperElement);

			let playlistRating = playlist.ratings;
			cardPlaylistTitleElement.innerHTML = playlist.title;
			cardMenuElement.innerHTML =	
				 `<select id="ratePlaylist${playlist._id}" data-track="${playlist._id}" class="rateTrack">
				 <option value="1">1</option>
				 <option value="2">2</option>
				 <option value="3">3</option>
				 <option value="4">4</option>
				 <option value="5">5</option>
				 <option value="6">6</option>
				 <option value="7">7</option>
				 <option value="8">8</option>
				 <option value="9">9</option>
				 <option value="10">10</option>
				 </select>
				 <img src="images/star.svg" alt="stars" class="ratingStar"/> 
				${playlistRating}
				<button id="deletePlaylist${playlist._id}" data-track="${playlist._id}" class="deleteButton"><img src="images/delete.svg" alt="Delete playlist" 
				title="Delete playlist"/></button>`

				//Delete playlist
				const deletePlaylistButton = document.getElementById(`deletePlaylist${playlist._id}`);
				deletePlaylistButton.addEventListener('click', function(event){
					event.preventDefault();
					let playlistId = this.dataset.track;
					Model.deletePlaylist(playlistId);
					});

				//Rate playlist
				const ratePlaylistDropdown = document.getElementById(`ratePlaylist${playlist._id}`);
				ratePlaylistDropdown.addEventListener('change', function(event){
					 event.preventDefault();
					 let playlistId = this.dataset.track;
					 let playlistRating = this[this.selectedIndex].value;
					 Model.ratePlaylist(playlistId, playlistRating);
					 });

				for (let genre of playlist.genres) {
					cardPlaylistGenresElement.insertAdjacentHTML('beforeend', genre.toUpperCase() + " ");
				}
				cardCreatedByElement.innerHTML = `<h3>${playlist.createdBy}</h3>`;

				let tracklist = "";
				for(let i = 0; i < playlist.tracks.length; i++){
					tracklist = `${i+1}. ${playlist.tracks[i].title} – ${playlist.tracks[i].artists[0].name}<br>`;

					cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);
				}
				 cardCommentInputElement.innerHTML = `
					<form>
						Kommentera spellista:<b>
						<input type='text' name='playlistComment' 
						id='playlistComment${playlist._id}' class="playlistInput"><br>
						Namn:<br>
						<input type='text'name='commentCreatedBy' id='commentCreatedBy${playlist._id}' class="playlistInput"><br>
						<button id='addCommentButton${playlist._id}' 
						class='addCommentButton' 
						data-id='${playlist._id}'>Skicka</button>
					</form>
					<div id='viewCommentsLink${playlist._id}' data-id='${playlist._id}' class='viewCommentsLink'>
						<h4>Se kommentarer</h4>
					</div>`

				let playlistComment = document.getElementById(`playlistComment${playlist._id}`);
				let commentCreatedBy = document.getElementById(`commentCreatedBy${playlist._id}`);
				let addCommentButton = document.getElementById(`addCommentButton${playlist._id}`);
				let viewCommentsLink = document.getElementById(`viewCommentsLink${playlist._id}`);
				addCommentButton.addEventListener('click', function(event){
					event.preventDefault();
					Model.postComment(playlistComment.value, commentCreatedBy.value, this.dataset.id);
				});
				viewCommentsLink.addEventListener('click', function(event){
					event.preventDefault();
					Model.getComments(this.dataset.id);
				})  
		},

		displayComments: function(comments, id) {
			let cardCommentElement = document.getElementById(`cardComment${id}`);
			for (let comment of comments){
				let singleComment = 
					`<div class='singleComment' id='${comment._id}'><h4>${comment.username.toUpperCase()}:</h4>
					 <p>${comment.body}<span><button id="deleteComment${comment._id}" data-comment="${comment._id}" class="deleteButton"><img src="images/delete.svg" alt="Delete playlist" 
				title="Delete playlist"/></button></span></p></div>`;
			cardCommentElement.insertAdjacentHTML('beforeend', singleComment);
			const deleteCommentButton = document.getElementById(`deleteComment${comment._id}`);
			deleteCommentButton.addEventListener('click', function(event){
				event.preventDefault();
				Model.deleteComment(this.dataset.comment);
				});
			}
		},

		deleteCommentFromDOM: function(commentId){
			const commentToDelete = document.getElementById(commentId);
			commentToDelete.parentNode.removeChild(commentToDelete);
		},

		deletePlaylistFromDOM: function(playlistId){
			const playlistToDelete = document.getElementById(playlistId);
			playlistToDelete.parentNode.removeChild(playlistToDelete);
		},

		errorMessage: function(text){
			const errorDivElement = document.getElementById('errorDiv');
			errorDivElement.style.display = "block";
			errorDivElement.innerHTML = `
				<div class="closePopupDiv">
					<button id="closePopup" class="deleteButton"><img src="images/delete.svg" alt="Close popup" /></button>
				</div>
				${text}
				`;

			const closePopupButton = document.getElementById('closePopup');
			closePopupButton.addEventListener('click', function(event){
				event.preventDefault();
				errorDivElement.style.display = "none";
			});
		},
		
		clearElement: function(element){
			element.innerHTML= '';   
		},

		displayCard: function(albums,letter){
			const headline = document.createElement('h2');
			headline.classList.add('sectionHeadline');
			headline.innerHTML = 'Album';
			contentElement.appendChild(headline);

			for(let i = 0; i < albums.length; i++){

				if(albums[i].artists[0] && (albums[i].artists[0].name.substr(0,1) == letter || letter == 'noLetter')){
					console.log(albums[i].artists[0].name.substr(0,1) == letter)
					let artistName = albums[i].artists[0].name
					let albumTitle = albums[i].title
					let albumId = albums[i]._id;
					let albumYear = albums[i].releaseDate;
					let albumCoverImage = albums[i].coverImage;
					let genresArray = albums[i].genres;
					let albumRatingsArray = albums[i].ratings;
					let tracksArray = albums[i].tracks;
					let albumURL = albums[i].spotifyURL;

					let averageAlbumRating = Model.calculateAverageRating(albumRatingsArray);

				const cardWrapperElement = document.createElement('div');
				cardWrapperElement.classList.add('cardWrapper');
				cardWrapperElement.id = `album${albumId}`;

				const cardAlbumImgElement = document.createElement('div');
				cardAlbumImgElement.classList.add('cardAlbumImg');

				const cardArtistNameElement = document.createElement('h2');
				cardArtistNameElement.classList.add('cardArtistName');

				const cardAlbumTitleElement = document.createElement('div');
				cardAlbumTitleElement.classList.add('cardAlbumTitle');

				const cardAlbumGenresElement = document.createElement('div');
				cardAlbumGenresElement.classList.add('cardAlbumGenres');

				const cardTrackListElement = document.createElement('div');
				cardTrackListElement.classList.add('cardTrackList');

				let albumRating = Model.calculateAverageRating(albumRatingsArray);

				cardAlbumImgElement.innerHTML = `<img src="${albumCoverImage}">`;
				cardArtistNameElement.innerHTML = artistName;

				cardAlbumTitleElement.innerHTML = 
					`<a href="${albumURL}">${albumTitle}</a> (${albumYear}) 
							<select id="rateAlbum${albumId}" data-track="${albumId}" class="rateTrack">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
						<img src="images/star.svg" alt="stars" class="ratingStar" /> ${albumRating} <button id="deleteAlbum${albumId}" data-track="${albumId}" class="deleteButton"><img src="images/delete.svg" alt="Delete album" title="Delete album" /></button>`

				cardAlbumGenresElement.innerHTML = genresArray[0];

					for(let i = 0; i < tracksArray.length; i++){
						let trackId = tracksArray[i];

						Model.getTrackInfo(trackId).then((singleTrackObject) => {

							// Check if there's a tracktitle, only write out if there is one (/not error)  
							if(!(singleTrackObject.type == 'error')){
								let trackTitle = singleTrackObject.title;
								let trackLink;
								if(!(singleTrackObject.spotifyURL == '')){
									trackLink = singleTrackObject.spotifyURL;
								}else if(!(singleTrackObject.youtubeURL == '')){
									trackLink = singleTrackObject.youtubeURL; 
								}else if(!(singleTrackObject.souncloudURL == '')){
									trackLink = singleTrackObject.soundcloudURL;    
								}else{
									trackLink = ''; // Just empty if no link??
								}


								/* Rating för enskilt spår, kommenterar ut sålänge:

								let trackRatingArray = singleTrackObject.ratings;

								//console.log(trackRatingArray.length);

								let singleTrackRating;
								if(!(trackRatingArray.length === 0)){
									singleTrackRating = calculateAverageRating(trackRatingArray); 
								}else{
									 singleTrackRating = ''; 
								}
								*/

								let tracklist = `
									<div id="${trackId}">
										<p><a target="_blank" href="${trackLink}">${trackTitle}</a></p>
										<span class="trackOptions">
											<button id="addTrackToPlaylist${trackId}" data-track="${trackId}" class="addTrackToPlaylist"><img src="images/plus.svg" alt="Add track to playlist" title="Add track to playlist" /></button>
											<select id="rateTrack${trackId}" data-track="${trackId}">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
												<option value="10">10</option>
											</select>
											<img src="images/star.svg" alt="stars" class="ratingStar" /> singleTrackRatingVar
											<button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteButton"><img src="images/delete.svg" alt="Delete track" title="Delete track" /></button>
										</span>
									</div>
								`;

								cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);

								cardWrapperElement.appendChild(cardAlbumImgElement);
								cardWrapperElement.appendChild(cardArtistNameElement);
								cardWrapperElement.appendChild(cardAlbumTitleElement);
								cardWrapperElement.appendChild(cardAlbumGenresElement);
								cardWrapperElement.appendChild(cardTrackListElement);
								contentElement.appendChild(cardWrapperElement);

								/***** Buttons/dropdowns with events *****/

								//Rate album 
								const rateAlbumDropdown = document.getElementById(`rateAlbum${albumId}`);
								rateAlbumDropdown.addEventListener('change', function(event){
									event.preventDefault();
									//console.log(this);
									//console.log('id: ', this.dataset.track);
									let albumId = this.dataset.track;
									let albumRating = this[this.selectedIndex].value;

									//console.log('maybe the rating: ',  this[this.selectedIndex].value);
									Model.rateAlbum(albumId, albumRating);
								});

								// Add track to playlist
								const addTrack = document.getElementById(`addTrackToPlaylist${trackId}`);
								addTrack.addEventListener('click', function(event){
									event.preventDefault();
									//console.log(this);
									//console.log(this.dataset.track);
									let trackId = this.dataset.track;
									// addTrackToPlaylist-function is to be found in playlist.js:
									Model.addTrackToPlaylist(trackId);
								});

								// Delete track
								const deleteTrackButton = document.getElementById(`deleteTrack${trackId}`);
								deleteTrackButton.addEventListener('click', function(event){
									event.preventDefault();
									//console.log(this);
									//console.log(this.dataset.track);
									let trackId = this.dataset.track;
									// addTrackToPlaylist-function is to be found in playlist.js:
									Model.deleteTrack(trackId);
								});

								//Rate track
								const rateTrackDropdown = document.getElementById(`rateTrack${trackId}`);
								rateTrackDropdown.addEventListener('change', function(event){
									event.preventDefault();
									//console.log(this);
									//console.log('id: ', this.dataset.track);
									let trackId = this.dataset.track;
									let trackRating = this[this.selectedIndex].value;

									//console.log('maybe the rating: ',  this[this.selectedIndex].value);
									Model.rateTrack(trackId, trackRating);
								});

							} // end looping out tracklist-relatied                   
						}); //end getting singleTrackObject .then()               
					} //end looping out trackId from tracksArray
				} //end if-statement that checks artistname starting letter
			} //looping through all albums from to get album info  
		}, //end displayCard

		deleteTrackFromDOM: function(trackId){
			const trackToDelete = document.getElementById(`${trackId}`);
			trackToDelete.parentNode.removeChild(trackToDelete);
		},

		deleteAlbumFromDOM: function(albumId){
			const albumToDelete = document.getElementById(`${albumId}`);
			albumToDelete.parentNode.removeChild(albumToDelete);
		},
		
		displayPlaylistForm: function() {
			contentElement.innerHTML = '';
			addArtistForms.classList.add('addArtistForms');
			contentElement.appendChild(addArtistForms);	
			headingForms.classList.add('headingForms');
			addArtistForms.appendChild(headingForms);
			confirmationMessageArtist.classList.add('confirmationMessage');
			addArtistForms.appendChild(confirmationMessageArtist);
			artistFormElement.classList.add('artistFormElement');
			addArtistForms.appendChild(artistFormElement);
			confirmationMessageArtist.innerHTML = '';
			headingForms.innerHTML = `<h2>Skapa en ny spellista</h2>`;
			const playlistForm = `
				<form>
					Spellistans namn:<br>
					<input id="newPlayListTitle" required/><br>
					Skapad av:<br>
					<input id="createdBy" required/><br>
					Genrer (separera med komma):<br>
					<input id="newPlaylistGenres"><br>
					Bildadress:<br>
					<input id="newPlaylistImage"><br>
					<button id="newPlaylistButton" type="submit" class='formButton'>Skapa spellista</button>
				</form>`;
			artistFormElement.innerHTML = playlistForm;	
			const newPlaylistButton = document.getElementById('newPlaylistButton');
			newPlaylistButton.addEventListener('click', function(event){
				event.preventDefault();
				Model.getElementsFromPlaylistForm();
			})
		},

		messagPlaylistForm: function(playlist) {
			const message = `<p>Du la till spellistan ${playlist.title.toUpperCase()} till Musikinstitutet.<br> 
			För att lägga till låtar till din spellista leta upp önskad låt med hjälp av sökfunktionen eller A-Ö-menyn. Klicka på plustecknet 
			bredvid låttitlarna och välj spellista ur menyn.</p>`
			artistFormElement.innerHTML = message;
		},

		createDropdown: function(playlists){
			const choosePlaylistElement = document.getElementById('choosePlaylist');
			choosePlaylistElement.classList.add('choosePlaylist');

			const playlistSelectionElement = document.getElementById('playlistSelection');
			choosePlaylistElement.style.display = "block";

			let optionRow;
			optionRow =
			`<option class="optionClass">Välj en spellista:</option>` 

			for(let i = 0; i < playlists.length; i++){
				let playlistId = playlists[i]._id;
				let playlistTitle = playlists[i].title;

				optionRow +=
				`<option value="${playlistId}" class="optionClass">${playlistTitle}</option>` 
			}

			playlistSelectionElement.insertAdjacentHTML('beforeend', optionRow);
		},

		displayArtistForm: function() {
			contentElement.innerHTML = '';
			addArtistForms.classList.add('addArtistForms');
			contentElement.appendChild(addArtistForms);	
			headingForms.classList.add('headingForms');
			addArtistForms.appendChild(headingForms);
			confirmationMessageArtist.classList.add('confirmationMessage');
			addArtistForms.appendChild(confirmationMessageArtist);
			artistFormElement.classList.add('artistFormElement');
			addArtistForms.appendChild(artistFormElement);
			confirmationMessageArtist.innerHTML = '';
			headingForms.innerHTML = `<h2>Lägg till en artist, ett album eller en låt.</h2>`;
			const artistForm = `<form>
			  Artistens eller bandets namn:<br>
			  <input type='text' name='nameOfArtist' id='nameOfArtist' required/>
			  <br>
			  Född:<br>
			  <input type='text' name='born' id='bornDateArtist'><br>
			  Genus:<br>
			  <select name='gender' id='genderOfArtist' class='selectGender'>
				  <option value='female'>Kvinna</option>
				  <option value='male'>Man</option>
				  <option value='other'>Annat</option>
			  </select><br>
			  Genrer (separera med komma):<br>
			  <input type='text' name='genres' id='genresOfArtist'><br>
			  Födelseland:<br>
			  <input type='text' name='countryBorn' id='countryBornArtist'><br>
			  Spotify URL:<br>
			  <input type='text' name='spotifyURL' id='spotifyURLOfArtist'><br>
			  Bildadress:<br>
			  <input type='text' name='coverImage' id='coverImageOfArtist'><br>
				<button id='artistFormButton' class='formButton'>Lägg till artist</button><br>
			</form>`;
			artistFormElement.innerHTML = artistForm;
			const artistFormButton = document.getElementById('artistFormButton');
			addEventListenerToButton(artistFormButton, getElementsfromArtistForm);
		},

		messageArtistForm: function(artist) {
			const message = `<p>Du la till ${artist.name.toUpperCase()} till Musikinstitutet.<br> 
				För att lägga till ett album av ${artist.name.toUpperCase()} använd formuläret nedan.</p>`
			confirmationMessageArtist.innerHTML = message;
			View.displayAlbumForm(artist._id);
		},

		displayAlbumForm: function(artistId) {
			const albumForm = `<form>
				<input type='hidden' id= 'artistId' value=${artistId}>
			  Albumtitel:<br>
			  <input type='text' name='titleOfAlbum' id='titleOfAlbum'><br>
			  Utgivningsdatum:<br>
			  <input type='text' name='dateOfRelease' id='dateOfRelease'><br>
			  Genrer (separera med komma):<br>
			  <input type='text' name='genresOfAlbum' id='genresOfAlbum'><br>
			  Spotify URL:<br>
			  <input type='text' name='spotifyURLOfAlbum' id='spotifyURLOfAlbum'><br>
			  Omslagsbild:<br>
			  <input type='text' name='coverImageOfAlbum' id='coverImageOfAlbum'><br>
			  <button id='albumFormButton' class='formButton'>Lägg till album</button>
				<br>
			</form>`;
			artistFormElement.innerHTML = albumForm;
			let albumFormButton = document.getElementById('albumFormButton');
			addEventListenerToButton(albumFormButton, getElementsFromAlbumForm);
		},

		messageAlbumForm: function(album) {
			const message = `<p>Du la till ${album.title.toUpperCase()} till Musikinstitutet.<br> 
				För att lägga till en låt till ${album.title.toUpperCase()} använd formuläret nedan.</p>`;
			confirmationMessageArtist.innerHTML = message;
			View.displayTracksForm(album._id, album.artists, album.coverImage);
		},

		displayTracksForm: function(albumId, artistId, coverImage) {
			let tracksForm = `<form>
			  Låttitel:<br>
			  <input type='text' name='titleOfTrack' id='titleOfTrack'>
			  <br>
			  <input type='hidden' id='artistId' value=${artistId}>
			  <input type='hidden' id='albumId' value=${albumId}>
			  <input type='hidden' id='coverImageOfAlbum' value=${coverImage}>
			  Genrer (separerade med komma):<br>
			  <input type='text' name='genresOfTrack' id='genresOfTrack'>
			  <br>
			  Omslagsfärg:<br>
			  <input type='text' name='coverImageColorOfTrack' id='coverImageColorOfTrack'>
			  <br>
			  Spotify URL:<br>
			  <input type='text' name='spotifyURLOfTrack' id='spotifyURLOfTrack'> 
			  <br>
			  Youtube URL:<br>
			  <input type='text' name='youtubeURLOfTrack' id='youtubeURLOfTrack'>
			  <br>
			  Soundcloud URL:<br>
			  <input type='text' name='soundcloudURLOfTrack' id='soundcloudURLOfTrack'><br>
			  <button id='tracksFormButton' class='formButton'>Lägg till låt</button>
			<br>
			</form>`;
			artistFormElement.innerHTML = tracksForm;
			let tracksFormButton = document.getElementById('tracksFormButton');
			addEventListenerToButton(tracksFormButton, getElementsFromTracksForm);
		},

		messageTrackForm: function(track) {
			const message = `<p>Du la till ${track.title.toUpperCase()} till Musikinstitutet.<br> 
				För att lägga till ännu en låt till samma skiva, använd formuläret igen.<br>
				För att lägga till en ny artist klicka på knappen nedan.</p><br>
				<button id='newArtistButton' class='formButton'>Lägg till en ny artist</button>`;
			confirmationMessageArtist.innerHTML = message;

			const newArtistButton = document.getElementById('newArtistButton');
			newArtistButton.addEventListener('click', function(event){
				event.preventDefault();
				View.displayArtistForm();
			});	
		}

		
		
	}
	
})();