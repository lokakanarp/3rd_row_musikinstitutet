//The link in navbar:
const displayPlaylistFormLink = document.getElementById('displayPlaylistFormLink');
displayPlaylistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	displayPlaylistForm();
})

function displayPlaylistForm() {
	contentElement.innerHTML = '';
	addArtistForms.classList.add('addArtistForms');
	contentElement.appendChild(addArtistForms);	
	headingForms.classList.add('headingForms');
	addArtistForms.appendChild(headingForms);
	confirmationMessageArtist.classList.add('confirmationMessage');
	addArtistForms.appendChild(confirmationMessageArtist);
	artistFormElement.classList.add('artistFormElement');
	addArtistForms.appendChild(artistFormElement);
	confirmationMessageArtist.innerHTML = '';
	headingForms.innerHTML = `<h2>Skapa en ny spellista</h2>`;
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

function messagPlaylistForm(playlist) {
	const message = `<p>Du la till spellistan ${playlist.title.toUpperCase()} till Musikinstitutet.<br> 
	För att lägga till låtar till din spellista leta upp önskad låt med hjälp av sökfunktionen eller A-Ö-menyn. Klicka på plustecknet 
	bredvid låttitlarna och välj spellista ur menyn.</p>`
	artistFormElement.innerHTML = message;
}

/*************************** Add track to playlist functions ***********************************/



function createDropdown(playlists){
    const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.classList.add('choosePlaylist');

    const playlistSelectionElement = document.getElementById('playlistSelection');
    choosePlaylistElement.style.display = "block";
    
    let optionRow;
    optionRow =
    `<option class="optionClass">Välj en spellista:</option>` 
    
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
    





