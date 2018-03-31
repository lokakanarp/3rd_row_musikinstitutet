

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



var playlistArray = [];


function addTrackToPlaylist(trackId){
    console.log('in function: ', trackId);
    
    playlistArray.push(trackId);
    console.log(playlistArray);
    
    let tracks = playlistArray.toString();
    
    
    //let tracks = "5aae2d13b9791d0344d8f717,5aae2e6fb9791d0344d8f71c",

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