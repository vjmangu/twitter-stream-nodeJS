const Twit = require('twit');
const express = require('express');
const app = express();
const config = require('./config.js');


const T = new Twit(config);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(express.static('public'));


const params = {
    q: '#HelloTennisWorld',
    count: 100,
    result_type: 'recent',
    lang: 'en'
  }

  //To get tweets based on search params. 
  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      console.log(data);
     for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      //let id = { id: data.statuses[i].id_str }
      const userName = data.statuses[0].user.screen_name;
      const tweetId = data.statuses[0].id_str;

    }
    } else {
      console.log(err);
    }
  })

  //Twitter streaming api to get real time tweets and send an automated reply, using twitter post. 
  var stream = T.stream('statuses/filter', { track: '#HelloWorld', language: 'en' })

  stream.on('tweet', function (tweet) {


    const tweetId = tweet.id_str;
    const userName = tweet.user.screen_name;

     T.post('statuses/update', { in_reply_to_status_id: tweetId, status: `@${userName} automated reply!!` },(err, response)=>
    {
    if (response) 
        console.log('auto-reply successful!! '+ tweetId)
    if (err) 
        console.log('Something went wrong while replying')
    }
    )
  })

  /*
   // To fav a tweet. 
   T.post('favorites/create', id, function(err, response){
    // If the favorite fails, log the error message
    if(err){
      console.log(err[0].message);
    }
    // If the favorite is successful, log the url of the tweet

  });
  */


  app.listen('3009', function() {
    console.log('Your app is listening on port 3009');
  });

  app.get('/', (req, res) => res.send('Hello World!'))
