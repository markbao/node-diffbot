# node-diffbot

node-diffbot is a wrapper for the Diffbot API. It only supports the Article and Frontpage APIs as of right now.

## Install

    npm install diffbot

## Example

```javascript
var Diffbot = require('diffbot').Diffbot

var diffbot = new Diffbot('d7bde3fafe30213a331b0f0e65d89b0f'); // your API key here

// regular function
diffbot.article({uri: 'http://techcrunch.com/2011/09/07/nintendo-gets-sued-over-the-wii/'}, function(err, response) {
  console.log(response.title);
  console.log(response.text);
  if (response.media)
    console.log(JSON.stringify(response.media));
});

// and a dash of cayenne... some addins
diffbot.article({uri: 'http://www.vanityfair.com/business/features/2011/04/jack-dorsey-201104', html: true, comments: true, stats: true}, function(err, response) {
  console.log(response.stats.fetchTime);
  console.log(response.stats.confidence);
  console.log(response.html);
});

// maybe try the frontpage api too
diffbot.frontpage({uri: 'http://prettyspace.tumblr.com/'}, function(err, response) {
  // the frontpage api is weird right now
  // the json return isn't really json...
  // it looks like xml converted to json
  // need to incorporate an xml parser to this
});
```


## Todo

* finish this readme file
* get some milk and cereal
* implement Diffbot's Follow API
* implement Diffbot's RSS API
* write tests
* write more tests
* run those tests
* run away from bears
* do first release
