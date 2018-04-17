const View = (function (){
	
	const contentElement = document.getElementById('content');
    const spinner = document.getElementById('spinner');
	const searchButton = document.getElementById('search');
	const searchField = document.getElementById('searchField');	
	const addArtistForms = document.createElement('div'); 
	const headingForms = document.createElement('div');
	const confirmationMessageArtist = document.createElement('div');
	const artistFormElement = document.createElement('div');
	const showToplistButton = document.getElementById('showToplistButton');
	const displayPlaylistFormLink = document.getElementById('displayPlaylistFormLink');
	const displayArtistFormLink = document.getElementById('displayArtistFormLink');
    const url = new URL(window.location.href);
	
	searchButton.addEventListener('click', function(event){
		event.preventDefault();
		contentElement.innerHTML = '';
		Model.getDataFromSearch();
	});

	showToplistButton.addEventListener('click', function(event){
		event.preventDefault();
		contentElement.innerHTML = '';
		Model.getTopPlaylists();
	});
	
	playlistSelection.addEventListener('change', function (){
		event.preventDefault();
		const choosePlaylistElement = document.getElementById('choosePlaylist');
		choosePlaylistElement.style.display = "none";

		let playlistId = this[this.selectedIndex].value;

		Model.postToPlaylist(playlistId);

	});
	
	displayPlaylistFormLink.addEventListener('click', function(event){
		event.preventDefault();
		View.displayPlaylistForm();
	});
	

	displayArtistFormLink.addEventListener('click', function(event){
		event.preventDefault();
		View.clearElement(contentElement);
		View.displayArtistForm();
	});
	
	

	return {
		initialize: function(){
			View.addEventlistenersToAlphabet();
		},
		addEventListenerToButton: function(button, callback) {
			button.addEventListener('click', function(event){
				event.preventDefault();
				callback();
			})
		},
		
		addEventlistenersToAlphabet: function(){
			let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
			for(let letter of alphabetLetters) {
				letter.addEventListener('click', function () {

					const letter = this.id;
					View.clearElement(contentElement);
					Model.getAlbums(letter);
				})
			}
		},
			 
		displayCardTrack: function(data){
			for(let i = 0; i < data.length; i++){
				let trackId = data[i]._id;
				let artistName = '';
				if(data[i].artists.length !== 0 && data[i].artists[0].name){
					artistName = data[i].artists[0].name;
				}else{
					artistName = 'unknown artist';
				}

				let trackTitle = data[i].title;
                let trackLink = '';
                if(data[i].spotifyURL & data[i].spotifyURL != ''){
                    trackLink = data[i].spotifyURL;
                }
				let genresArray = data[i].genres;
				let genre = '';
				for(let i = 0; i < genresArray.length; i++){
					genre += genresArray[i] + ' ';
				}
                let albumImg = '';
                if(data[i].coverImage && data[i].coverImage != ""){
                     albumImg = data[i].coverImage;
                }else{
                     albumImg = `${url}/images/music-note.png`;
                }
                let albumTitle = data[i].album.title;
				let trackRatingArray = data[i].ratings;
				let trackRating = Controller.calculateAverageRating(trackRatingArray);

				const cardWrapperElement = document.createElement('div');
				cardWrapperElement.classList.add('cardWrapper');
                cardWrapperElement.id = `${trackId}`;

				if(!(artistName === 'unknown artist')){
				   cardWrapperElement.innerHTML = `
					<div class="cardArtistImg"><a href="${trackLink}"><img src="${albumImg}" alt="${artistName}" class="cardArtistImg" /></a></div>
                    <div class="cardContent">
                        <a href="${trackLink}"><h2>${trackTitle}</h2></a>
                        <p class="cardAlbumTitle">${albumTitle}</p>
                        <p>${artistName}</p>
                        <p class="cardPlaylistGenres">${genre}</p>
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
                        <img src="images/star.svg" alt="stars" class="ratingStar" /> ${trackRating} <button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort låt" title="Ta bort låt" /></button>
                    </div>
				    `;
				

                    contentElement.appendChild(cardWrapperElement);

                    //Rate track
                    const rateTrackDropdown = document.getElementById(`rateTrack${trackId}`);
                    rateTrackDropdown.addEventListener('change', function(event){
                        event.preventDefault();
                        let trackId = this.dataset.track;
                        let trackRating = this[this.selectedIndex].value;
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
			}
		},
		
		displayCardArtist: function(data){
			for(let i = 0; i < data.length; i++){
				let artistCoverImage = data[i].coverImage;
				let artistName = data[i].name;
                let artistBorn = Controller.getBirthday(data[i].born);
				let artistId = data[i]._id;
				let genresArray = data[i].genres;
				let genre = '';
				for(let i = 0; i < genresArray.length; i++){
					genre += genresArray[i] + ' ';
				}
                let spotifyLink = '';
                if(data[i].spotifyURL & data[i].spotifyURL != ''){
                    spotifyLink = data[i].spotifyURL;
                }
                
                
                // Create elements and give them classes and content
				const cardWrapperElement = document.createElement('div');
				cardWrapperElement.classList.add('cardWrapper');
				cardWrapperElement.id = `${artistId}`;

				const cardArtistImgElement = document.createElement('div');
                if(artistCoverImage){
                   cardArtistImgElement.innerHTML = `<img src="${artistCoverImage}" alt="${artistName}" />`;
                }
                else{
                    cardArtistImgElement.innerHTML = `<img src="${url}/images/music-note.png" alt="${artistName}" />`;
                }
				cardArtistImgElement.classList.add('cardArtistImg');
                
                const cardContent = document.createElement('div');
                cardContent.classList.add('cardContent');

				const cardArtistNameElement = document.createElement('h2');
				cardArtistNameElement.innerHTML = `<a href="${spotifyLink}">${artistName}</a>`;
				cardArtistNameElement.classList.add('cardArtistName');

				const cardGenresElement = document.createElement('div');
				cardGenresElement.innerHTML = genre;
				cardGenresElement.classList.add('cardArtistGenres');
				cardGenresElement.classList.add('cardPlaylistGenres');

				const deleteButtonElement = document.createElement('div');
                deleteButtonElement.classList.add('deleteArtist');
				deleteButtonElement.innerHTML = `
					<button id="deleteArtist${artistId}" data-track="${artistId}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort artist" title="Ta bort artist" /></button>
				`;
                
                // Append the elements to content-div
				cardWrapperElement.appendChild(cardArtistImgElement);
                cardContent.appendChild(cardArtistNameElement);
                
                if(artistBorn != 'NaN-NaN-NaN'){
                    cardArtistBornElement = document.createElement('div');
                    cardArtistBornElement.innerHTML = `Född: ${artistBorn}`;
                    cardArtistBornElement.classList.add('cardArtistBorn');
                
                    cardContent.appendChild(cardArtistBornElement);
                }
                
                cardContent.appendChild(cardGenresElement);
                cardContent.appendChild(deleteButtonElement);
                cardWrapperElement.appendChild(cardContent);
				contentElement.appendChild(cardWrapperElement);

                // Add event listener to delete button
				const deleteTrackButton = document.getElementById(`deleteArtist${artistId}`);
				deleteTrackButton.addEventListener('click', function(event){
					event.preventDefault();
					let artistId = this.dataset.track;
					Model.deleteArtist(artistId, artistName);
				});
			}
		},

		showPlaylists: function(data) {
			for(let i = 0; i < data.length; i++){
				View.displayCardPlaylist(data[i], 'notSorted');
			}
		},

		displayCardPlaylist: function(playlist, sortedOrNot){
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
			
			/* playlistRating is different depending on whether you enter this
			function from Toplist-button or search-field... */
            let playlistRating;
            
            if(sortedOrNot === 'allreadySorted'){
                playlistRating = playlist.ratings;
            }else if(sortedOrNot === 'notSorted'){
                let albumRatingsArray = playlist.ratings;
                
                if(albumRatingsArray.length === 0){
                    playlistRating = ' ';
                }else if(albumRatingsArray.length >= 1){
                    playlistRating = Controller.calculateAverageRating(albumRatingsArray);
                }

            }

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
				<button id="deletePlaylist${playlist._id}" data-track="${playlist._id}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort spellista" 
				title="Ta bort spellista"/></button>`

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
						<label for='playlistComment${playlist._id}'>Kommentera spellista:</label><b>
						<input type='text' name='playlistComment' 
						id='playlistComment${playlist._id}' class="playlistInput"><br>
						<label for='commentCreatedBy${playlist._id}'>Namn:</label><br>
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
					 <p>${comment.body}<span><button id="deleteComment${comment._id}" data-comment="${comment._id}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort kommentar" 
				title="Ta bort kommentar"/></button></span></p></div>`;
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
			for(let i = 0; i < albums.length; i++){

				if(albums[i].artists[0] && (albums[i].artists[0].name.substr(0,1) == letter || letter == 'noLetter')){
					let artistName = albums[i].artists[0].name
					let albumTitle = albums[i].title
					let albumId = albums[i]._id;
					let albumYear = albums[i].releaseDate;
					let albumCoverImage = albums[i].coverImage;
                    let genre = '';
                    let genresArray = albums[i].genres;
                    for(let i = 0; i < genresArray.length; i++){
                        genre += genresArray[i] + ' ';
                    }
					let albumRatingsArray = albums[i].ratings;
					let tracksArray = albums[i].tracks;
					let albumURL = albums[i].spotifyURL;
					let albumRating = Controller.calculateAverageRating(albumRatingsArray);
					
                    // Create elements and give them content
					const cardWrapperElement = document.createElement('div');
					cardWrapperElement.classList.add('cardWrapper');
					cardWrapperElement.id = `${albumId}`;

					const cardAlbumImgElement = document.createElement('div');
					cardAlbumImgElement.classList.add('cardAlbumImg');
                    
                    const cardContent = document.createElement('div');
                    cardContent.classList.add('cardContent');

					const cardArtistNameElement = document.createElement('h2');
					cardArtistNameElement.classList.add('cardArtistName');

					const cardAlbumTitleElement = document.createElement('div');
					cardAlbumTitleElement.classList.add('cardAlbumTitle');

                    const cardAlbumGenresElement = document.createElement('div');
                    cardAlbumGenresElement.classList.add('cardAlbumGenres');
                    cardAlbumGenresElement.classList.add('cardPlaylistGenres');
                    cardAlbumGenresElement.innerHTML = genre;
					
					const cardTrackListElement = document.createElement('div');
					cardTrackListElement.classList.add('cardTrackList');

					cardAlbumImgElement.innerHTML = `<img src="${albumCoverImage}">`;
					cardArtistNameElement.innerHTML = artistName;

					cardAlbumTitleElement.innerHTML = 
						`<a href="${albumURL}">${albumTitle}</a> (${albumYear})
                            <span class="trackOptions">
								<select id="rateAlbum${albumId}" data-track="${albumId}" class="rateAlbum">
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
							<img src="images/star.svg" alt="stars" class="ratingStar" /> ${albumRating} <button id="deleteAlbum${albumId}" data-track="${albumId}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort album" title="Ta bort album" /></button>
                        </span>`

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

								let trackRatingArray = singleTrackObject.ratings;

								let singleTrackRating;
								singleTrackRating = Controller.calculateAverageRating(trackRatingArray); 
							
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
											<img src="images/star.svg" alt="stars" class="ratingStar" /> ${singleTrackRating}
											<button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteButton"><img src="images/delete.svg" alt="Ta bort låt" title="Ta bort låt" /></button>
										</span>
									</div>
								`;

                                // Append the elements to content-div
								cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);

								cardWrapperElement.appendChild(cardAlbumImgElement);
                                cardContent.appendChild(cardArtistNameElement);
                                cardContent.appendChild(cardAlbumTitleElement);
								cardContent.appendChild(cardAlbumGenresElement);
								cardContent.appendChild(cardTrackListElement);
                                cardWrapperElement.appendChild(cardContent);
								contentElement.appendChild(cardWrapperElement);

								/***** Buttons/dropdowns with events *****/

								//Rate album 
								const rateAlbumDropdown = document.getElementById(`rateAlbum${albumId}`);
								rateAlbumDropdown.addEventListener('change', function(event){
									event.preventDefault();
									let albumId = this.dataset.track;
									let albumRating = this[this.selectedIndex].value;
									Model.rateAlbum(albumId, albumRating);
								});

								// Add track to playlist
								const addTrack = document.getElementById(`addTrackToPlaylist${trackId}`);
								addTrack.addEventListener('click', function(event){
									event.preventDefault();
									let trackId = this.dataset.track;
									Controller.addTrackToPlaylist(trackId);
								});

								// Delete track
								const deleteTrackButton = document.getElementById(`deleteTrack${trackId}`);
								deleteTrackButton.addEventListener('click', function(event){
									event.preventDefault();
									let trackId = this.dataset.track;
									Model.deleteTrack(trackId);
								});
								
								// Delete album
								const deleteAlbumButton = document.getElementById(`deleteAlbum${albumId}`);
								deleteAlbumButton.addEventListener('click', function(event){
									event.preventDefault();
									let albumId = this.dataset.track;
									Model.deleteAlbum(albumId);
								});

								//Rate track
								const rateTrackDropdown = document.getElementById(`rateTrack${trackId}`);
								rateTrackDropdown.addEventListener('change', function(event){
									event.preventDefault();
									let trackId = this.dataset.track;
									let trackRating = this[this.selectedIndex].value;
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
					<label for='newPlayListTitle'>Spellistans namn:</label><br>
					<input id='newPlayListTitle' required/><br>
					<label for='createdBy'>Skapad av:</label><br>
					<input id='createdBy' required/><br>
					<label for='newPlaylistGenres'>Genrer (separera med komma):</label><br>
					<input id='newPlaylistGenres'><br>
					<label for='newPlaylistImage'>Bildadress:</label><br>
					<input id='newPlaylistImage'><br>
					<button id='newPlaylistButton' type='submit' class='formButton'>Skapa spellista</button>
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
			choosePlaylistElement.style.display = 'block';

			let optionRow;
			optionRow =
			`<option class='optionClass'>Välj en spellista:</option>` 

			for(let i = 0; i < playlists.length; i++){
				let playlistId = playlists[i]._id;
				let playlistTitle = playlists[i].title;

				optionRow +=
				`<option value='${playlistId}' class='optionClass'>${playlistTitle}</option>` 
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
			  <label for='nameOfArtist'>Artistens eller bandets namn:</label><br>
			  <input type='text' name='nameOfArtist' id='nameOfArtist' required/>
			  <br>
			  <label for='bornDateArtist'>Född:</label><br>
			  <input type='text' name='born' id='bornDateArtist'><br>
			  <label for='genderOfArtist'>Genus:</label><br>
			  <select name='gender' id='genderOfArtist' class='selectGender'>
				  <option value='female'>Kvinna</option>
				  <option value='male'>Man</option>
				  <option value='other'>Annat</option>
			  </select><br>
			  <label for='genresOfArtist'>Genrer (separera med komma):</label><br>
			  <input type='text' name='genres' id='genresOfArtist'><br>
			  <label for='countryBornArtist'>Födelseland:</label><br>
			  <input type='text' name='countryBorn' id='countryBornArtist'><br>
			  <label for='spotifyURLOfArtist'>Spotify URL:</label><br>
			  <input type='text' name='spotifyURL' id='spotifyURLOfArtist'><br>
			  <label for='coverImageOfArtist'>Bildadress:</label><br>
			  <input type='text' name='coverImage' id='coverImageOfArtist'><br>
				<button id='artistFormButton' class='formButton'>Lägg till artist</button><br>
			</form>`;
			artistFormElement.innerHTML = artistForm;
			const artistFormButton = document.getElementById('artistFormButton');
			View.addEventListenerToButton(artistFormButton, Model.getElementsfromArtistForm);
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
			  <label for='titleOfAlbum'>Albumtitel:</label><br>
			  <input type='text' name='titleOfAlbum' id='titleOfAlbum'><br>
			  <label for='dateOfRelease'>Utgivningsdatum:</label><br>
			  <input type='text' name='dateOfRelease' id='dateOfRelease'><br>
			  <label for='genresOfAlbum'>Genrer (separera med komma):</label><br>
			  <input type='text' name='genresOfAlbum' id='genresOfAlbum'><br>
			  <label for='spotifyURLOfAlbum'>Spotify URL:</label><br>
			  <input type='text' name='spotifyURLOfAlbum' id='spotifyURLOfAlbum'><br>
			  <label for='coverImageOfAlbum'>Omslagsbild:</label><br>
			  <input type='text' name='coverImageOfAlbum' id='coverImageOfAlbum'><br>
			  <button id='albumFormButton' class='formButton'>Lägg till album</button>
				<br>
			</form>`;
			artistFormElement.innerHTML = albumForm;
			let albumFormButton = document.getElementById('albumFormButton');
			View.addEventListenerToButton(albumFormButton, Model.getElementsFromAlbumForm);
		},

		messageAlbumForm: function(album) {
			const message = `<p>Du la till ${album.title.toUpperCase()} till Musikinstitutet.<br> 
				För att lägga till en låt till ${album.title.toUpperCase()} använd formuläret nedan.</p>`;
			confirmationMessageArtist.innerHTML = message;
			View.displayTracksForm(album._id, album.artists, album.coverImage);
		},

		displayTracksForm: function(albumId, artistId, coverImage) {
			let tracksForm = `<form>
			   <label for='titleOfTrack'>Låttitel:</label><br>
			  <input type='text' name='titleOfTrack' id='titleOfTrack'>
			  <br>
			  <input type='hidden' id='artistId' value=${artistId}>
			  <input type='hidden' id='albumId' value=${albumId}>
			  <input type='hidden' id='coverImageOfAlbum' value=${coverImage}>
			  <label for='genresOfTrack'>Genrer (separerade med komma):</label><br>
			  <input type='text' name='genresOfTrack' id='genresOfTrack'>
			  <br>
			  <label for='coverImageColorOfTrack'>Omslagsfärg:</label><br>
			  <input type='text' name='coverImageColorOfTrack' id='coverImageColorOfTrack'>
			  <br>
			  <label for='spotifyURLOfTrack'>Spotify URL:</label><br>
			  <input type='text' name='spotifyURLOfTrack' id='spotifyURLOfTrack'> 
			  <br>
			  <label for='youtubeURLOfTrack'>Youtube URL:</label><br>
			  <input type='text' name='youtubeURLOfTrack' id='youtubeURLOfTrack'>
			  <br>
			  <label for='soundcloudURLOfTrack'>Soundcloud URL:</label><br>
			  <input type='text' name='soundcloudURLOfTrack' id='soundcloudURLOfTrack'><br>
			  <button id='tracksFormButton' class='formButton'>Lägg till låt</button>
			<br>
			</form>`;
			artistFormElement.innerHTML = tracksForm;
			let tracksFormButton = document.getElementById('tracksFormButton');
			View.addEventListenerToButton(tracksFormButton, Model.getElementsFromTracksForm);
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
		},
		
		deleteArtistFromDOM: function(artistId){
			const artistToDelete = document.getElementById(`${artistId}`);
			artistToDelete.parentNode.removeChild(artistToDelete);
		},
		
		showSpinner: function() {
			spinner.innerHTML = `
			  <div class='sk-fading-circle'>
			  <div class='sk-circle1 sk-circle'></div>
			  <div class=sk-circle2 sk-circle'></div>
			  <div class='sk-circle3 sk-circle'></div>
			  <div class='sk-circle4 sk-circle'></div>
			  <div class='sk-circle5 sk-circle'></div>
			  <div class='sk-circle6 sk-circle'></div>
			  <div class='sk-circle7 sk-circle'></div>
			  <div class='sk-circle8 sk-circle'></div>
			  <div class='sk-circle9 sk-circle'></div>
			  <div class='sk-circle10 sk-circle'></div>
			  <div class='sk-circle11 sk-circle'></div>
			  <div class='sk-circle12 sk-circle'></div>
			</div>`
		},
		
		stopSpinner: function() {
			spinner.innerHTML = '';
		}

		
	}
	
})();

View.initialize();