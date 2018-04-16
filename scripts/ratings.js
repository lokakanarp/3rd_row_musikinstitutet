function rateAlbum(albumId, albumRating){
    fetch(`https://folksa.ga/api/albums/${albumId}/vote?key=flat_eric`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: albumRating })
        })
        .then((response) => response.json())
        .then((album) => {
            console.log(album);
        });
    
}


function rateTrack(trackId, trackRating){

    fetch(`https://folksa.ga/api/tracks/${trackId}/vote?key=flat_eric`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: trackRating })
        })
        .then((response) => response.json())
        .then((track) => {
            //console.log(track);
        });
}

function ratePlaylist(playlistId, playlistRating){
   fetch(`https://folksa.ga/api/playlists/${playlistId}/vote?key=flat_eric`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: playlistRating })
        })
        .then((response) => response.json())
        .then((playlist) => {
            console.log(playlist);
        });  
}


function calculateAverageRating(incomingArrayOfRatings){
    
    let denominator = 0;
    
    for(let i = 0; i < incomingArrayOfRatings.length; i++){
        denominator += incomingArrayOfRatings[i]; 
    }
    
    let numerator = incomingArrayOfRatings.length;
    
    let result = denominator / numerator;
    result = result.toFixed(1);
    
    if(isNaN(result)){
        return ''; // Returns blank if result is NaN (probably means no one has votes)
    }else{
        return result;
    }
    
}