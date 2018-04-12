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
        fetch(`https://folksa.ga/api/artists?key=flat_eric&name=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(track.selected == true){
        fetch(`https://folksa.ga/api/tracks?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(album.selected == true){
        fetch(`https://folksa.ga/api/albums?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
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

function showSearchResult(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].name){
            let artistCoverImage = data[i].coverImage;
            let artistName = data[i].name;
            let artistBorn = data[i].born;
            let artistId = data[i]._id;
            let genresArray = data[i].genres;

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
            cardGenresElement.innerHTML = genresArray[0];
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
                    deleteArtist(artistId);
                });
        }else{
            const searchResult = data[i].title;
           searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }
    }
}

function deleteArtist(artistId){
    const deleteConfirm = confirm("Vill du verkligen ta bort artisten?");
    
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
	
	cardPlaylistTitleElement.innerHTML = playlist.title
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
         <img src="images/star.svg" alt="stars" class="ratingStar" /> 
playlistRating
<button id="deletePlaylist${playlist._id}" data-track="${playlist._id}" class="deleteButton"><img src="images/delete.svg" alt="Delete playlist" title="Delete playlist" /></button>`
	
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
			console.log(playlist);
	 		tracklist = `${i+1}. ${playlist.tracks[i].title} by ${playlist.tracks[i].artists[0].name}<br>`;
			
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
			<div id='viewCommentsLink${playlist._id}' data-id='${playlist._id}'>
				<p><span class="font-weight">Se kommentarer</span><p>
			</div>`
      
	
		let playlistComment = document.getElementById(`playlistComment${playlist._id}`);
		let commentCreatedBy = document.getElementById(`commentCreatedBy${playlist._id}`);
		let addCommentButton = document.getElementById(`addCommentButton${playlist._id}`);
		let viewCommentsLink = document.getElementById(`viewCommentsLink${playlist._id}`);
		addCommentButton.addEventListener('click', function(){
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
  });
	
}
function getComments(id) {
	fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric&limit=1000`)
    .then((response) => response.json())
    .then((comments) => {
        console.log(comments);
		displayComments(comments, id);
    });
}

function displayComments(comments, id) {
	let commentList = "";
	for (let comment of comments){
		commentList += 
			`<div class='singleComment'><h4>${comment.username.toUpperCase()}:</h4>
			 <p>${comment.body}</p></div>`
	}
	let cardCommentElement = document.getElementById(`cardComment${id}`);
	cardCommentElement.innerHTML = commentList;
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

function deletePlaylistFromDOM(playlistId){
    const playlistToDelete = document.getElementById(playlistId);
    playlistToDelete.parentNode.removeChild(playlistToDelete);
}



 
  
	


