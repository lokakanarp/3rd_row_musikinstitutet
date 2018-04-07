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
            console.log(track);
        });
}