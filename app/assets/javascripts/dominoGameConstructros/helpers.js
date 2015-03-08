var popRandomElement = function(anArray) {
  var randomIndex = Math.floor(Math.random() * anArray.length);
  return anArray.splice(randomIndex, 1)[0];
};