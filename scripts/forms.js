function addEventListenerToButton(button, callback) {
button.addEventListener('click', function(event){
	event.preventDefault();
	callback();
	})
}

const displayArtistFormLink = document.getElementById('displayArtistFormLink');
displayArtistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	displayArtistForm();
})

function displayArtistForm() {
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
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const artistFormElement = document.createElement('div');
	artistFormElement.classList.add('artistFormElement');
	artistFormElement.insertAdjacentHTML('afterbegin', artistForm);
	addArtistForms.appendChild(artistFormElement);
	contentElement.appendChild(addArtistForms);	
	const artistFormButton = document.getElementById('artistFormButton');
	addEventListenerToButton(artistFormButton, getElementsfromArtistForm);
}
function getElementsfromArtistForm() {
	const nameOfArtist = document.getElementById('nameOfArtist');
	const bornDateArtist = document.getElementById('bornDateArtist');
	const genderOfArtist = document.getElementById('genderOfArtist');
	const genresOfArtist = document.getElementById('genresOfArtist');
	const countryBornArtist = document.getElementById('countryBornArtist');
	const spotifyURLOfArtist = document.getElementById('spotifyURLOfArtist');
	const coverImageOfArtist = document.getElementById('coverImageOfArtist');
	if(nameOfArtist.value === ''){
      alert('Var vänlig fyll i artistens namn.');
    } else {
		const elementsfromArtistForm = {
			name: nameOfArtist.value,
			born: bornDateArtist.value,
			gender: genderOfArtist.value,
			genres: genresOfArtist.value, 
			countryBorn: countryBornArtist.value,
			spotifyURL: spotifyURLOfArtist.value,
			coverImage: coverImageOfArtist.value	
		}
		postArtist(elementsfromArtistForm);
		//const artistFormElement = document.getElementById('artistFormElement');
		
		//artistFormElement.innerHTML = '';
		
	}
}

function postArtist(artist){
		fetch('https://folksa.ga/api/artists?key=flat_eric',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(artist)
		  })
		  .then((response) => response.json())
		  .then((artist) => {
			console.log(artist);
			messageArtistForm(artist);
		  })	
}
function messageArtistForm(artist) {
	const message = `<p>Du la till ${artist.name.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ett album av ${artist.name.toUpperCase()} använd formuläret nedan.</p>`
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const confirmationMessageArtist = document.createElement('div');
	confirmationMessageArtist.classList.add('confirmationMessage');
	confirmationMessageArtist.insertAdjacentHTML('afterbegin', message);
	addArtistForms.appendChild(confirmationMessageArtist);
	contentElement.appendChild(addArtistForms);
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
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const albumFormElement = document.createElement('div');
	albumFormElement.classList.add('artistFormElement');
	albumFormElement.insertAdjacentHTML('afterbegin', albumForm);
	addArtistForms.appendChild(albumFormElement);
	contentElement.appendChild(addArtistForms);
	let albumFormButton = document.getElementById('albumFormButton');
	addEventListenerToButton(albumFormButton, getElementsFromAlbumForm);
}

function getElementsFromAlbumForm() {
	let artistId = document.getElementById('artistId');
	let titleOfAlbum = document.getElementById('titleOfAlbum');
	let dateOfRelease = document.getElementById('dateOfRelease');
	let genresOfAlbum = document.getElementById('genresOfAlbum');
	let spotifyURLOfAlbum = document.getElementById('spotifyURLOfAlbum');
	let coverImageOfAlbum = document.getElementById('coverImageOfAlbum');
	if(titleOfAlbum.value === '' ){
      alert('Var vänlig fyll i albumtitel.');
    } else {
		let elementsFromAlbumForm = {
		title: titleOfAlbum.value,
		artists: artistId.value, 
		releaseDate: dateOfRelease.value,
		genres: genresOfAlbum.value, 
		spotifyURL: spotifyURLOfAlbum.value,
		coverImage: coverImageOfAlbum.value
		}
		//confirmationMessageArtist.innerHTML = '';
		
		//albumFormElement.innerHTML = '';
		postAlbum(elementsFromAlbumForm);
	}
}

function postAlbum(album) {
	fetch('https://folksa.ga/api/albums?key=flat_eric',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(album)
	  })
	  .then((response) => response.json())
	  .then((album) => {
		console.log(album);
		messageAlbumForm(album);
	  });	
}

function messageAlbumForm(album) {
	const message = `<p>Du la till ${album.title} till Musikinstitutet.<br> 
		För att lägga till en låt till ${album.title.toUpperCase()} använd formuläret nedan.</p>`;
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const confirmationMessageAlbum = document.createElement('div');
	confirmationMessageAlbum.classList.add('confirmationMessage');
	confirmationMessageAlbum.insertAdjacentHTML('afterbegin', message);
	addArtistForms.appendChild(confirmationMessageAlbum);
	contentElement.appendChild(addArtistForms);
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
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const tracksFormElement = document.createElement('div');
	tracksFormElement.classList.add('artistFormElement');
	tracksFormElement.insertAdjacentHTML('afterbegin', tracksForm);
	addArtistForms.appendChild(tracksFormElement);
	contentElement.appendChild(addArtistForms);
	let tracksFormButton = document.getElementById('tracksFormButton');
	addEventListenerToButton(tracksFormButton, getElementsFromTracksForm);
}

function getElementsFromTracksForm() {
	const titleOfTrack = document.getElementById('titleOfTrack');
	const artistId = document.getElementById('artistId');
	const albumId = document.getElementById('albumId');
	const genresOfTrack = document.getElementById('genresOfTrack');
	const coverImageOfAlbum = document.getElementById('coverImageOfAlbum')
	const coverImageColor = document.getElementById('coverImageColorOfTrack');
	const spotifyURLOfTrack = document.getElementById('spotifyURLOfTrack');
	const youtubeURLOfTrack = document.getElementById('youtubeURLOfTrack');
	const soundcloudURLOfTrack = document.getElementById('soundcloudURLOfTrack');
	if(titleOfTrack.value === '' ){
      alert('Var vänlig fyll i låttitel.');
    }else {
		const elementsFromTracksForm = {
		title: titleOfTrack.value,
		artists: artistId.value,
		album: albumId.value, 
		genres: genresOfTrack.value,
		coverImage: coverImageOfAlbum.value, 
		coverImageColor: coverImageColor.value,
		spotifyURL: spotifyURLOfTrack.value,
		youtubeURL: youtubeURLOfTrack.value,
		soundcloudURL: soundcloudURLOfTrack.value
		}
		//confirmationMessageAlbum.innerHTML = '';
		postTrack(elementsFromTracksForm);
	}
}

function postTrack(track) {
	fetch('https://folksa.ga/api/tracks?key=flat_eric',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(track)
	  })
	  .then((response) => response.json())
	  .then((track) => {
		console.log(track);
		messageTrackForm(track);
	  });	
}
function messageTrackForm(track) {
	const message = `<p>Du la till ${track.title.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ännu en låt till samma skiva, använd formuläret ovan igen.<br>
		För att lägga till en ny artist klicka på knappen nedan.</p><br>
		<button id='newArtistButton' class='formButton'>Lägg till en ny artist</button>`;
	
	const contentElement = document.getElementById('content');
	const addArtistForms = document.createElement('div');  
    addArtistForms.classList.add('addArtistForms');
	const confirmationMessageTracks = document.createElement('div');
	confirmationMessageTracks.classList.add('confirmationMessage');
	confirmationMessageTracks.innerHTML = message;
	addArtistForms.appendChild(confirmationMessageTracks);
	contentElement.appendChild(addArtistForms);
	
	const newArtistButton = document.getElementById('newArtistButton');
	newArtistButton.addEventListener('click', function(event){
		event.preventDefault();
		content.innerHTML = '';
		//confirmationMessageTracks.innerHTML = '';
		displayArtistForm();
	});	
}






