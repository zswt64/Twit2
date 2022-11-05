const fs = require('fs');
const { get } = require('https');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAOrjnvRTNhkJGPlSMDA5jKAhZzPbB4HMwIaiQkxTM52fTupHToOuProTAbfqWxVoCBYnOROKltUu4lBqZiOvi3eRy4TXHf4LkoEKTMTOXCcxWZN-_sunffN70oRZFOCFINtz93Ev0PG7J3CV-FrD0rB4boUVDqW-aoWziSGnTWDopBtt_j-x5cQpCUJOpQfCLVkF7BpWTONj4SmTvM9A3lJLH2QFNUlMdmm0evaaAkBl1vdWmnAgb343U739kvzDna2OO61OSK-iHluKC7ROUrOmA_uY05FbfzlDrF1MReHiwwljPedRyAp7-Wx0A";
const rtoken = ' AQC9v55ZSaBW0KPGx0TiL_mmFSAuwoxqfmClsX7zkz3U9ZHjoLL9Wyg8SJ5mFhaP1U7cwZMC0jD5H-q6C1wiCTuF2zfffA3fNDmMmW3vV78I3xHGMpal-Ul35FI6aRQBogk'
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);



//NOTE:to use spotify you must have a spotify account and run node spotifyi to refresh the token. 
//Then in the terminal copy the new token as the token variable


//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);
    // getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//This function gets the tracks that are related to this song, Sakura
async function getTracks() {
    const value = await spotifyApi.searchTracks("Sakura");
    // console.log(value.body.tracks);
    let val = await value.body.tracks.items;
    // var x = JSON.stringify(val,["preview_url"]);
    // console.log(x);

    let imp_Info = [];
    for (var i = 0; i < 2; i++) {
      imp_Info.push(val[i].preview_url)
    }


    // let val = value.body.tracks[0];
    console.log(imp_Info[0]);
    return await imp_Info;
    // console.log(val);
}


// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));
var word = {q: "#music", count: 60, result_type: "recent"}; 

async function getTrackswTwit() {
  var maxlenval = "";


   T.get('search/tweets', word, function (error, data) {
    num = Math.random(60)
    console.log(num);
    // log out any errors and responses
    console.log(error, data);
    // If our search request to the server had no errors...
    if (!error) {
      var retweetmessage = data.statuses;
      var retweetdata = data.statuses
          .filter(retweetdat => retweetdat["lang"] == "en")
          .map(retweetdat => retweetdat.text)
      let tweetss = [];
      for (var i = 30; i < 44; i++) {
        tweetss.push(retweetdata[i]);
      }
      console.log(tweetss);

      const value = tweetss[0].split(" ");

      console.log(value);

      var maxlen = -1;
      for (var i = 0; i < value.length; i++) {
        if (value[i].length > maxlen && value[i].substring(0,1) != "#" && value[i].substring(0,2) != "ht" && value[i].substring(0,1) != "@") {
          maxlen = value[i].length;
          maxlenval = value[i];
        }
      }

      postSong(maxlenval);
    //}
    }
    });
}

//This function gets the top song from the Sakura song which is the one by Rosalia and posts the link to the preview listening
async function blastRosalia() {
  const value = await spotifyApi.searchTracks("Sakura");
  // console.log(value.body.tracks);
  let val = await value.body.tracks.items;
  // var x = JSON.stringify(val,["preview_url"]);
  // console.log(x);

  let imp_Info = [];
  let title = [];
  for (var i = 0; i < 2; i++) {
    imp_Info.push(val[i].preview_url);
    title.push(val[i].name);
  }

  let randnum = Math.random(100) + 1;
  // let val = value.body.tracks[0];
  console.log(imp_Info[0]);
  var message = "#" + randnum + " on the top 100!!" + " This song is a bop!: " + imp_Info[0];
  T.post("statuses/update", {status: message}, function(error, tweet, response) {
    if (error) {
        console.log(error);
    }
  });
  return await imp_Info;
}


//This method takes the song variable given from the trackswithTwit method and 
//finds songs related to the word/song and posts the first song that appears
//with the preview link and title and link to view on spotify
async function postSong(song) {
  const value = await spotifyApi.searchTracks(await song);
  // console.log(value.body.tracks);
  let val = await value.body.tracks.items;
  // var x = JSON.stringify(val,["preview_url"]);
  // console.log(x);

  let imp_Info = [];
  let title = [];
  let spotlink = []
  for (var i = 0; i < 2; i++) {
    imp_Info.push(val[i].preview_url);
    title.push(val[i].name);
    spotlink.push(val[i].uri);
  }
  // console.log(spotlink);

  let randnum = Math.random(100) + 1;
  // let val = value.body.tracks[0];
  console.log(imp_Info[0]);
  var message = "The song, "+ title + " : " + spotlink + ", related to the word, " + song +  " is #" + randnum + " on the top 100!!" + " This song is a bop! Listen Here: " + imp_Info[0];
  T.post("statuses/update", {status: message}, function(error, tweet, response) {
    if (error) {
        console.log(error);
    }
  });
  return await imp_Info;
}
// getMyData();
getTrackswTwit();
// blastRosalia();
// postSong();
// getTracks();

// token = rtoken