/******* DOM ELEMENTS ******/

const contentElement = document.getElementById('content');


addEventlistenersToAlphabet();

function addEventlistenersToAlphabet(){
let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
		for(let letter of alphabetLetters) {
			letter.addEventListener('click', function () {
				const specificLetter = this.id;
                //console.log(this.id);
                handlingAlphabeticalMenuClick(specificLetter);
			})
		}
}



/* byta ut avoidClickingSameLetterTwiceInMenu mot en funtion i eventListerner som tömmer elementet kanske är normalare...
Å andra sidan innebär det att innehållet måste laddas om, vilket är dumt? */

var avoidClickingSameLetterTwiceInMenu;
var isThereContentAlready;

function handlingAlphabeticalMenuClick(letter){
    if(!(avoidClickingSameLetterTwiceInMenu == letter)){
            getArtist(letter);
            /* Saves first letter of artist in variable to compare next time to avoid duplicate output: */
            avoidClickingSameLetterTwiceInMenu = letter;
    }       
}



function getArtist(letter){
    fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=200')
      .then((response) => response.json())
      .then((artists) => {
        console.log(artists);
        
    if(isThereContentAlready){
        content.innerHTML = '';
    }

            for(let i = 0; i < artists.length; i++){
                let artistId = artists[i]._id;
                let artistName = artists[i].name;
//                console.log(artistName);
                let albumsArray = artists[i].albums;
                
                if(artistName.substr(0,1) == letter){ // nytt test
                    
                    for(let i = 0; i < albumsArray.length; i++){
                        let albumId = albumsArray[i];

                        getAlbum(artistName, albumId);

                    }
                    
                } //end nytt test
                

                
            }
      });
}


function getAlbum(artistName, albumId){
    fetch('https://folksa.ga/api/albums/' + albumId + '?key=flat_eric')
      .then((response) => response.json())
      .then((album) => {
  //    console.log(albums);
        
        displayCard(artistName, album);
        
        
    });
    
    
}

function getTrackURL(trackId){
    fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`)
  .then((response) => response.json())
  .then((singleTrack) => {
        

        if(singleTrack.spotifyURL != ""){
            return singleTrack.spotifyURL;
        }else if(singleTrack.youtubeURL != ""){
            return singleTrack.youtubeURL;
        }else if(singleTrack.soundcloudURL != ""){
            return singleTrack.soundcloudURL;
        }
        
//        let numberOfTracksOnAlbum = tracks.length;
////        console.log(numberOfTracksOnAlbum);
//        
//        for(let i = 0; i < numberOfTracksOnAlbum; i++){
////            console.log(tracks[i].title);
//            
//        
//        }
        
      //  return singleTrack;
      
  });
}


 
function displayCard(artistName, album){
        let albumTitle = album.title;
        let albumId = album._id;
        let albumYear = album.releaseDate;
        let albumCoverImage = album.coverImage;
        let genresArray = album.genres;
        let albumRatingsArray = album.ratings;
        let tracksArray = album.tracks;
        let albumURL = album.spotifyURL;
    
      
        console.log(artistName);
        console.log(albumTitle);
        console.log(albumId);
        console.log(albumYear);
        console.log(albumCoverImage);
        console.log(genresArray);
        console.log(albumRatingsArray);
        console.log(tracksArray);
        console.log(albumURL);

// if-sats, kanske behövs användas ngnstans?
//    for(let i = 0; 0 < album.artists.length; i++){
//        if(album.artists[i]){
//            let artistName = album.artists[i].name;
//            console.log(artistName);
//        }
//    }
    

        


        const cardWrapperElement = document.createElement('div');
        cardWrapperElement.classList.add('cardWrapper');

        const cardAlbumImgElement = document.createElement('div');
        cardAlbumImgElement.classList.add('cardAlbumImg');
    
        const cardArtistNameElement = document.createElement('div');
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
                <img src="images/star.svg" alt="stars" class="ratingStar" /> ${albumRating}`
    
        cardAlbumGenresElement.innerHTML = genresArray[0];


            for(let i = 0; i < tracksArray.length; i++){
//                console.log(tracksArray[i].title); 
//                console.log(tracksArray[i]._id);
                //console.log(tracksArray[i].genres);
                
                //console.log(tracksArray[i].ratings);
                
                let trackId = tracksArray[i]._id;
                let trackRatingArray = tracksArray[i].ratings;
                let singleTrackRating = calculateAverageRating(trackRatingArray);
                
               // console.log(trackId);
                //let singleTrackObject = getTrack(trackId);
                //console.log(singleTrackObject); 
                
                let trackLink = getTrackURL(trackId);
               // console.log(trackLink);
                
               
                let tracklist = `
                    <div id="${trackId}">
                        <p><a href="${trackLink}">${tracksArray[i].title}</a></p>
                        <span class="trackOptions">
                            <button id="addTrackToPlaylist${trackId}" data-track="${trackId}" class="addTrackToPlaylist"><img src="images/plus.svg" alt="Add track to playlist" title="Add track to playlist" /></button>
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
                            <img src="images/star.svg" alt="stars" class="ratingStar" /> ${singleTrackRating}
                            <button id="deleteTrack${trackId}" data-track="${trackId}" class="deleteTrack"><img src="images/delete.svg" alt="Delete track" title="Delete track" /></button>
                        </span>
                    </div>
                `;
                
                //sedan ta typ this.data-id när man skapar eventlistener och skickar vidare som argument till add-funktion???
                //activateAddFunction(trackId);
                
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
                
                

            }
    
    
    isThereContentAlready = true;
     
}

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
    trackToDelete.parentNode.removeChild(trackToDelete);
}


    

