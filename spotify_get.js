const fs = require('fs');
const { get } = require('https');
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQDQGASg1MvmTMza35YGhHRWMiaF43UdM5Zt5dJi7VrHH19JavdFzjqZK3J1lSG4Y5hZxy7uYK1Mz58oKr3LQsWRuLsZMha_whYEwOjYsvW5Wqm8uudiZEQojEQzo7HDqAofjSgvyUoPTYj30J_MYpkc99_CunXTeL0dGdaWCDg_DGJO4-qE-XqL2U99MBaUNdDRlOvkZijfMAOsooLzVCUo33p_znyh7PIbyQVqUGkFJ8au3OuyOrK7EYSt5UQctnxIE2my4jbA8vlElUnp10Ze9NS3GJmedsoRcOtNcQlRNVYcz8iS5PXTlnk3SGc";
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

async function getTracks() {
    const value = await spotifyApi.searchTracks("Sakura");
    // console.log(value.body.tracks);
    let val = value.body.tracks.items;
    var x = JSON.stringify(val,["preview_url"]);
    console.log(x);

    let imp_Info = [];
    for (var i = 0; i < 2; i++) {
      imp_Info.push(val[i].preview_url)
    }


    // let val = value.body.tracks[0];
    console.log(imp_Info[0]);
    // console.log(val);
}

// getMyData();

getTracks()

// token = rtoken