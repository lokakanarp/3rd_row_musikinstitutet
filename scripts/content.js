/******* DOM ELEMENTS ******/

const contentElement = document.getElementById('content');


addEventlistenersToAlphabet();

function addEventlistenersToAlphabet(){
let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
		for(let letter of alphabetLetters) {
			letter.addEventListener('click', function () {
                
                const letter = this.id;
                clearElement(contentElement);
                getAlbums(letter);
			})
		}
}

function getAlbums(letter){  
    fetch('https://folksa.ga/api/albums?key=flat_eric&populateArtists=true&limit=200')
      .then((response) => response.json())
      .then((albums) => {
      //console.log(albums);
        
            sortAlbums(albums,letter);
        
        /* viktiga att denna kalla på displayCard när jag har all info istället för när jag ahr en viss typ av info, 
        vill kalla på denna när jag redan har alla artister hämtade!!! */
        //displayCard(albums);     
    });
}

//let sortedObjectArray = [];


function sortAlbums(albums, letter){
    
    /*
    for(let i = 0; i < albums.length; i++){
        let oneAlbumObject = albums[i];
        sortedObjectArray.push(oneAlbumObject);
    }

    
    sortedObjectArray.sort((a,b) => {
        var nameA = a.artists[0] ?  a.artists[0].name : '';
        var nameB = b.artists[0] ?  b.artists[0].name : '';
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    })
    
    displayCard(sortedObjectArray, letter); 
    */
    
    
    albums.sort((a,b) => {
        var nameA = a.artists[0] ?  a.artists[0].name : '';
        var nameB = b.artists[0] ?  b.artists[0].name : '';
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    })

    
        displayCard(albums, letter); 
           
}



function getTrackInfo(trackId){
    return fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`)
  .then((response) => response.json())
  .then((singleTrack) => {
        

        //console.log(singleTrack);
        
        return singleTrack;

  });
}



function clearElement(element){
    element.innerHTML= '';   
}

 
function displayCard(albums,letter){
    

    for(let i = 0; i < albums.length; i++){
        
        if(albums[i].artists[0] && (albums[i].artists[0].name.substr(0,1) == letter)){
            let artistName = albums[i].artists[0].name
            let albumTitle = albums[i].title
            let albumId = albums[i]._id;
            let albumYear = albums[i].releaseDate;
            let albumCoverImage = albums[i].coverImage;
            let genresArray = albums[i].genres;
            let albumRatingsArray = albums[i].ratings;
            let tracksArray = albums[i].tracks;
            let albumURL = albums[i].spotifyURL;
        
            let averageAlbumRating = calculateAverageRating(albumRatingsArray);

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
    
        let albumRating = calculateAverageRating(albumRatingsArray);
    
        cardAlbumImgElement.innerHTML = `<img src="${albumCoverImage}">`;
        cardArtistNameElement.innerHTML = artistName;
    
        
        //cardAlbumTitleElement.innerHTML = albumTitle + ' (' + albumYear + ') ' + albumRating;
    
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

//            for(let i = 0; i < tracksArray.length; i++){
//                
//
//                
//                let tracklist = `
//                    <div id="${trackId}">
//                        <p><a href="${trackLink}">${tracksArray[i].title}</a></p>
//                        <span class="trackOptions">
//                            <button id="addTrackToPlaylist${trackId}" data-track="${trackId}" class="addTrackToPlaylist"><img src="images/plus.svg" alt="Add track to playlist" title="Add track to playlist" /></button>
//                            <select id="rateTrack${trackId}" data-track="${trackId}" class="rateTrack">
//                                <option value="1">1</option>
//                                <option value="2">2</option>
//                                <option value="3">3</option>
//                                <option value="4">4</option>
//                                <option value="5">5</option>
//                                <option value="6">6</option>
//                                <option value="7">7</option>
//                                <option value="8">8</option>
//                                <option value="9">9</option>
//                                <option value="10">10</option>
//                            </select>
//                            <img src="images/star.svg" alt="stars" class="ratingStar" /> ${singleTrackRating}
//                            <button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteButton"><img src="images/delete.svg" alt="Delete track" title="Delete track" /></button>
//                        </span>
//                    </div>
//                `;


            for(let i = 0; i < tracksArray.length; i++){
                let trackId = tracksArray[i];
                
                getTrackInfo(trackId).then((singleTrackObject) => {

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
                    
                    //console.log(trackRatingArray.length);

                    let singleTrackRating;
                    if(trackRatingArray.length >= 1){
                        singleTrackRating = calculateAverageRating(trackRatingArray); 
                    }else{
                         singleTrackRating = ''; 
                    }

                    // Check if there's a tracktitle, only write out if there is one (/not error):            
                    if(!(singleTrackObject.type == 'error')){
                        let tracklist = `
                            <div>
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
                            rateAlbum(albumId, albumRating);
                        });

                        // Add track to playlist
                        const addTrack = document.getElementById(`addTrackToPlaylist${trackId}`);
                        addTrack.addEventListener('click', function(event){
                            event.preventDefault();
                            //console.log(this);
                            //console.log(this.dataset.track);
                            let trackId = this.dataset.track;
                            // addTrackToPlaylist-function is to be found in playlist.js:
                            addTrackToPlaylist(trackId);
                        });

                        // Delete track
                        const deleteTrackButton = document.getElementById(`deleteTrack${trackId}`);
                        deleteTrackButton.addEventListener('click', function(event){
                            event.preventDefault();
                            //console.log(this);
                            //console.log(this.dataset.track);
                            let trackId = this.dataset.track;
                            // addTrackToPlaylist-function is to be found in playlist.js:
                            deleteTrack(trackId);
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
                            rateTrack(trackId, trackRating);
                        });
       
                    } // end looping out tracklist-relatied                   
                }); //end getting singleTrackObject .then()               
            } //end looping out trackId from tracksArray
        } //end if-statement that checks artistname starting letter
    } //looping through all albums from to get album info  
} //end displayCard



function deleteTrack(trackId){
    const deleteConfirm = confirm("Vill du verkligen ta bort låten?");
    
    if(deleteConfirm){
        fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
        
        deleteTrackFromDOM(trackId);
    }
}


function deleteTrackFromDOM(trackId){
    const trackToDelete = document.getElementById(`${trackId}`);
    console.log(trackToDelete.parentNode);
    trackToDelete.parentNode.removeChild(trackToDelete);
}

function deleteAlbum(albumId){
    const deleteConfirm = confirm("Vill du verkligen ta bort albumet? Albumets låtar kommer försvinna.");
    
    if(deleteConfirm){
        fetch(`https://folksa.ga/api/albums/${albumId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
        
        deleteAlbumFromDOM(albumId);
    }
}

function deleteAlbumFromDOM(albumId){
    const albumToDelete = document.getElementById(`${albumId}`);
    albumToDelete.parentNode.removeChild(albumToDelete);
}

