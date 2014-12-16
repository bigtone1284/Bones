// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= dominoGameClasses/bone.js
//= dominoGameClasses/boneYard.js
//= dominoGameClasses/helpers.js
//= dominoGameClasses/hand.js
//= dominoGameClasses/train.js
//= dominoGameClasses/game.js
$(function() {
  console.log("Loaded, bro.");
  $('#start').on('click', function() {
    this.remove();
    game.start();
    makeDom();
  });
  $('#boneyard').on('click', function() {
  	console.log("test");
  	// game.play("pass");
  	// makeDom();
  });
  $('.hand domino').on('click', function() {
  	console.log('test');
  });
});

//figure otu how to change class of things as you change them 
//add domino class info to each piece (each suite value).

var makeDom = function() {
  $('body').empty();
  makeHand1();
  makeHand2();
  makeBoneYard();
  makeTrain();
};

var makeHand1 = function() {
	var hand1 = $('<div>').addClass('hand 1').text('Player 1');
	game.hand1.bones.forEach(function(bone) {
		var dom = $('<div>').addClass('domino').text(bone.northSuite + ' | ' + bone.southSuite);
		dom.attr({"top": bone.northSuite, "bottom": bone.southSuite});
		hand1.append(dom);
	});
	$('body').append(hand1);
};

var makeHand2 = function() {
	var hand2 = $('<div>').addClass('hand 2').text('Player 2');
	game.hand2.bones.forEach(function(bone) {
		var dom = $('<div>').addClass('domino').text(bone.northSuite + ' | ' + bone.southSuite);
		dom.attr({"top": bone.northSuite, "bottom": bone.southSuite});
		hand2.append(dom);
	});
	$('body').append(hand2);
};

var makeBoneYard = function() {
	var boneYard = $('<button>').attr('id','boneyard').text('Draw a Bone!');
	$('body').append(boneYard);
};

var makeTrain = function() {
// this train doesnt have to look ike the array on the page.  

	var train = $('<div>').addClass('train').text('Train');
	game.train.gameTrain.forEach(function(bone) {
		var dom = $('<div>').addClass('side').text(bone);
		train.append(dom);
	});
	$('body').append(train);
}



