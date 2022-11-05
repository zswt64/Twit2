const fs = require('fs');
const { get } = require('https');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDGrHZQXtX0J4lN2pGD1lrFwXhzNjtwXMG_UQwR9lhVB-Ne9xitQ2MTjSj415Pn2qAXRYYBNm1R9ddVMWOAXdG_wQiwEuU16dDCXDpgiYjUUFX4PbM1KFs1ZwzRarLgqgDVasAX84Qt_Un7Rnrt55-S1tHtFQoo_d37zep00kzaAa4C0iZnIXPVDC30eS0xCThWYt9klLgEJLVUDpCbrP4q_SMOnPHNzjRNn1ldX0VTh2016T56JDbv6yAEe4WhPFwtqehGIWGv8N4Jk5xwmLWjegkM5rd82jOsE28eGT4ud8Y9VDeFcgbjqPrSK7s";
const rtoken = ' AQC9v55ZSaBW0KPGx0TiL_mmFSAuwoxqfmClsX7zkz3U9ZHjoLL9Wyg8SJ5mFhaP1U7cwZMC0jD5H-q6C1wiCTuF2zfffA3fNDmMmW3vV78I3xHGMpal-Ul35FI6aRQBogk'
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

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

//This function gets the top song from the Sakura song and posts the link to the preview listening
async function getTrackswTwit() {
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
  var message = "This is a bop " + imp_Info[0];
  T.post("statuses/update", {status: message}, function(error, tweet, response) {
    if (error) {
        console.log(error);
    }
  });
  return await imp_Info;
  // console.log(val);
}

getMyData();
getTrackswTwit();
// getTracks();

// token = rtoken