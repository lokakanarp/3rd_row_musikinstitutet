const searchElement = document.getElementById('search');

/*let artistSearchField = document.createElement('input');
artistSearchField.classList.add('artistSearchField');*/

postArtistForm = `<form>
  Name of artist:<br>
  <input type='text' name='nameOfArtist' id='nameOfArtist'>
  <br>
  Born:<br>
  <input type='text' name='born' id='born'>
  <br>
  Genres (separate by comma):<br>
  <input type="text" name='genres' id='genres'>
  <br>
  Gender:<br>
  <input type='text' name='gender' id='gender'>
  <br>
  Born Country:<br>
  <input type='text' name='countryBorn' id='countryBorn'>
  <br>
  SpotifyURL:<br>
  <input type='text' name='spotifyURL' id='spotifyURL'>
  <br>
  Cover image:<br>
  <input type='text' name='coverImage' id='coverImage'>
  <br><br>
</form>`
searchElement.innerHTML = postArtistForm;

let nameOfArtist = document.getElementById('nameOfArtist');
let bornDateArtist = document.getElementById('born');
let genresOfArtist = document.getElementById('genres');
let genderOfArtist = document.getElementById('gender');
let countryBornArtist = document.getElementById('countryBorn');
let spotifyURLOfArtist = document.getElementById('spotifyURL');
let coverImageOfArtist = document.getElementById('coverImage');


let artistSearchButton = document.createElement('button');
artistSearchButton.classList.add('artistSearchButton');
searchElement.appendChild(artistSearchButton);


artistSearchButton.addEventListener('click', function(){
    // if artist redan finns: fortsätt till albumformular.
    // else:
    postArtist(nameOfArtist.value, born.value, gender.value, countryBorn.value, genres.value, spotifyURL.value, coverImage.value);
})
    
function postArtist(artistName, born, gender, countryBorn, genres, spotifyURL, coverImage){
	let artist = {
    name: artistName,
    born: born,
    gender: gender,
	countryBorn: countryBorn,
    genres: genres, //Must be a comma separated string
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
      });
}


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