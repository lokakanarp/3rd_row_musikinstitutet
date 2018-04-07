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


function calculateAverageRating(incomingArrayOfRatings){
    
    let denominator = 0;
    
    for(let i = 0; i < incomingArrayOfRatings.length; i++){
        denominator += incomingArrayOfRatings[i]; 
    }
    
    let numerator = incomingArrayOfRatings.length;
    
    console.log(denominator);
    console.log(numerator);
    
    return denominator / numerator;
}