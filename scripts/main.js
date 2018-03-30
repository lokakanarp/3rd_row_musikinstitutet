
function displayArtistForm() {
	artistForm = `<form>
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
	  <br><br>
	</form>`;
	const artistFormElement = document.getElementById('artistFormElement');
	artistFormElement.innerHTML = artistForm;
}
function getElementsfromArtistForm() {
	let nameOfArtist = document.getElementById('nameOfArtist');
	let bornDateArtist = document.getElementById('bornDateArtist');
	let genderOfArtist = document.getElementById('genderOfArtist');
	let genresOfArtist = document.getElementById('genresOfArtist');
	let countryBornArtist = document.getElementById('countryBornArtist');
	let spotifyURLOfArtist = document.getElementById('spotifyURLOfArtist');
	let coverImageOfArtist = document.getElementById('coverImageOfArtist');
}

function postArtist(artistName, born, gender, genres, countryBorn, spotifyURL, coverImage){
	if(artistName.length > 0) {
		let artist = {
		name: artistName,
		born: born,
		gender: gender,
		genres: genres, 
		countryBorn: countryBorn,
		spotifyURL: spotifyURL,
		coverImage: coverImage
		}
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
			artistId = artist._id;
			console.log(artistId);
		  })
		return true;
	}
	else {
		console.log("Error. Try again");
	}
}
function displayAlbumForm() {
	albumForm = `<form>
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
		<button id='albumFormButton'>Post Album</button
	</form>`;
	const albumFormElement = document.getElementById('albumFormElement');
	albumFormElement.insertAdjacentHTML('beforeend', albumForm); //Här ska det stå nåt annat??
}
function getElementsfromAlbumForm() {
	let titleOfAlbum = document.getElementById('titleOfAlbum');
	let dateOfRelease = document.getElementById('dateOfRelease');
	let genresOfAlbum = document.getElementById('genresOfAlbum');
	let genderOfArtist = document.getElementById('genderOfArtist');
	let countryBornArtist = document.getElementById('countryBornArtist');
	let spotifyURLOfAlbum = document.getElementById('spotifyURLOfAlbum');
	let coverImageOfAlbum = document.getElementById('coverImageOfAlbum');
	let albumFormButton = document.getElementById('albumFormButton');
}
function postAlbum(artistId, title, date, genres, spotifyURL, coverImage) {
	let album = {
    title: titleOfAlbum,
    artists: artistId, 
    releaseDate: dateOfRelease,
    genres: genresOfAlbum, 
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

//Here is the actual action:

displayArtistForm();

//Kanske göra en inbyggd kanpp ist??
let artistFormButton = document.createElement('button');
artistFormButton.classList.add('artistFormButton');
artistFormElement.appendChild(artistFormButton);

getElementsfromArtistForm();

artistFormButton.addEventListener('click', function(){
	let artistId = "";
	if (postArtist(nameOfArtist.value, bornDateArtist.value, genderOfArtist.value, genresOfArtist.value, countryBornArtist.value, spotifyURLOfArtist.value, coverImageOfArtist.value)) {
		displayAlbumForm();
	}
	
	//getElementsfromAlbumForm();
		
})

//postAlbum(artistId, titleOfAlbum.value, dateOfRelease.value, genresOfAlbum.value, //spotifyURLOfAlbum.value, coverImageOfAlbum.value);
    



//deleteArtist();
function deleteArtist(){
    fetch(`https://folksa.ga/api/artists/5aba3d977396550e47352c8f?key=flat_eric`, {
        method: 'DELETE',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
      .then((response) => response.json())
      .then((artist) => {
        console.log(artist);
      });
}


/* 
let artist = {
    name: artistName,
    born: "1954-09-26",
    gender: "female",
	countryBorn: "Italy",
    genres: "Pop", //Must be a comma separated string
    spotifyURL: "https://open.spotify.com/artist/3zNFrznlC0kv866J7Karl3?si=XNPUij8KQKCDnijOs959oA",
    coverImage: "https://img.discogs.com/Y8V3M_FpSCxTMisupBlgQb9tGZM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1315032-1214684059.jpeg.jpg" */