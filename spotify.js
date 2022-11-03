// /**
//  * This is an example of a basic node.js script that performs
//  * the Authorization Code oAuth2 flow to authenticate against
//  * the Spotify Accounts.
//  *
//  * For more information, read
//  * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
//  */

//  var express = require('express'); // Express web server framework
//  var request = require('request'); // "Request" library
//  var cors = require('cors');
//  var querystring = require('querystring');
//  var cookieParser = require('cookie-parser');
 
//  var client_id = '5bcd9ff8e4fe4a64b63c5f723c14cf6b'; // Your client id
//  var client_secret = '6568cb381bca4810947d43563d642264'; // Your secret
//  var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
 
//  /**
//   * Generates a random string containing numbers and letters
//   * @param  {number} length The length of the string
//   * @return {string} The generated string
//   */
//  var generateRandomString = function(length) {
//    var text = '';
//    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
//    for (var i = 0; i < length; i++) {
//      text += possible.charAt(Math.floor(Math.random() * possible.length));
//    }
//    return text;
//  };
 
//  var stateKey = 'spotify_auth_state';
 
//  var app = express();
 
//  app.use(express.static(__dirname + '/public'))
//     .use(cors())
//     .use(cookieParser());
 
//  app.get('/login', function(req, res) {
 
//    var state = generateRandomString(16);
//    res.cookie(stateKey, state);
 
//    // your application requests authorization
//    var scope = 'user-read-private user-read-email';
//    res.redirect('https://accounts.spotify.com/authorize?' +
//      querystring.stringify({
//        response_type: 'code',
//        client_id: client_id,
//        scope: scope,
//        redirect_uri: redirect_uri,
//        state: state
//      }));
//  });
 
//  app.get('/callback', function(req, res) {
 
//    // your application requests refresh and access tokens
//    // after checking the state parameter
 
//    var code = req.query.code || null;
//    var state = req.query.state || null;
//    var storedState = req.cookies ? req.cookies[stateKey] : null;
 
//    if (state === null || state !== storedState) {
//      res.redirect('/#' +
//        querystring.stringify({
//          error: 'state_mismatch'
//        }));
//    } else {
//      res.clearCookie(stateKey);
//      var authOptions = {
//        url: 'https://accounts.spotify.com/api/token',
//        form: {
//          code: code,
//          redirect_uri: redirect_uri,
//          grant_type: 'authorization_code'
//        },
//        headers: {
//          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//        },
//        json: true
//      };
 
//      request.post(authOptions, function(error, response, body) {
//        if (!error && response.statusCode === 200) {
 
//          var access_token = body.access_token,
//             refresh_token = body.refresh_token;
 
//          var options = {
//            url: 'https://api.spotify.com/v1/me',
//            headers: { 'Authorization': 'Bearer ' + access_token },
//            json: true
//          };
 
//          // use the access token to access the Spotify Web API
//          request.get(options, function(error, response, body) {
//            console.log(body);
//          });
 
//          // we can also pass the token to the browser to make requests from there
//          res.redirect('/#' +
//            querystring.stringify({
//              access_token: access_token,
//              refresh_token: refresh_token
//            }));
//        } else {
//          res.redirect('/#' +
//            querystring.stringify({
//              error: 'invalid_token'
//            }));
//        }
//      });
//    }
//  });
 
//  app.get('/refresh_token', function(req, res) {
 
//    // requesting access token from refresh token
//    var refresh_token = req.query.refresh_token;
//    var authOptions = {
//      url: 'https://accounts.spotify.com/api/token',
//      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//      form: {
//        grant_type: 'refresh_token',
//        refresh_token: refresh_token
//      },
//      json: true
//    };
 
//    request.post(authOptions, function(error, response, body) {
//      if (!error && response.statusCode === 200) {
//        var access_token = body.access_token;
//        res.send({
//          'access_token': access_token
//        });
//      }
//    });
//  });
 
//  console.log('Listening on 8888');
//  app.listen(8888);





const SpotifyWebApi = require('spotify-web-api-node');
// const { access_token } = require('./config');

/*
 * This example shows how to search for a track. The endpoint is documented here:
 * https://developer.spotify.com/documentation/web-api/reference/search/

 * Since authorization is now required, this example retrieves an access token using the Authorization Code Grant flow,
 * documented here: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
 *
 * Obtain the `authorizationCode` below as described in the Authorization section of the README.
 */

const authorizationCode = "BQBzH_s0RJc0bEjqNyWEllykVNw8cLFOruwAWP_xjhp4PwpZ0kAiI3v42Jnla1X-TYvDV5c3AIh6NAZV5xQ2z5P-Bl4lyIdIleanR3mBPHCLAjDdfb8L9N-nSb34OV1W871VaivNvvs7NOWWPrTqh62KjrrFpAq7QQ5PPw3IoCC38Db-BcwPsSuz9cn54tx6DlnHPkSmGG9oYYqPOp1GCA8VDhcY-b0EspLOuyyJZpPAqqSyHxlurIMcN8";
// spotifyApi.setAccessToken('BQBzH_s0RJc0bEjqNyWEllykVNw8cLFOruwAWP_xjhp4PwpZ0kAiI3v42Jnla1X');

/**
 * Get the credentials from Spotify's Dashboard page.
 * https://developer.spotify.com/dashboard/applications
 */
console.log("mee")
const spotifyApi = new SpotifyWebApi({
  clientId: '5bcd9ff8e4fe4a64b63c5f723c14cf6b',
  clientSecret: '6568cb381bca4810947d43563d642264',
  redirectUri: 'http://localhost:8888/callback'
});

console.log("stop")
spotifyApi.setAccessToken('BQBzH_s0RJc0bEjqNyWEllykVNw8cLFOruwAWP_xjhp4PwpZ0kAiI3v42Jnla1X');


spotifyApi
  .authorizationCodeGrant(authorizationCode)
  .then(function(data) {
    console.log('Retrieved access token', data.body['access_token']);

    // Set the access token
    spotifyApi.setAccessToken(data.body['access_token']);

    // Use the access token to retrieve information about the user connected to it
    return spotifyApi.searchTracks('Love');
  })
  .then(function(data) {
    // Print some information about the results
    console.log('I got ' + data.body.tracks.total + ' results!');

    // Go through the first page of results
    var firstPage = data.body.tracks.items;
    console.log('The tracks in the first page are (popularity in parentheses):');

    /*
     * 0: All of Me (97)
     * 1: My Love (91)
     * 2: I Love This Life (78)
     * ...
     */
    firstPage.forEach(function(track, index) {
      console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
    });
  }).catch(function(err) {
    console.log('Something went wrong:', err.message);
  });