// Use the following API Endpoints:
// https://api.spotify.com/v1/search to search for type=track
// https://api.spotify.com/v1/tracks/{id} to get a track's info and audio file.

// Field filters
// By default, results are returned when a match is found in any field of the target object type. Searches can be made more specific by specifying an album, artist or track field filter. For example, the query q=album:gold+artist:abba&type=album will only return albums with the text "gold" in the album name and the text "abba" in the artist's name.
// The field filter year can be used with album, artist and track searches to limit the results to a particular year (for example, q=bob+year:2014) or date range (for example, q=bob+year:1980-2020).
// The field filter tag:new can be used in album searches to retrieve only albums released in the last two weeks. The field filter tag:hipster can be used in album searches to retrieve only albums with the lowest 10% popularity.
// Other possible field filters, depending on object types being searched, include genre, upc, and isrc. For example, q=damian+genre:reggae-pop&type=artist.

var SEARCH_URL = "https://api.spotify.com/v1/search/?type=track&"
var GET_MUSIC_URL = "https://api.spotify.com/v1/tracks/{id}"

var artist_name = "Nas";

var prueba = function give_me_artist() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(SEARCH_URL + 'query=' + artist_name));
	xhr.onload = function() {
	    if (xhr.status === 200) {
	    	console.log(xhr.response);
	        // alert('User\'s name is ' + xhr.responseText);
	    }
	    else {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
};



// spotifySongSearch( "run like hell", getSongId );

function spotifySongSearch(track, callback) {
 var url = "https://api.spotify.com/v1/search/?type=track&q=" + track;
 req.open("GET", url);  
 req.send(); 
 req.onload = function(event) {
   var response = JSON.parse(event.target.response);
   callback(response);
 };
}



function getSongId(response){
    getSongById(response.tracks.items[0].id, songReceivedHandler);
}



prueba();














// play_btn = document.getElementByClassName("btn-play");

// play_btn.on("click", AQUIEN, give_me_artist);