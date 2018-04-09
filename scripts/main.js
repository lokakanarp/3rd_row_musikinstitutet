const searchButton = document.getElementById('search');
const options = document.getElementById('selectSearch').children;
const searchField = document.getElementById('searchField');
const searchResultOutput = document.getElementById('searchResult');

searchButton.addEventListener('click', function(event){
    event.preventDefault();
    searchResultOutput.innerHTML = '';
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
            const searchResult = data[i].name;
            searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }else{
			let playlist = data[i];
			displayCardPlaylist(playlist);
            //const searchResult = data[i].title;
           // searchResultOutput.innerHTML += `<p>${searchResult}<p>`;
        }
    }
}


