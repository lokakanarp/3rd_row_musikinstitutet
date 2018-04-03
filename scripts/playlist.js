

const newPlayListTitle = document.getElementById('newPlayListTitle');
const createdByInput = document.getElementById('createdBy');
const newPlaylistButton = document.getElementById('newPlaylistButton');

const choosePlaylistButton = document.getElementById('choosePlaylistButton');
const playlistSelection = document.getElementById('playlistSelection');

newPlaylistButton.addEventListener('click', function(event){
    event.preventDefault();
    
    console.log(newPlayListTitle.value);
    console.log(createdByInput.value);
    
    let title = newPlayListTitle.value;
    let createdBy = createdByInput.value;
    
    createPlaylist(title, createdBy);
});



function createPlaylist(title, createdBy){

    let playlist = {
        title: title,
    //    genres: "Folk, Folk Rock",
        createdBy: createdBy
    //    tracks: "5aae2d13b9791d0344d8f717,5aae2e6fb9791d0344d8f71c",
    //    coverImage: "https://www.internetmuseum.se/wordpress/wp-content/uploads/compisknappar-504x329.jpg",
    //    coverImageColor: "#000"
    }

    fetch('https://folksa.ga/api/playlists?key=flat_eric',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist)
      })
      .then((response) => response.json())
      .then((playlist) => {
        console.log(playlist);
      });
}

// min playlist-id: 5abfa9695e9531142f1da683



/* This function is pushing tracks to an array that that will be sent off to actual posting-function */
//var playlistArray = [];

var playlistTrack;

function addTrackToPlaylist(trackId){
//    console.log('in function: ', trackId);
    
    // välj vilken playlist du vill adda till.
    //funktion som hä,tar playlistnamn och dess id från api, så att man får välja
   
    getPlaylist();
    
 //   playlistArray.push(trackId);
//    console.log(playlistArray);
    
    
    
    //skicka med id från playlist hömtat ovan i denna och gör url:en dynamisk
//    postPlaylist();
//    
//    playlistTrack = '';
}

/* This function posts the playlist array to the API. Att göra: skicka med playlist-id som argument */
function postPlaylist(){
    //let tracks = playlistArray.toString();
    /* sätt in playlist-paramenter i url:en */
    fetch('https://folksa.ga/api/playlists/5abfa9695e9531142f1da683/tracks?key=flat_eric',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tracks: tracks })
      })
      .then((response) => response.json())
      .then((playlist) => {
        console.log(playlist);
      });
}




function getPlaylist(){

    fetch('https://folksa.ga/api/playlists?key=flat_eric')
      .then((response) => response.json())
      .then((playlists) => {
//        console.log(playlists);
        
        //chooseWhichPlaylistOutput();
        
        //få med både id och titel på playlist.....
        
        createDropdown(playlists);
        
        /*
        for(let i = 0; i < playlists.length; i++){
//            console.log(playlists[i]._id);
//            console.log(playlists[i].title);
        
            let playlistId = playlists[i]._id;
            let playlistTitle = playlists[i].title;
        
            //createDropdownRow(playlistId, playlistTitle);
            
            createDropdown(playlists);
        }
        */
        
      });
    }

/*
function chooseWhichPlaylistOutput(optionDOM){
    
const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.classList.add('choosePlaylist');

    const playlistSelectionElement = document.getElementById('playlistSelection');
    //const choosePlaylistButton = document.getElementById('choosePlaylistButton');
    
    //console.log("heeeeeeeej");
    
    //document.getElementById("choosePlaylist").style.display = "block";
    
    choosePlaylistElement.style.display = "block";
    
    
    
    let dropdown = `
        ${optionDOM};
    `;
    
    playlistSelectionElement.insertAdjacentHTML('beforeend', dropdown);
    
//    dropdown[playlistId].addEventListener('click', function(){
//        console.log(this);
//    })
    
    
    
    
    // loopar ur en drop down meny med existerande playlists titlat så att man kan välja.
    // skickar med id till postPlaylist och placerar detta i url:en.
}
*/

/*
function createDropdownRow(playlistId, playlistTitle){
    
    let optionDOM = `<option value="${playlistId}" class="optionClass">${playlistTitle}</option>
    <button id="${playlistId}">Choose playlist</button>`;
    
    playlistId.addEventListener('click', function () {
				const specificLetter = this.id;
        

        

			})
    
    chooseWhichPlaylistOutput(optionDOM);
    
}
*/


function createDropdown(playlists){
    const choosePlaylistElement = document.getElementById('choosePlaylist');
    choosePlaylistElement.classList.add('choosePlaylist');

    const playlistSelectionElement = document.getElementById('playlistSelection');
    choosePlaylistElement.style.display = "block";
    

    
    let optionRow;
    for(let i = 0; i < playlists.length; i++){
        
    let playlistId = playlists[i]._id;
    let playlistTitle = playlists[i].title;
        
        optionRow += `<option value="${playlistId}" class="optionClass">${playlistTitle}</option>`
        
//        let options = document.getElementsByClassName("optionClass");
//		for(let option of options) {
//			option.addEventListener('click', function () {
//				
//                //console.log(this.id);
//                console.log("funkar det???");
//                
//			})
//		}
    }
    
    
    let dropdown = `
        ${optionRow};
    `;
    
    
    playlistSelectionElement.insertAdjacentHTML('beforeend', dropdown);
}

playlistSelection.addEventListener('click', function (){
    console.log(this.value);
})



/*
function addEventlistenersToAlphabet(){
let alphabetLetters = document.getElementsByClassName("aphabeticalMenu");
		for(let letter of alphabetLetters) {
			letter.addEventListener('click', function () {
				const specificLetter = this.id;
                //console.log(this.id);
                handlingAlphabeticalMenuClick(specificLetter);
			})
		}
}
*/


    