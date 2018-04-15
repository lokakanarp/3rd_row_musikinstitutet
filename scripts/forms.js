const displayArtistFormLink = document.getElementById('displayArtistFormLink');
displayArtistFormLink.addEventListener('click', function(event){
	event.preventDefault();
	console.log('hej');
	displayArtistForm();
})




function addEventListenerToButton(button, callback) {
button.addEventListener('click', function(event){
	event.preventDefault();
	callback();
	})
}

function displayArtistForm() {
	
	
	let artistForm = `<form>
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
	const addArtistForms = document.createElement('div');  //Skapa div som alla form ska ligga i
    addArtistForms.classList.add('addArtistForms');
	const artistFormElement = document.createElement('div');
	artistFormElement.classList.add('artistFormElement');
	artistFormElement.insertAdjacentHTML('afterbegin', artistForm);
	addArtistForms.appendChild(artistFormElement);
	contentElement.appendChild(addArtistForms);
	//const artistFormElement = document.getElementById('artistFormElement');
	
	
}
function getElementsfromArtistForm() {
	let nameOfArtist = document.getElementById('nameOfArtist');
	let bornDateArtist = document.getElementById('bornDateArtist');
	let genderOfArtist = document.getElementById('genderOfArtist');
	let genresOfArtist = document.getElementById('genresOfArtist');
	let countryBornArtist = document.getElementById('countryBornArtist');
	let spotifyURLOfArtist = document.getElementById('spotifyURLOfArtist');
	let coverImageOfArtist = document.getElementById('coverImageOfArtist');
	let artistFormButton = document.getElementById('artistFormButton');
	addEventListenerToButton(artistFormButton, getElementsfromArtistForm);
	if(nameOfArtist.value === ''){
      alert('Var vänlig fyll i artistens namn.');
    } else {
		let elementsfromArtistForm = {
			name: nameOfArtist.value,
			born: bornDateArtist.value,
			gender: genderOfArtist.value,
			genres: genresOfArtist.value, 
			countryBorn: countryBornArtist.value,
			spotifyURL: spotifyURLOfArtist.value,
			coverImage: coverImageOfArtist.value	
		}
		artistFormElement.innerHTML = "";
		postArtist(elementsfromArtistForm);
		//emptyFields(elementsfromArtistForm);
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
	let confirmationMessageArtist = document.getElementById("confirmationMessageArtist");
	let message = `<p>Du la till ${artist.name.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ett album av ${artist.name.toUpperCase()} använd formuläret nedan.</p>`
		displayAlbumForm(artist._id);
	confirmationMessageArtist.innerHTML = message;
}

function displayAlbumForm(artistId) {
	let albumForm = `<form>
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
	const albumFormElement = document.getElementById('albumFormElement');
	albumFormElement.insertAdjacentHTML('afterbegin', albumForm);
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
		confirmationMessageArtist.innerHTML = '';
		albumFormElement.innerHTML = '';
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
	let confirmationMessageAlbum = document.getElementById('confirmationMessageAlbum');
	let message = `<p>Du la till ${album.title} till Musikinstitutet.<br> 
		För att lägga till en låt till ${album.title.toUpperCase()} använd formuläret nedan.</p>`
	confirmationMessageAlbum.innerHTML = message;
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
	const tracksFormElement = document.getElementById('tracksFormElement');
	tracksFormElement.insertAdjacentHTML('afterbegin', tracksForm);
	let tracksFormButton = document.getElementById('tracksFormButton');
	addEventListenerToButton(tracksFormButton, getElementsFromTracksForm);
}

function getElementsFromTracksForm() {
	let titleOfTrack = document.getElementById('titleOfTrack');
	let artistId = document.getElementById('artistId');
	let albumId = document.getElementById('albumId');
	let genresOfTrack = document.getElementById('genresOfTrack');
	let coverImageOfAlbum = document.getElementById('coverImageOfAlbum')
	let coverImageColor = document.getElementById('coverImageColorOfTrack');
	let spotifyURLOfTrack = document.getElementById('spotifyURLOfTrack');
	let youtubeURLOfTrack = document.getElementById('youtubeURLOfTrack');
	let soundcloudURLOfTrack = document.getElementById('soundcloudURLOfTrack');
	if(titleOfTrack.value === '' ){
      alert('Var vänlig fyll i låttitel.');
    }else {
		let elementsFromTracksForm = {
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
		confirmationMessageAlbum.innerHTML = '';
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
	let confirmationMessageTracks = document.getElementById('confirmationMessageTracks');
	let message = `<p>Du la till ${track.title.toUpperCase()} till Musikinstitutet.<br> 
		För att lägga till ännu en låt till samma skiva, använd formuläret ovan igen.<br>
		För att lägga till en ny artist klicka på knappen nedan.</p><br>
		<button id='newArtistButton' class='formButton'>Lägg till en ny artist</button>`
	confirmationMessageTracks.innerHTML = message;
	let newArtistButton = document.getElementById('newArtistButton');
	newArtistButton.addEventListener('click', function(event){
		event.preventDefault();
		tracksFormElement.innerHTML = '';
		confirmationMessageTracks.innerHTML = '';
		displayArtistForm();
	});	
}






