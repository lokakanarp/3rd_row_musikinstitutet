const searchElement = document.getElementById('search');

let artistSearchField = document.createElement('input');
artistSearchField.classList.add('artistSearchField');
searchElement.appendChild(artistSearchField);

let artistSearchButton = document.createElement('button');
artistSearchButton.classList.add('artistSearchButton');
searchElement.appendChild(artistSearchButton);


artistSearchButton.addEventListener('click', function(){
    // if artist redan finns: fortsätt till albumformular.
    // else:
    postArtist(artistSearchField.value);
})

    
function postArtist(artistName){
    /*let artist = {
        name: artistName,
        born: 2000-12-12,
        genres: "hej",
        gender: "other",
        countryBorn: "hej",
        spotifyURL: "hej",
        coverImage: "hej"
    }*/
	
	let artist = {
    name: artistName,
    born: "1954-09-26",
    gender: "female",
	countryBorn: "Italy",
    genres: "Pop", //Must be a comma separated string
    spotifyURL: "https://open.spotify.com/artist/3zNFrznlC0kv866J7Karl3?si=XNPUij8KQKCDnijOs959oA",
    coverImage: "https://img.discogs.com/Y8V3M_FpSCxTMisupBlgQb9tGZM=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-1315032-1214684059.jpeg.jpg"
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