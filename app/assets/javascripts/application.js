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
  var currentDomino = 0;
  $('#start').on('click', function() {
    this.remove();
    game.start();
    makeDom();
  });
  $('#container').on('click', '#boneyard', function() {
  	game.play("pass");
  	makeDom();
  });
  $('#player1').on('click', '.domino' , function() {
  	currentDomino = $(this);
  });
  $('#player2').on('click', '.domino', function() {
  	currentDomino = $(this);
  });

  $('#gameboard').on('click', '#train', function() {
  	if (currentDomino) {
  		if (game.train.gameTrain.length === 0) {
  			game.play('right', Number(currentDomino.attr("bone")));
  			game.checkWin();
  			makeDom();
  		}
  	}
  });

  $('#gameboard').on('click', '#left', function() {
  	if (currentDomino) {
  		game.play('left', Number(currentDomino.attr("bone")));
  		game.checkWin();
  		makeDom();
  	}
  });

  $('#gameboard').on('click', '#right', function() {
  	game.play('right', Number(currentDomino.attr("bone")));
  	game.checkWin();
  	makeDom();
  });

});

//figure otu how to change class of things as you change them 
//add domino class info to each piece (each suite value).

var makeDom = function() {
  $('#container').empty();
  $('#player1').empty();
  $('#player2').empty();
  $('#gameboard').empty();

  makeHand1();
  makeHand2();
  makeBoneYard();
  makeTrain();
};

var makeHand1 = function() {
	var i = 0;
	var hand1 = $('<div>').addClass('hand 1').text('Player 1');
	game.hand1.bones.forEach(function(bone) {
		var dom = $('<div>').addClass('domino').text(bone.northSuite + ' | ' + bone.southSuite);
		dom.attr('bone', i);
		i++;
		hand1.append(dom);
	});
	$('#player1').append(hand1);
};

var makeHand2 = function() {
	var i = 0;
	var hand2 = $('<div>').addClass('hand 2').text('Player 2');
	game.hand2.bones.forEach(function(bone) {
		var dom = $('<div>').addClass('domino').text(bone.northSuite + ' | ' + bone.southSuite);
		dom.attr('bone', i);
		i++;
		hand2.append(dom);
	});
	$('#player2').append(hand2);
};

var makeBoneYard = function() {
	var boneYard = $('<button>').attr('id','boneyard').text('Draw a Bone!');
	$('#container').append(boneYard);
};

var makeTrain = function() {
// this train doesnt have to look ike the array on the page.  

	var train = $('<div>').attr('id','train').text('Train');
	$('#gameboard').append(train);
	game.train.gameTrain.forEach(function(bone) {
		var dom = $('<div>').addClass('side').text(bone);
		$('#gameboard').append(dom);
	});
	$('.side').first().attr("id","left");
	$('.side').last().attr("id","right");
};