//Global variables
const addArtistForms = document.createElement('div'); 
const headingForms = document.createElement('div');
const confirmationMessageArtist = document.createElement('div');
const artistFormElement = document.createElement('div');

const displayArtistFormLink = document.getElementById('displayArtistFormLink');
displayArtistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	clearElement(contentElement);
	displayArtistForm();
})

function addEventListenerToButton(button, callback) {
button.addEventListener('click', function(event){
	event.preventDefault();
	callback();
	})
}

function displayArtistForm() {
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
	headingForms.innerHTML = `<h2>Lägg till en artist, ett album eller en låt.</h2>`;
	const artistForm = `<form>
	  Artistens eller bandets namn:<br>
	  <input type='text' name='nameOfArtist' id='nameOfArtist' required/>
	  <br>
	  Född:<br>
	  <input type='text' name='born' id='bornDateArtist'><br>
	  Genus:<br>
	  <select name='gender' id='genderOfArtist' class='selectGender'>
		  <option value='female'>Kvinna</option>
		  <option value='male'>Man</option>
		  <option value='other'>Annat</option>
      </select><br>
	  Genrer (separera med komma):<br>
	  <input type='text' name='genres' id='genresOfArtist'><br>
	  Födelseland:<br>
	  <input type='text' name='countryBorn' id='countryBornArtist'><br>
	  Spotify URL:<br>
	  <input type='text' name='spotifyURL' id='spotifyURLOfArtist'><br>
	  Bildadress:<br>
	  <input type='text' name='coverImage' id='coverImageOfArtist'><br>
		<button id='artistFormButton' class='formButton'>Lägg till artist</button><br>
	</form>`;
	artistFormElement.innerHTML = artistForm;
	const artistFormButton = document.getElementById('artistFormButton');
	addEventListenerToButton(artistFormButton, getElementsfromArtistForm);
}

function messageArtistForm(artist) {
	const message = `<p>Du la till ${artist.name.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ett album av ${artist.name.toUpperCase()} använd formuläret nedan.</p>`
	confirmationMessageArtist.innerHTML = message;
	displayAlbumForm(artist._id);
}

function displayAlbumForm(artistId) {
	const albumForm = `<form>
		<input type='hidden' id= 'artistId' value=${artistId}>
	  Albumtitel:<br>
	  <input type='text' name='titleOfAlbum' id='titleOfAlbum'><br>
	  Utgivningsdatum:<br>
	  <input type='text' name='dateOfRelease' id='dateOfRelease'><br>
	  Genrer (separera med komma):<br>
	  <input type='text' name='genresOfAlbum' id='genresOfAlbum'><br>
	  Spotify URL:<br>
	  <input type='text' name='spotifyURLOfAlbum' id='spotifyURLOfAlbum'><br>
	  Omslagsbild:<br>
	  <input type='text' name='coverImageOfAlbum' id='coverImageOfAlbum'><br>
	  <button id='albumFormButton' class='formButton'>Lägg till album</button>
		<br>
	</form>`;
	artistFormElement.innerHTML = albumForm;
	let albumFormButton = document.getElementById('albumFormButton');
	addEventListenerToButton(albumFormButton, getElementsFromAlbumForm);
}

function messageAlbumForm(album) {
	const message = `<p>Du la till ${album.title.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till en låt till ${album.title.toUpperCase()} använd formuläret nedan.</p>`;
	confirmationMessageArtist.innerHTML = message;
	displayTracksForm(album._id, album.artists, album.coverImage);
}

function displayTracksForm(albumId, artistId, coverImage) {
	let tracksForm = `<form>
	  Låttitel:<br>
	  <input type='text' name='titleOfTrack' id='titleOfTrack'>
	  <br>
	  <input type='hidden' id='artistId' value=${artistId}>
	  <input type='hidden' id='albumId' value=${albumId}>
	  <input type='hidden' id='coverImageOfAlbum' value=${coverImage}>
	  Genrer (separerade med komma):<br>
	  <input type='text' name='genresOfTrack' id='genresOfTrack'>
	  <br>
	  Omslagsfärg:<br>
	  <input type='text' name='coverImageColorOfTrack' id='coverImageColorOfTrack'>
	  <br>
	  Spotify URL:<br>
	  <input type='text' name='spotifyURLOfTrack' id='spotifyURLOfTrack'> 
	  <br>
	  Youtube URL:<br>
	  <input type='text' name='youtubeURLOfTrack' id='youtubeURLOfTrack'>
	  <br>
	  Soundcloud URL:<br>
	  <input type='text' name='soundcloudURLOfTrack' id='soundcloudURLOfTrack'><br>
	  <button id='tracksFormButton' class='formButton'>Lägg till låt</button>
	<br>
	</form>`;
	artistFormElement.innerHTML = tracksForm;
	let tracksFormButton = document.getElementById('tracksFormButton');
	addEventListenerToButton(tracksFormButton, getElementsFromTracksForm);
}

function messageTrackForm(track) {
	const message = `<p>Du la till ${track.title.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ännu en låt till samma skiva, använd formuläret igen.<br>
		För att lägga till en ny artist klicka på knappen nedan.</p><br>
		<button id='newArtistButton' class='formButton'>Lägg till en ny artist</button>`;
	confirmationMessageArtist.innerHTML = message;
	
	const newArtistButton = document.getElementById('newArtistButton');
	newArtistButton.addEventListener('click', function(event){
		event.preventDefault();
		displayArtistForm();
	});	
}






