function displayCardPlaylist(playlist){
 
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
    
    
        cardPlaylistTitleElement.innerHTML = playlist.title;
		for (let genre of playlist.genres) {
			cardPlaylistGenresElement.insertAdjacentHTML('beforeend', `${genre} `);
		}
		cardCreatedByElement.innerHTML = playlist.createdBy;
		//cardMenuElement.innerHTML = Väntar med denna
		
        //cardAlbumGenresElement.innerHTML = genresArray[0];
		
		
			let tracklist = "";
            for(let i = 0; i < playlist.tracks.length; i++){
               //console.log(playlist.tracks[i].title); 
               tracklist += `${i+1}. ${playlist.tracks[i].title} by ${playlist.tracks[i].artists[0].name}<br>`;
			}
            cardTrackListElement.insertAdjacentHTML('beforeend', tracklist);
                
                cardWrapperElement.appendChild(cardPlaylistTitleElement);
                cardWrapperElement.appendChild(cardPlaylistGenresElement);
                cardWrapperElement.appendChild(cardCreatedByElement);
                cardWrapperElement.appendChild(cardMenuElement);
                cardWrapperElement.appendChild(cardTrackListElement);
				cardWrapperElement.appendChild(cardCommentElement);
                contentElement.appendChild(cardWrapperElement);
                
    isThereContentAlready = true;
     
}

