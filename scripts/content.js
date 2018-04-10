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



function getTrackURL(trackId){
    fetch(`https://folksa.ga/api/tracks/${trackId}?key=flat_eric`)
  .then((response) => response.json())
  .then((singleTrack) => {
        
        
//        if(singleTrack.spotifyURL != ""){
//            return singleTrack.spotifyURL;
//        }else if(singleTrack.youtubeURL != ""){
//            return singleTrack.youtubeURL;
//        }else if(singleTrack.soundcloudURL != ""){
//            return singleTrack.soundcloudURL;
//        }
//        

        console.log("hej");
  });
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
        
//            console.log(artistName);
//            console.log(albumTitle);
//            console.log(albumId);
//            console.log(albumYear);
//            console.log(albumCoverImage);
//            console.log(genresArray);
//            console.log(albumRatingsArray);
//            console.log(tracksArray);
//            console.log(albumURL);

    



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
                //console.log(tracksArray);
                //console.log(tracksArray[i]);
                //let trackId = tracksArray[i]._id;
                
                let trackId = tracksArray[i];
                //console.log(trackId);
                
                
                //let trackRatingArray = tracksArray[i].ratings;
                //let singleTrackRating = '' /* calculateAverageRating(trackRatingArray) */;
                //let trackLink = getTrackURL(trackId);
                //console.log(trackLink);
                
                //let trackLink = getTrackURL(trackId);
                
              getTrackInfo(trackId).then((singleTrackObject) => {
   
                console.log(singleTrackObject);
                  
                  //console.log(singleTrackObject.title);
                  
                  let trackTitle = singleTrackObject.title;
                  
                  let trackLink;
                  if(!(singleTrackObject.spotifyURL == '')){
                    trackLink = singleTrackObject.spotifyURL;
                  }else if(!(singleTrackObject.youtubeURL == '')){
                      trackLink = singleTrackObject.youtubeURL; 
                  }else if(!(singleTrackObject.souncloudURL == '')){
                        trackLink = singleTrackObject.soundcloudURL;    
                    }else{
                        trackLink = ''; //ändra här kanske??
                    }

                  
                  
                // Check if there's a tracktitle, only write out if there is one:            
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
                            <img src="images/star.svg" alt="stars" /> singletrackratingvariabel här 
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
} // end 
                
                });
                
            }
    

    

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



    

