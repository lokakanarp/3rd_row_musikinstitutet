displayArtistForm();
addEventListenerToButton(artistFormButton, getElementsfromArtistForm);

/*artistFormButton.addEventListener('click', function(event){
	event.preventDefault();
	getElementsfromArtistForm();	
})*/

function addEventListenerToButton(button, callback) {
button.addEventListener('click', function(event){
	event.preventDefault();
	callback();
	})
}

function displayArtistForm() {
	let artistForm = `<form>
	  Name of artist:<br>
	  <input type='text' name='nameOfArtist' id='nameOfArtist'>
	  <br>
	  Born:<br>
	  <input type='text' name='born' id='bornDateArtist'>
	  <br>
	  Gender:<br>
	  <select name='gender' id='genderOfArtist'>
		  <option value='female'>Female</option>
		  <option value='male'>Male</option>
		  <option value='other'>Other</option>
      </select>
	  <br>
	  Genres (separate by comma):<br>
	  <input type="text" name='genres' id='genresOfArtist'>
	  <br>
	  Born Country:<br>
	  <input type='text' name='countryBorn' id='countryBornArtist'>
	  <br>
	  SpotifyURL:<br>
	  <input type='text' name='spotifyURL' id='spotifyURLOfArtist'>
	  <br>
	  Cover image:<br>
	  <input type='text' name='coverImage' id='coverImageOfArtist'>
		<button id='artistFormButton'>Post Artist</button>
	  <br><br>
	</form>`;
	const artistFormElement = document.getElementById('artistFormElement');
	artistFormElement.insertAdjacentHTML('beforeend', artistForm);
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
	let elementsfromArtistForm = {
		name: nameOfArtist.value,
		born: bornDateArtist.value,
		gender: genderOfArtist.value,
		genres: genresOfArtist.value, 
		countryBorn: countryBornArtist.value,
		spotifyURL: spotifyURLOfArtist.value,
		coverImage: coverImageOfArtist.value	
	}
	postArtist(elementsfromArtistForm);
}

function postArtist(elements){
		let artist = elements;
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
			displayAlbumForm(artist._id);
		  })	
}

function displayAlbumForm(artistId) {
	let albumForm = `<form>
		<input type='hidden' id= 'artistId' value=${artistId}>
	  Title of album:<br>
	  <input type='text' name='titleOfAlbum' id='titleOfAlbum'>
	  <br>
	  Release date:<br>
	  <input type='text' name='dateOfRelease' id='dateOfRelease'>
	  <br>
	  Genres (separate by comma):<br>
	  <input type="text" name='genresOfAlbum' id='genresOfAlbum'>
	  <br>
	  SpotifyURL:<br>
	  <input type='text' name='spotifyURLOfAlbum' id='spotifyURLOfAlbum'>
	  <br>
	  Cover image:<br>
	  <input type='text' name='coverImageOfAlbum' id='coverImageOfAlbum'>
	  <br><br>
		<button id='albumFormButton'>Post Album</button>
	</form>`;
	const albumFormElement = document.getElementById('albumFormElement');
	albumFormElement.insertAdjacentHTML('beforeend', albumForm);
	addEventListenerToButton(albumFormButton, getElementsFromAlbumForm);
}

/*function addEventListenerToAlbumFormButton() {
albumFormButton.addEventListener('click', function(event){
	event.preventDefault();
	getElementsFromAlbumForm();
	})
}*/


function getElementsFromAlbumForm() {
	let artistId = document.getElementById('artistId');
	let titleOfAlbum = document.getElementById('titleOfAlbum');
	let dateOfRelease = document.getElementById('dateOfRelease');
	let genresOfAlbum = document.getElementById('genresOfAlbum');
	let spotifyURLOfAlbum = document.getElementById('spotifyURLOfAlbum');
	let coverImageOfAlbum = document.getElementById('coverImageOfAlbum');
	let albumFormButton = document.getElementById('albumFormButton');
	postAlbum(titleOfAlbum.value, artistId.value, dateOfRelease.value, genresOfAlbum.value, spotifyURLOfAlbum.value, coverImageOfAlbum.value);
}

function postAlbum(title, artistId, date, genres, spotifyURL, coverImage) {
	let album = {
    title: title,
    artists: artistId, 
    releaseDate: date,
    genres: genres, 
    spotifyURL: spotifyURL,
    coverImage: coverImage
	}
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
	  });	
}




