// Use the following API Endpoints:
// https://api.spotify.com/v1/search to search for type=track
// https://api.spotify.com/v1/tracks/{id} to get a track's info and audio file.

// Field filters
// By default, results are returned when a match is found in any field of the target object type. Searches can be made more specific by specifying an album, artist or track field filter. For example, the query q=album:gold+artist:abba&type=album will only return albums with the text "gold" in the album name and the text "abba" in the artist's name.
// The field filter year can be used with album, artist and track searches to limit the results to a particular year (for example, q=bob+year:2014) or date range (for example, q=bob+year:1980-2020).
// The field filter tag:new can be used in album searches to retrieve only albums released in the last two weeks. The field filter tag:hipster can be used in album searches to retrieve only albums with the lowest 10% popularity.
// Other possible field filters, depending on object types being searched, include genre, upc, and isrc. For example, q=damian+genre:reggae-pop&type=artist.

var SEARCH_URL = "https://api.spotify.com/v1/search/?type=track&q=";
var GET_MUSIC_URL = "https://api.spotify.com/v1/tracks/";

var audio_player = document.querySelector("#audio");
var play_btn = document.querySelector(".btn-play");
var search_btn = document.querySelector("#search-btn");
var search_field = document.querySelector("#search-field");

var Song_playing = false;

function give_me_track(track_name, callback) {
	play_btn.classList.add('disabled');
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
}

function show_track_info(artist, track) {
	document.querySelector(".title").innerHTML = track;
	document.querySelector(".author").innerHTML = artist;
}

function handle_song_loading(response){
	// Change the image to the album's one
	var image_url = response.album.images[0].url;
	document.querySelector(".cover img").setAttribute("src", image_url);
	// Set the origin URL of the preview
	audio_player.setAttribute("src", response.preview_url);
	play_btn.classList.remove('disabled');
}

function load_song(id, callback) {
	var url = GET_MUSIC_URL + id;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(url));
	xhr.send();
	xhr.onload = function(event) {
	    if (xhr.status === 200) {
			var response = JSON.parse(event.target.response);
			console.log("Track found & loaded!");
			callback(response);
	    }
	    else {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};	
}

function getSongId(response) {
	var track_info = response.tracks.items[0];
	var artist = track_info.artists[0].name;
	var track = track_info.name;
	track_id = track_info.id;
	// Update the track info in screen
	show_track_info(artist, track);
	load_song(track_id, handle_song_loading);
}

function playSong() {
	if (play_btn.classList.contains("playing")) {
		play_btn.classList.remove("playing");
		audio_player.pause();
	}
	else{
		play_btn.classList.add("playing");
		audio_player.play();
	}
}

function handle_track_query() {
	query = search_field.value;
	give_me_track(query, getSongId);
}

// Progress bar animation
document.querySelector("#audio").ontimeupdate = function() {
	document.querySelector(".seekbar progress").value = document.querySelector("#audio").currentTime;
};

play_btn.addEventListener("click", playSong);
search_btn.addEventListener("click", handle_track_query);