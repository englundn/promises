/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var getProfile = require('./promisification.js').getGitHubProfileAsync;
var getFirstLine = require('./promiseConstructor.js').pluckFirstLineFromFileAsync;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return getFirstLine(readFilePath)
    .then(function(firstLine) {
      return getProfile(firstLine);
    })
    .then(function(profile) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(profile));
    })
    .catch(function(error) {
      console.log(error);
    })
    .finally(function() {
      console.log('Done.');
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
