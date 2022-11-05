// Our Twitter library
const { request } = require('express');
var Twit = require('twit');


// We need to include our configuration file
var T = new Twit(require('./config.js'));



//variable to search through recent posts under #music
var param = {q: "#music", count: 60, result_type: "recent"};


//urls for the related words function from the wordnik api, 
var url1 = "https://api.wordnik.com/v4/word.json/"
"https://api.wordnik.com/v4/word.json/orange/relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=5n9terp6ususoehfh36a8cke0yfdvroprv6ww48m4osl5pm14"
var url2 = "/relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=5n9terp6ususoehfh36a8cke0yfdvroprv6ww48m4osl5pm14"







  

//function that searched for #music posts, retweets one, and adds the statement, "this is a cool rhyme" then a list of rhyming words based on the word parameter
function tweetMe(word) {
  T.get('search/tweets', param, function (error, data) {
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
      let imp_Info = [];
      for (var i = 30; i < 44; i++) {
        imp_Info.push(retweetdata[i]);
      }
      console.log(imp_Info);
      var message = "Here's a cool rhyme: " + word + " " + imp_Info[0];
      T.post("statuses/update", {status: message}, function(error, tweet, response) {
        if (error) {
            console.log(error);
        }
      });
    //}
    }
    });
}


//main method where method calls will be made
function runStuff(wordToGrab) {

//converting the wordnik api to an object we can use
  fetch(url1 + wordToGrab + url2)
  .then(res => res.json())
  .then(out => {
    var temp;
    temp = out[0]["words"];
    console.log(temp);

    //call to tweete function
    tweetMe(temp);


  });


}
//main method call
runStuff("shark");

//whatever word we are rhyming with gets passed into main function






// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(runStuff, 1000 * 60 * 60);
