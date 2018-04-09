const searchButton = document.getElementById('search');
const options = document.getElementById('selectSearch').children;
const searchField = document.getElementById('searchField');
const searchResultOutput = document.getElementById('searchResult');

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    searchResultOutput.innerHTML = '';
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
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });

    }
}

function showSearchResult(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].name){
            const searchResult = data[i].name;
            searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }else{
			let playlist = data[i];
			displayCardPlaylist(playlist);
            //const searchResult = data[i].title;
           // searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }
    }
}

function displayCardPlaylist(playlist){
 		console.log(playlist);
        const cardWrapperElement = document.createElement('div');
        cardWrapperElement.classList.add('cardWrapper');
        const cardPlaylistTitleElement = document.createElement('div');
        cardPlaylistTitleElement.classList.add('cardPlaylistTitle');
        const cardPlaylistGenresElement = document.createElement('div');
        cardPlaylistGenresElement.classList.add('cardPlaylistGenres');
		const cardCreatedByElement = document.createElement('div');
        cardCreatedByElement.classList.add('cardCreatedBy');
		const cardMenuElement = document.createElement('div');
		cardMenuElement.classList.add('cardMenuElement');
        const cardTrackListElement = document.createElement('div');
        cardTrackListElement.classList.add('cardTrackList');
		const cardCommentElement = document.createElement('div');
		cardCommentElement.classList.add('cardComment');
		cardCommentElement.id = `cardComment${playlist._id}`;
    	
        cardPlaylistTitleElement.innerHTML = playlist.title;
		for (let genre of playlist.genres) {
			cardPlaylistGenresElement.insertAdjacentHTML('beforeend', `${genre} `);
		}
		cardCreatedByElement.innerHTML = playlist.createdBy;
		
		//cardMenuElement.innerHTML = Väntar med denna
		
		let tracklist = "";
        for(let i = 0; i < playlist.tracks.length; i++){
             //console.log(playlist.tracks[i].title); 
             tracklist += `${i+1}. ${playlist.tracks[i].title} by ${playlist.tracks[i].artists[0].name}<br>`;
			}
         cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);
		 cardCommentElement.innerHTML = `
					<p>Comment on playlist:</p>
					<input type='text' name='playlistComment' 
					id='playlistComment${playlist._id}'><br>
					<p>Name:</p>
					<input type='text'name='commentCreatedBy' id='commentCreatedBy${playlist._id}'><br>
					<button id='addCommentButton${playlist._id}' 
					class='addCommentButton' 
					data-id='${playlist._id}'>add comment</button>
					<div id='viewCommentsLink${playlist._id}' data-id='${playlist._id}'><p>View comments</p></div>`
                
         cardWrapperElement.appendChild(cardPlaylistTitleElement);
         cardWrapperElement.appendChild(cardPlaylistGenresElement);
         cardWrapperElement.appendChild(cardCreatedByElement);
         cardWrapperElement.appendChild(cardMenuElement);
         cardWrapperElement.appendChild(cardTrackListElement);
	     cardWrapperElement.appendChild(cardCommentElement);
         contentElement.appendChild(cardWrapperElement);
	
		let playlistComment = document.getElementById(`playlistComment${playlist._id}`);
		let commentCreatedBy = document.getElementById(`commentCreatedBy${playlist._id}`);
		let addCommentButton = document.getElementById(`addCommentButton${playlist._id}`);
		let viewCommentsLink = document.getElementById(`viewCommentsLink${playlist._id}`);
		addCommentButton.addEventListener('click', function(){
			//console.log("hej");
			postComment(playlistComment.value, commentCreatedBy.value, this.dataset.id);
		});
		viewCommentsLink.addEventListener('click', function(event){
			event.preventDefault();
			getComments(this.dataset.id);
		})
	
		 
    //isThereContentAlready = true;
	
     
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
	fetch(`https://folksa.ga/api/playlists/${id}/comments?key=flat_eric`)
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
			`<h3>${comment.username}</h3>
			 <p>${comment.body}</p>`
	}
	let cardCommentElement = document.getElementById(`cardComment${id}`);
	cardCommentElement.insertAdjacentHTML('beforeend', commentList);
}

 
  
	


