/*************************** DOM Elements ***********************************/

const newPlayListTitle = document.getElementById('newPlayListTitle');
const createdByInput = document.getElementById('createdBy');
const newPlaylistButton = document.getElementById('newPlaylistButton');
const choosePlaylistButton = document.getElementById('choosePlaylistButton');
const playlistSelection = document.getElementById('playlistSelection');


newPlaylistButton.addEventListener('click', function(event){
    event.preventDefault();
    
    let title = newPlayListTitle.value;
    let createdBy = createdByInput.value;
    
    createPlaylist(title, createdBy);
});

/*************************** Create playlist functions ***********************************/

function createPlaylist(title, createdBy){

    let playlist = {
        title: title,
    //    genres: "Folk, Folk Rock",
        createdBy: createdBy
    //    tracks: "5aae2d13b9791d0344d8f717,5aae2e6fb9791d0344d8f71c",
    //    coverImage: "https://www.internetmuseum.se/wordpress/wp-content/uploads/compisknappar-504x329.jpg",
    //    coverImageColor: "#000"
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
        //console.log(playlist);
        // Some output that the playlist has been succsessfully created here?
        
      });
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
      });
    
    // Clearing and preparing array for next input:
     playlistTrack = ''; 
}


function createDropdown(playlists){
    const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.classList.add('choosePlaylist');

    const playlistSelectionElement = document.getElementById('playlistSelection');
    choosePlaylistElement.style.display = "block";
    
    let optionRow;
    
    for(let i = 0; i < playlists.length; i++){
//        console.log('id i loop: ', playlists[i]._id);
//        console.log('creator i loop: ', playlists[i].createdBy);
        let playlistId = playlists[i]._id;
        let playlistTitle = playlists[i].title;
        
        optionRow +=
        `<option value="${playlistId}" class="optionClass">${playlistTitle}</option>`  
    }
    
    let dropdown = `
        ${optionRow};
    `;
    
    playlistSelectionElement.insertAdjacentHTML('beforeend', dropdown);
}

/* BUG THAT NEEDS TO BE FIXED:
/* This eventListener below does NOT work. 
/* Why? Because it seems to select the entire selection-element, 
/* and therefore the default option on top is ALWAYS picked as (this.value)
/* when you click on it once just to open the menu :( 
/* All tracks are atm (!) added to playlist "Girls Rock!" because it first in the list.
*/
playlistSelection.addEventListener('click', function (){
    // gets playlist id:
    console.log('id i eventlistener: ', this.value);

    let playlistId = this.value;
    
    postToPlaylist(playlistId);
    
})





// min playlist-id: 5abfa9695e9531142f1da683
    