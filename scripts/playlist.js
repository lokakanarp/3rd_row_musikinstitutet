
//The link in navbar:
const displayPlaylistFormLink = document.getElementById('displayPlaylistFormLink');
displayPlaylistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	headingForms.innerHTML = `<h2>Skapa en ny spellista</h2>`;
	displayPlaylistForm();
})

function displayPlaylistForm() {
	const playlistForm = `
		<form>
			Spellistans namn:<br>
			<input id="newPlayListTitle" required/><br>
			Skapad av:<br>
			<input id="createdBy" required/><br>
			Genrer (separera med komma):<br>
			<input id="newPlaylistGenres"><br>
			Bildadress:<br>
			<input id="newPlaylistImage"><br>
			<button id="newPlaylistButton" type="submit" class='formButton'>Skapa spellista</button>
		</form>`;
	artistFormElement.innerHTML = playlistForm;	
	const newPlaylistButton = document.getElementById('newPlaylistButton');
	newPlaylistButton.addEventListener('click', function(event){
    	event.preventDefault();
		getElementsFromPlaylistForm();
	})
}

function getElementsFromPlaylistForm() {
	const newPlayListTitle = document.getElementById('newPlayListTitle');
	const createdByInput = document.getElementById('createdBy');
	const newPlaylistGenres = document.getElementById('newPlaylistGenres');
	const newPlaylistImage = document.getElementById('newPlaylistImage');
	const title = newPlayListTitle.value;
    const createdBy = createdByInput.value;
	const coverImage = newPlaylistImage.value
	const genres = newPlaylistGenres.value;
	
    createPlaylist(title, createdBy, coverImage, genres);

}

function createPlaylist(title, createdBy, coverImage, genres){

    let playlist = {
        title: title,
    	genres: genres,
        createdBy: createdBy,
		coverImage: coverImage
    }

    fetch('https://folksa.ga/api/playlists?key=flat_eric',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
      })
      .then((response) => response.json())
      .then((playlist) => {
      console.log(playlist);
	  messagPlaylistForm(playlist); 
      });
}

function messagPlaylistForm(playlist) {
	const message = `<p>Du la till spellistan ${playlist.title.toUpperCase()} till Musikinstitutet.<br> 
	För att lägga till låtar till din spellista leta upp önskad låt med hjälp av sökfunktionen eller A-Ö-menyn. Klicka på plustecknet 
	bredvid låttitlarna och välj spellista ur menyn.</p>`
	artistFormElement.innerHTML = message;
}



/*************************** Add track to playlist functions ***********************************/

// Array that holds the track you're currently adding:
var playlistTrack = [];


function addTrackToPlaylist(trackId){
    // Saving track id to array:
    playlistTrack.push(trackId);
    // Fetching existing playlist so that user can choose which playlist they want to add track to:
    getExistingPlaylists();
}

function getExistingPlaylists(){
    fetch('https://folksa.ga/api/playlists?key=flat_eric')
      .then((response) => response.json())
      .then((playlists) => {
        // Pushing info about existing playlists forward to functions that displays them in a drop down-menu in DOM:
        createDropdown(playlists); 
      });
}

function postToPlaylist(playlistId){
    // Make a string out of the track-array:
    let tracks = playlistTrack.toString();
    
    fetch(`https://folksa.ga/api/playlists/${playlistId}/tracks?key=flat_eric`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tracks: tracks })
      })
      .then((response) => response.json())
      .then((playlist) => {
        console.log('this is the playlist: ', playlist);
        
        // THIS SHOULD NOT BE NECESSARY ANYMORE since solved in a much better way. Just keep "playlistTrack = '';"?
        /* Weird bugsolving regarding double clicks in option-eventlisterners,
        /* If this returns Error, means that user have just clicked "Choose one",
        /* and the playListTrack must only been cleard once the track has been 
        /* added to choosen list, when the user has clicked eventListener TWICE:
        */
        if(playlist.type != "Error"){
            // Clearing and preparing array for next input:
            playlistTrack = '';    
        }
      });

}


function createDropdown(playlists){
    const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.classList.add('choosePlaylist');

    const playlistSelectionElement = document.getElementById('playlistSelection');
    choosePlaylistElement.style.display = "block";
    
    let optionRow;
    
    optionRow =
    `<option class="optionClass">Choose one</option>` 
    
    for(let i = 0; i < playlists.length; i++){
//        console.log('id i loop: ', playlists[i]._id);
//        console.log('creator i loop: ', playlists[i].createdBy);
        let playlistId = playlists[i]._id;
        let playlistTitle = playlists[i].title;
        
        optionRow +=
        `<option value="${playlistId}" class="optionClass">${playlistTitle}</option>` 
    }
    
    playlistSelectionElement.insertAdjacentHTML('beforeend', optionRow);
}


playlistSelection.addEventListener('change', function (){
    event.preventDefault();

    let playlistId = this[this.selectedIndex].value;
    
    postToPlaylist(playlistId);
})


// min playlist-id: 5abfa9695e9531142f1da683


/*************************** Top playlists ***********************************/

const showToplistButton = document.getElementById('showToplistButton');

showToplistButton.addEventListener('click', function(event){
    event.preventDefault();
    getTopPlaylists();
});
    
function getTopPlaylists(){
    fetch('https://folksa.ga/api/playlists?key=flat_eric')
      .then((response) => response.json())
      .then((playlists) => {
        sortTopFive(playlists); 
      });
}

let toplistArray = [];
function sortTopFive(playlists){
    
    for(i = 0; i < playlists.length; i++){
        console.log(playlists[i]);
        let playlistId = playlists[i]._id;
        let ratingsArray = playlists[i].ratings;
        let averageToplistRating = calculateAverageRating(ratingsArray);
        //console.log(calculateAverageRating(ratingsArray));
        toplistArray.push({ playlistId, averageToplistRating });
        
    }
    //console.log(toplistArray);
    
    tryToSort(toplistArray); 
    
}


function tryToSort(topListArray){
    
    toplistArray.sort((a,b) => {
        var nameA = a.averageToplistRating ?  a.averageToplistRating : '';
        var nameB = b.averageToplistRating ?  b.averageToplistRating : '';
        return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
    })
        
    
    console.log(toplistArray);
    
    for(let i = 0; i < 5; i++){
        console.log(toplistArray[i].averageToplistRating); //här loopas de ut i ordning
        let playlistId = toplistArray[i].playlistId;
        console.log(playlistId);
        
        getSpecificPlaylist(playlistId);
        
//        getSpecificPlaylist(playlistId).then((playlist) => {
//            console.log(playlist);
//             //displayCardPlaylist(playlist);
//            });
    }
    
}



function getSpecificPlaylist(playlistId){
    fetch(`https://folksa.ga/api/playlists/${playlistId}?key=flat_eric`)
    .then((response) => response.json())
    .then((playlist) => {
        //console.log(playlist);
        //return playlist;
        displayCardPlaylist(playlist);
    });
}