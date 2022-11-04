const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQBoh2Wl-b7vi1-SqGvEwfTBWW3quZe5lyP2twZo3krT-yzJiHv2TijpdRlvsNowo_FJt0FsxDdhKKTBgJZ6E81vh_we-PkgbZJAuvQYCVEXd7W_4WOAnTxPp4Zj2HUYzKKb5yylLM6Gc81IrCIQQ4Erf9RLkMJw_MSsDYwgIJwaJAeZw5ooB64ISVo2wGyjie5xAmozuf7XTooxH3f61q4VshVKxv3K1RxowVJxgqIEsFGoB56H2dRW4EdugtchtAKcpZdF26nwweJVJ1s94zgvhpGuu8RUoB0U4dQNSXx-oelZXFQ_J69SDE1Z3dg";

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

getMyData();