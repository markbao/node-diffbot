// diffbot - node.js api wrapper for diffbot
// http://github.com/markbao/node-diffbot
//
// Copyright 2011 Mark Bao
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var http = require('http'),
    url = require('url'),
    request = require('request'),
    urlregex = /^https?:/;

var Diffbot = exports.Diffbot =
  function(token) {
    this.token = token || undefined;
  }

Diffbot.prototype.article = function (options, callback) {
  for (var i in options) {
    this[i] = options[i];
  }

  var options = this;

  // support 'url'
  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if (!options.uri) {
    throw new Error("the URI is required.");
  }

  var diffbot_url = "http://api.diffbot.com/v3/article?token=" + this.token + "&url=" + encodeURIComponent(options.uri);

  // process extras
  if (options.callback) {
    diffbot_url += "&callback=" + callback;
  }

  if (options.html) {
    diffbot_url += "&html=1";
  }

  if (options.dontStripAds) {
    diffbot_url += "&dontStripAds=1";
  }

  if (options.tags) {
    diffbot_url += "&tags=1";
  }

  if (options.comments) {
    // experimental
    diffbot_url += "&comments=1";
  }

  if (options.stats) {
    diffbot_url += "&stats=1";
  }

  request({uri: diffbot_url}, function(error, response, body) {
    if (error) {
      return callback(error, undefined);
    } else {
      try {
        var parsedJSON = JSON.parse(body);
        if (options.singlePage) {
            if (parsedJSON.objects !== undefined && parsedJSON.objects[0] !== undefined) {
                parsedJSON = parsedJSON.objects[0];
            }
        }
      } catch (e) {
        return callback(e, undefined);
      }
      return callback(false, parsedJSON);
    }
  });
}

Diffbot.prototype.frontpage = function (options, callback) {
  for (var i in options) {
    this[i] = options[i];
  }

  var options = this;

  // support 'url'
  if (options.url) {
    options.uri = options.url;
    delete options.url;
  }

  if (!options.uri) {
    throw new Error("the URI is required.");
  }

  var diffbot_url = "http://api.diffbot.com/v3/frontpage?token=" + this.token + "&url=" + encodeURIComponent(options.uri) + "&format=json";

  request({uri: diffbot_url}, function(error, response, body) {
    if (error) {
      return callback(error, undefined);
    } else {
      try {
        var parsedJSON = JSON.parse(body);
      } catch (e) {
        return callback(e, undefined);
      }
      return callback(false, parsedJSON);
    }
  });
}
