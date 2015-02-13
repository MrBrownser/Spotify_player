// Use the following API Endpoints:
// https://api.spotify.com/v1/search to search for type=track
// https://api.spotify.com/v1/tracks/{id} to get a track's info and audio file.

// Field filters
// By default, results are returned when a match is found in any field of the target object type. Searches can be made more specific by specifying an album, artist or track field filter. For example, the query q=album:gold+artist:abba&type=album will only return albums with the text "gold" in the album name and the text "abba" in the artist's name.
// The field filter year can be used with album, artist and track searches to limit the results to a particular year (for example, q=bob+year:2014) or date range (for example, q=bob+year:1980-2020).
// The field filter tag:new can be used in album searches to retrieve only albums released in the last two weeks. The field filter tag:hipster can be used in album searches to retrieve only albums with the lowest 10% popularity.
// Other possible field filters, depending on object types being searched, include genre, upc, and isrc. For example, q=damian+genre:reggae-pop&type=artist.

var SEARCH_URL = "https://api.spotify.com/v1/search/?type=track&q="
var GET_MUSIC_URL = "https://api.spotify.com/v1/tracks/{id}"

var prueba = function give_me_track(track_name, callback) {
 	var url = SEARCH_URL + track_name;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(url));
	xhr.send();
	xhr.onload = function(event) {
	    if (xhr.status === 200) {
			var response = JSON.parse(event.target.response);
			callback(response);
	    }
	    else {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
};

function show_track_info(artist, track) {
	// debugger;
	document.querySelector(".title").innerHTML = track;
	document.querySelector(".author").innerHTML = artist;
}

function getSongId(response) {
	var track_info = response.tracks.items[0];
	var artist = track_info.artists[0].name;
	var track = track_info.name;
	// PUT ARTIST NAME ON BROWSER
	// PUT TRACK NAME ON BROWSER
	show_track_info(artist, track);
	
	var track_id = track_info.id;


	console.log("Artist: " + artist);
	console.log("Song found: " + track);
	console.log("ID: " + track_id);
}

prueba("The Message", getSongId);


// spotifySongSearch( "run like hell", getSongId );


// function getSongId(response){
//     getSongById(response.tracks.items[0].id, songReceivedHandler);
// }

// play_btn = document.getElementByClassName("btn-play");

// play_btn.on("click", AQUIEN, give_me_artist);