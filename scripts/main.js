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
    let artist = {
        name: artistName,
        born: 2000-12-12,
        genres: "hej",
        gender: "other",
        countryBorn: "hej",
        spotifyURL: "hej",
        coverImage: "hej"
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


deleteArtist();
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