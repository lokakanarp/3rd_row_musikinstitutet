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
//        console.log(artists);
        
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
      .then((albums) => {
      console.log(albums);
        
        let albumTitle = albums.title;
        let albumYear = albums.releaseDate; 
        let albumCoverImage = albums.coverImage; 
//        console.log(albumCoverImage);
        let genresArray = albums.genres; 
        let tracksArray = albums.tracks;
//        console.log(tracksArray);


        
        displayCard(artistName, albumTitle, albumYear, albumCoverImage, genresArray, tracksArray);
        
        
    });
    
    
}

function getTrack(artistName, albumTitle, trackId){
    fetch(`https://folksa.ga/api/tracks?${trackId}&key=flat_eric`)
  .then((response) => response.json())
  .then((tracks) => {
        
//        console.log(tracks)
        
        let numberOfTracksOnAlbum = tracks.length;
//        console.log(numberOfTracksOnAlbum);
        
        for(let i = 0; i < numberOfTracksOnAlbum; i++){
//            console.log(tracks[i].title);
            
        
        }
      
  });
}



function displayCard(artistName, albumTitle, albumYear, albumCoverImage, genresArray, tracksArray){
    

//    if(isThereContentAlready){
//        content.innerHTML = '';
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
    
    
        cardAlbumImgElement.innerHTML = '<img src="albumCoverImage">';
        cardArtistNameElement.innerHTML = artistName;
        cardAlbumTitleElement.innerHTML = albumTitle + ' (' + albumYear + ')';
        cardAlbumGenresElement.innerHTML = genresArray[0];


            for(let i = 0; i < tracksArray.length; i++){
//                console.log(tracksArray[i].title); 
//                console.log(tracksArray[i]._id);
                
                let trackId = tracksArray[i]._id;
               
                let tracklist = `
                    <button id="addTrackToPlaylist${trackId}" data-track="${trackId}">Add to playlist</button>
                    ${i+1}. ${tracksArray[i].title}
                    <button id="deleteTrack${trackId}" data-track="${trackId}">Delete</button>
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
                    </select><br>
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
                
                /***** Buttons with events *****/
                
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
                const deleteTrack = document.getElementById(`deleteTrack${trackId}`);
                addTrack.addEventListener('click', function(event){
                    event.preventDefault();
                    //console.log(this);
                    //console.log(this.dataset.track);
                    let trackId = this.dataset.track;
                    // addTrackToPlaylist-function is to be found in playlist.js:
                    deleteTrack(trackId);
                });
                
                //Rate track
                const rateTrack = document.getElementById(`rateTrack${trackId}`);
                rateTrack.addEventListener('click', function(event){
                    event.preventDefault();
                    //console.log(this);
                    //console.log(this.dataset.track);
                    let trackId = this.dataset.track;
                    // addTrackToPlaylist-function is to be found in playlist.js:
                    rateTrack(trackId);
                });
                
                

            }
    
    
    isThereContentAlready = true;
     
}


