//displaySearchForm();
//
//function displaySearchForm() {
//    const searchElement = document.getElementById('search');
//	postSearchForm = `
//    <form>
//        <input type="text" id="searchField">
//        <select name="selectSearch" id="selectSearch">
//            <option value="artist">Artist</option>
//            <option value="track">Track</option>
//            <option value="album">Album</option>
//            <option value="playlist">Playlist</option>
//        </select>
//        <button id="search">Sök</button>
//    </form>
//    `;
//	searchElement.innerHTML = postSearchForm;
//}

const searchButton = document.getElementById('search');
const options = document.getElementById('selectSearch').children;
const searchField = document.getElementById('searchField');
const searchResultOutput = document.getElementById('searchResult');

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    getData();
});

function getData(){
    let searchWord = searchField.value;
    
    const artist = options[0];
    const track = options[1];
    const album = options[2];
    const playlist = options[3];
    
    if(artist.selected == true){
        fetch(`https://folksa.ga/api/artists?key=flat_eric&name=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(track.selected == true){
        fetch(`https://folksa.ga/api/tracks?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(album.selected == true){
        fetch(`https://folksa.ga/api/albums?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
    
    if(playlist.selected == true){
        fetch(`https://folksa.ga/api/playlists?key=flat_eric&title=${searchWord}`)
        .then((response) => response.json())
        .then((data) => {
            showSearchResult(data);
        })
        .catch((error) => {
            console.log(error)
        });
    }
}

function showSearchResult(data){
    for(let i = 0; i < data.length; i++){
        if(data[i].name){
            // Print data to page here
            const searchResult = data[i].name;
            searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }else{
            // Print data to page here
            const searchResult = data[i].title;
            searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }
    }
}




//const searchElement = document.getElementById('search');
//
//let artistSearchField = document.createElement('input');
//artistSearchField.classList.add('artistSearchField');
//searchElement.appendChild(artistSearchField);
//
//let artistSearchButton = document.createElement('button');
//artistSearchButton.classList.add('artistSearchButton');
//searchElement.appendChild(artistSearchButton);
//
//
//artistSearchButton.addEventListener('click', function(){
//    // if artist redan finns: fortsätt till albumformular.
//    // else:
//    postArtist(artistSearchField.value);
//})
//
//    
//function postArtist(artistName){
//    let artist = {
//        name: artistName,
//        born: 2000-12-12,
//        genres: "hej",
//        gender: "other",
//        countryBorn: "hej",
//        spotifyURL: "hej",
//        coverImage: "hej"
//    }
//
//    fetch('https://folksa.ga/api/artists?key=flat_eric',{
//        method: 'POST',
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(artist)
//      })
//      .then((response) => response.json())
//      .then((artist) => {
//        console.log(artist);
//      });
//}
//
//
//deleteArtist();
//function deleteArtist(){
//    fetch(`https://folksa.ga/api/artists/5aba3d977396550e47352c8f?key=flat_eric`, {
//        method: 'DELETE',
//        headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            }
//        })
//      .then((response) => response.json())
//      .then((artist) => {
//        console.log(artist);
//      });
//}