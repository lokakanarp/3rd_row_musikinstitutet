const searchElement = document.getElementById('search');

let artistSearchField = document.createElement('input');
artistSearchField.classList.add('artistSearchField'); // skapa denna css-klass
searchElement.appendChild(artistSearchField);

let artistSearchButton = document.createElement('button');
artistSearchButton.classList.add('artistSearchButton'); // skapa denna css-klass
searchElement.appendChild(artistSearchButton);


artistSearchButton.addEventListener('click', function(){
    // if artist redan finns: fortsätt till albumformular.
    // else:
    console.log("hej");
    postArtist(artistSearchField.value);
//    console.log(artistSearchField.value);
})


function postArtist(name){
    console.log(name);
    
    let artist = {
    name: name
}

fetch('https://folksa.ga/api/artists',{
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