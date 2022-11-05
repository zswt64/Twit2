// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var words = {q: "#music", count: 20, result_type: "recent"}; 

// This function finds the latest tweet with the #music hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', words, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		// var retweetId = data.statuses.id_str;
        // var retweetId = data.statuses[0].id_str;
        // console.log(retweetId)
        var retweetmessage = data.statuses;
        var retweetdata = data.statuses
            .filter(retweetdat => retweetdat["lang"] == "en")
            .map(retweetdat => retweetdat.text)
        // console.log(data.statuses[0].id_str);
        // console.log(retweetdata);

        var x = JSON.stringify(retweetdata,["text"]);
        console.log(x);
    
        let imp_Info = [];
        for (var i = 0; i < 2; i++) {
          imp_Info.push(retweetdata[i].text);
          console.log(imp_Info[i])
        }
		// ...and then we tell Twitter we want to retweet it!
        // const textarr = retweetdata;
        for (var i = 0; i < 5; i++) {
            T.post('statuses/retweet/' + data.statuses[i].id_str, {status: "#"+ i + " This is so cool " + imp_Info[i]}, function (error, response) {
                if (response) {
                    console.log('Success! Check your bot, it should have retweeted something.')
                }
                // If there was an error with our Twitter call, we print it out here.
                if (error) {
                    console.log('There was an error with Twitter:', error);
                }
            })
        }

	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

var word = {q: "#music", count: 60, result_type: "recent"}; 

//This function quotes latest music hashtag tweets, adding statement that this is cool, and all the information from the tweet
function quoteTweet() {
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
          let imp_Info = [];
          for (var i = 30; i < 44; i++) {
            imp_Info.push(retweetdata[i]);
          }
          console.log(imp_Info);
          var message = "#"+ 1 + " This is so cool:  " + imp_Info[0];
          T.post("statuses/update", {status: message}, function(error, tweet, response) {
            if (error) {
                console.log(error);
            }
          });
        //}
        }
        });


}

// Try to retweet something as soon as we run the program...
// retweetLatest();
quoteTweet();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);