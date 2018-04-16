//The link in navbar:
const displayPlaylistFormLink = document.getElementById('displayPlaylistFormLink');
displayPlaylistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	displayPlaylistForm();
})



playlistSelection.addEventListener('change', function (){
    event.preventDefault();
    const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.style.display = "none";
    
    let playlistId = this[this.selectedIndex].value;
    
    postToPlaylist(playlistId);

})


/*************************** Top playlists ***********************************/

const showToplistButton = document.getElementById('showToplistButton');

showToplistButton.addEventListener('click', function(event){
    event.preventDefault();
    contentElement.innerHTML = '';
    getTopPlaylists();
});
    


