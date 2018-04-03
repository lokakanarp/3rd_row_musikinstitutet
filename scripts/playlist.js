

const newPlayListTitle = document.getElementById('newPlayListTitle');
const createdByInput = document.getElementById('createdBy');
const newPlaylistButton = document.getElementById('newPlaylistButton');

newPlaylistButton.addEventListener('click', function(event){
    event.preventDefault();
    
    console.log(newPlayListTitle.value);
    console.log(createdByInput.value);
    
    let title = newPlayListTitle.value;
    let createdBy = createdByInput.value;
    
    createPlaylist(title, createdBy);
});



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
        console.log(playlist);
      });
}

// min playlist-id: 5abfa9695e9531142f1da683



/* This function is pushing tracks to an array that that will be sent off to actual posting-function */
//var playlistArray = [];

var playlistTrack;

function addTrackToPlaylist(trackId){
//    console.log('in function: ', trackId);
    
    // välj vilken playlist du vill adda till.
    //funktion som hä,tar playlistnamn och dess id från api, så att man får välja
   
    
    
    playlistArray.push(trackId);
//    console.log(playlistArray);
    
    //skicka med id från playlist hömtat ovan i denna och gör url:en dynamisk
    postPlaylist();
    
    playlistTrack = '';
}

/* This function posts the playlist array to the API. Att göra: skicka med playlist-id som argument */
function postPlaylist(){
    //let tracks = playlistArray.toString();
    /* sätt in playlist-paramenter i url:en */
    fetch('https://folksa.ga/api/playlists/5abfa9695e9531142f1da683/tracks?key=flat_eric',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tracks: tracks })
      })
      .then((response) => response.json())
      .then((playlist) => {
        console.log(playlist);
      });
}




function getPlaylist(){

    fetch('https://folksa.ga/api/playlists?key=flat_eric')
      .then((response) => response.json())
      .then((playlists) => {
//        console.log(playlists);
        
        for(let i = 0; i < playlists.length; i++){
            console.log(playlists[i]._id);
            console.log(playlists[i].title);
        }
        
      });
    }


function chooseWhichPlaylistOutput(){
    
    // loopar ur en drop down meny med existerande playlists titlat så att man kan välja.
    // skickar med id till postPlaylist och placerar detta i url:en.
}
    