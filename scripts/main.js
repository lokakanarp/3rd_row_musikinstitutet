const searchButton = document.getElementById('search');
const options = document.getElementById('selectSearch').children;
const searchField = document.getElementById('searchField');

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    contentElement.innerHTML = '';
    getData();
});

function getData(){
    let searchWord = searchField.value;
    const artist = options[0];
    const track = options[1];
    const album = options[2];
    const playlist = options[3];
    
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
            console.log(data);
            displayCardTrack(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(album.selected == true){
        fetch(`https://folksa.ga/api/albums?key=flat_eric&title=${searchWord}&populateArtists=true`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            //displayAlbumCard(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(playlist.selected == true){
        fetch(`https://folksa.ga/api/playlists?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showPlaylists(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
}

function displayCardTrack(data){
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
        console.log(trackRating);
        
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
            rateTrack(trackId, trackRating);
        });
        
        // Delete track
        const deleteTrackButton = document.getElementById(`deleteTrack${trackId}`);
        deleteTrackButton.addEventListener('click', function(event){
            event.preventDefault();
            let trackId = this.dataset.track;
            deleteTrack(trackId);
        });
    }
}

function getAlbumImg(albumId){
    fetch(`https://folksa.ga/api/albums/${albumId}?key=flat_eric`)
    .then((response) => response.json())
    .then((album) => {
//        console.log(album)
//        console.log(album.coverImage);
    });
}

function displayCardArtist(data){
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
            deleteArtist(artistId, artistName);
        });
    }
}

function deleteArtist(artistId, artistName){
    const deleteConfirm = confirm(`Vill du verkligen ta bort ${artistName}?`);
    
    if(deleteConfirm){
        fetch(`https://folksa.ga/api/artists/${artistId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
        
        deleteArtistFromDOM(artistId);
    }
}

function deleteArtistFromDOM(artistId){
    const artistToDelete = document.getElementById(`${artistId}`);
    artistToDelete.parentNode.removeChild(artistToDelete);
}

function showPlaylists(data) {
	for(let i = 0; i < data.length; i++){
		displayCardPlaylist(data[i]);
	}
}

function displayCardPlaylist(playlist){
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
	

	let playlistRating = calculateAverageRating(playlist.ratings);
	
	
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
            deletePlaylist(playlistId);
            });
	
		//Rate playlist
        const ratePlaylistDropdown = document.getElementById(`ratePlaylist${playlist._id}`);
        ratePlaylistDropdown.addEventListener('change', function(event){
             event.preventDefault();
             let playlistId = this.dataset.track;
             let playlistRating = this[this.selectedIndex].value;
         	 ratePlaylist(playlistId, playlistRating);
             });
	
		for (let genre of playlist.genres) {
			cardPlaylistGenresElement.insertAdjacentHTML('beforeend', genre.toUpperCase() + " ");
		}
		cardCreatedByElement.innerHTML = `<h3>${playlist.createdBy}</h3>`;
		
		let tracklist = "";
        for(let i = 0; i < playlist.tracks.length; i++){
			//console.log(playlist);
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
			console.log("hallå");
			postComment(playlistComment.value, commentCreatedBy.value, this.dataset.id);
		});
		viewCommentsLink.addEventListener('click', function(event){
			event.preventDefault();
			getComments(this.dataset.id);
		})  
}

function postComment(input, createdBy, id) {
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
	
}
function getComments(id) {
	fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric&limit=1000`)
    .then((response) => response.json())
    .then((comments) => {
        console.log(comments);
		displayComments(comments, id);
    })
	.catch((error) => {
            console.log(error)
        });
}

function displayComments(comments, id) {
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
        deleteComment(this.dataset.comment);
        });
	}
}

function deletePlaylist(playlistId){
    const deleteConfirm = confirm("Vill du verkligen ta bort spellistan?");
    if(deleteConfirm){
        fetch(`https://folksa.ga/api/playlists/${playlistId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
        deletePlaylistFromDOM(playlistId);
    }
}

function deleteComment(commentId){
    const deleteConfirm = confirm("Vill du verkligen ta bort kommentaren?");
    if(deleteConfirm){
        fetch(`https://folksa.ga/api/comments/${commentId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
        deleteCommentFromDOM(commentId);
    }
}

function deleteCommentFromDOM(commentId){
    const commentToDelete = document.getElementById(commentId);
    commentToDelete.parentNode.removeChild(commentToDelete);
}

function deletePlaylistFromDOM(playlistId){
    const playlistToDelete = document.getElementById(playlistId);
    playlistToDelete.parentNode.removeChild(playlistToDelete);
}

///Navbar



function errorMessage(text){
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

}

 
  
	


