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
//var isThereContentAlready;

function handlingAlphabeticalMenuClick(letter){
    if(!(avoidClickingSameLetterTwiceInMenu == letter)){
        
            getAlbums(letter);
            //getArtist(letter);
            /* Saves first letter of artist in variable to compare next time to avoid duplicate output: */
            avoidClickingSameLetterTwiceInMenu = letter;
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


let sortedObjectArray = [];

function sortAlbums(albums, letter){
    
    
    for(let i = 0; i < albums.length; i++){
        let oneAlbumObject = albums[i];
        //console.log(albums[i]);
        
        sortedObjectArray.push(oneAlbumObject);
        
        //console.log(albums[i].artists[0].name);
        //let artistName = albums[i].artists[0].name; 
    }
    
    //console.log(sortedObjectArray);
    sortedObjectArray.sort((a,b) => {
        var nameA = a.artists[0] ?  a.artists[0].name : '';
        var nameB = b.artists[0] ?  b.artists[0].name : '';
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    })
    
    //for(let i = 0; i < sortedObjectArray.length; i++){
        
        //sortArtistsAlhabetically(sortedObjectArray);
        //console.log(sortedObjectArray.map(obj => obj.artists[0] ? obj.artists[0].name : ''));
    
    
//    for(let i = 0; i < sortedObjectArray.length; i++){
//        console.log(sortedObjectArray);
//    }
    
        displayCard(sortedObjectArray, letter); 
            
    //}
    
    
    
}




//function getArtist(letter){
//    fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=200')
//      .then((response) => response.json())
//      .then((artists) => {
////        console.log(artists);
//        
//    if(isThereContentAlready){
//        content.innerHTML = '';
//    }
//
//            let artistObjectArray = [];
//
//            for(let i = 0; i < artists.length; i++){
//                
//                let artistId = artists[i]._id;
//                let artistName = artists[i].name;
//                let albumsArray = artists[i].albums;
//                
//                /* Only save those which begins with the letter clicked upon in alphabet-menu in DOM (letter parameter) */
//                if(artistName.substr(0,1) == letter){
//                  
//                /* Saving artistinfo and albums id-array as objects in array to sort that array 
//                in alphabetical order on it's property artistName */ 
//                artistObjectArray.push({artistName, artistId, albumsArray });                    
//                sortArtistsAlhabetically(artistObjectArray); //Sorterar enligt bokstavordning på artistnamn. Verkar funka?
//                    
//                // console.log('sorterat objekt:', artistObjectArray); // se denna log: artister i bokstavsordning.
//                    
//                }   
//            }
//                            
//            for(let i = 0; i < artistObjectArray.length; i++){
//                
//                // console.log('objekt i loop 2:', artistObjectArray); // objekt fortf i bokstavsordning enligt artistnamn
//                
//                let artistNameFromObjArray = artistObjectArray[i].artistName;
//                
//                // console.log('artistnamn i loop 2: ', artistName2); // artistnamn loopas ut i bokstavsordning
//
//                let singleArtistAlbumsArray =  artistObjectArray[i].albumsArray;
//                
//               //  console.log('enskild artists album: ', singleArtistAlbumsArray); 
//                
//                // eftersom jag har en enskild artists album i denna array borde de rimligtvis loopas ut i klump i DOMen???
//                for(let j = 0; j < singleArtistAlbumsArray.length; j++){
//                    let albumId = singleArtistAlbumsArray[j];
//                    console.log(albumId);
//                    
//                    getAlbum(artistNameFromObjArray, albumId);
//                }
//            }
//                    
//                    
//                    
//                    /* FUNKAR MEN EJ I BOKSTAVORDNIGN:
//                    for(let i = 0; i < albumsArray.length; i++){
//                        let albumId = albumsArray[i];
//
//                        getAlbum(artistName, albumId);
//
//                    }
//                    
//                    
//
//                }   
//            }    
//            */ 
//
//      });
//}



//
//function sortArtistsAlhabetically(objArray){ 
//
//        for(let i = 0; i < objArray.length; i++){
//            //if(objArray[i].artists[0].name){
//            if(objArray[i].artists[0]){
//                //console.log(objArray[i].artists[0].name);
//
//                objArray.sort(function(a, b) {
//            //    var textA = a.artistName.toUpperCase();
//            //    var textB = b.artistName.toUpperCase();
//    
//                var textA = a.artists[0] ? a.artists[0].name : '';   
//                var textB = b.artists[0] ? b.artists[0].name : '';
//
//                    
////                console.log(textA);
////                console.log(textB);
//                    //(textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//            
//                return textB > textA;
//            
//                    
////                let hej= (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
////                    
////                console.log(hej);
//                }); 
//            }
//        }
//}


//function getAlbum(artistName, albumId){
//    fetch('https://folksa.ga/api/albums/' + albumId + '?key=flat_eric')
//      .then((response) => response.json())
//      .then((album) => {
//  //    console.log(albums);
//        
//        /* viktiga att denna kalla på displayCard när jag har all info istället för när jag ahr en viss typ av info, 
//        vill kalla på denna när jag redan har alla artister hämtade!!! */
//        displayCard(artistName, album);
//        
//        
//    });
//    
//    
//}

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

function clearElement(element){
    element.innerHTML= '';   
}

 
function displayCard(albums,letter){

    
    clearElement(contentElement);

    

    
    for(let i = 0; i < albums.length; i++){
        
        //console.log(albums[i]);
        
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
        
            console.log(artistName);
            console.log(albumTitle);
            console.log(albumId);
            console.log(albumYear);
            console.log(albumCoverImage);
            console.log(genresArray);
            console.log(albumRatingsArray);
            console.log(tracksArray);
            console.log(albumURL);

    



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
                    <select id="rateAlbum${albumId}" data-track="${albumId}">
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
                ${albumRating};`
    
        cardAlbumGenresElement.innerHTML = genresArray[0];


            for(let i = 0; i < tracksArray.length; i++){
                
                let trackId = tracksArray[i]._id;
                let trackRatingArray = tracksArray[i].ratings;
                let singleTrackRating = '' /* calculateAverageRating(trackRatingArray) */;
                let trackLink = getTrackURL(trackId);
                
                let tracklist = `
                    <div>
                        <p><a href="${trackLink}">${tracksArray[i].title}</a></p>
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
                            <img src="images/star.svg" alt="stars" /> ${singleTrackRating}
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
    

    
    
    //isThereContentAlready = true;
    

    

        }
    }
    
     
}

function deleteTrack(trackId){
    fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`,{
			method: 'DELETE'
		  })
		  .then((response) => response.json())
		  .then((track) => {
			console.log(track);
			//displayAlbumForm(artist._id);
		  })
}



    

