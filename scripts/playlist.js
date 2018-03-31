const addTrackToPlaylistButton = document.getElementById('addTrackToPlaylist');

addTrackToPlaylistButton.addEventListener('click', function(event){
    event.preventDefault();
    
    console.log(this.dataset.trackId);
});