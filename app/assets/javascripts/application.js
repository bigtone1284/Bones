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
//= callbacks/callback.js
$(function() {
  console.log("Loaded, bro.");
  $('#start').on('click', function() {
    var names = $('input').val().split(',');
    currentDomino = null;
    game = new Game(names);
    $('form').empty();
    makeHands();
    makeBoneYard();
    game.whoGoesFirst();
    currentPlayer();
    makeTrain();

    $('#container').on('click', '#boneyard', function() {
      game.drawBone();
      makeHand(game.currentPlayer);
      game.switchPlayer();
      currentPlayer();
    });

    $('#hands').on('click', "." + game.currentPlayer + " .domino", setCurrentDomino);
    //I THINK THIS IS NOT WORKING THE WAY I THINK IT WILLLLLL!!!!!




    $('#gameboard').on('click', '.train', function() {
      if (currentDomino != null) {
        game.playFirst(currentDomino);
        makeHand(game.currentPlayer);
        makeTrain();
        game.switchPlayer();
        currentPlayer();
      }
    });

    $('#gameboard').on('click', '.head', function() {
      if (currentDomino != null) {
        var x = game.playHead(currentDomino);
        debugger
        if (x) {
          makeTrain();
          makeHand(game.currentPlayer);
          debugger
          //write game over function
          game.switchPlayer();
          return currentPlayer();
        }
      }
    });

    $('#gameboard').on('click', '.tail', function() {
      if (currentDomino != null) {
        var x = game.playTail(currentDomino);
        debugger
        if (x) {
          makeTrain();
          makeHand(game.currentPlayer);
          debugger
          //write game over function
          game.switchPlayer();
          return currentPlayer();
        }
      }
    });

  }); 

  

});

  // $('#gameboard').on('click', '#train', function() {
  //   makePlay('right');
  // });

  // $('#gameboard').on('click', '#left', function() {
  //   makePlay('left');
  // });

  // $('#gameboard').on('click', '#right', function() {
  //   makePlay('right');
  // });



var makeHand = function(x) {
  $(".player." + x).remove()
  var hand = $('<div>').addClass("player " + x).text(game.hands[x]["username"]);
  game.hands[x].hand.bones.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').text(bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').text(bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    hand.append(dom);
  });
  $('#hands').append(hand);
};

var makeHands = function() {
  for (var i = 0; i < game.hands.length; i++) {
    makeHand(i);
  }
};

var makeBoneYard = function() {
  if (!game.emptyBoneYard()) {
    var boneYard = $('<button>').attr('id','boneyard').text('Draw a Bone!');
    $('#container').append(boneYard);
  } else {
    var pass = $('<button>').attr('id','pass').text('No more bones!');
    $('#container').append(pass);
  }
};

var currentPlayer = function() {
  $('#currentPlayerNotice').remove();
  var current = $('<p>').attr('id','currentPlayerNotice').text(game.hands[game.currentPlayer].username + '\'s turn')
  $('#container').append(current);
};

var makeTrain = function() {
  $('.train').remove();
  var train = $('<div>').addClass('train').text("Play Here!")
  game.train.gameTrain.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino train');
    var northSuite = $('<div>').addClass('northSuite').text(bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').text(bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    train.append(dom);
  })
  $('#gameboard').append(train);
  $(".head").removeClass("head");
  $(".tail").removeClass("tail");
  $(".train .northSuite").first().addClass("head");
  $(".train .southSuite").last().addClass("tail");
};



//   $('#container').on('click', '#boneyard', function() {
//   	game.play("pass");
//   	$('.gutter').toggleClass('active');
//   	makeDom();
//   });

//   // $('#player1.active').on('click', '.domino' , setCurrentDomino);

//   $('.gutter').on('click', '.domino', setCurrentDomino);

  // $('#gameboard').on('click', '#train', function() {
  // 	makePlay('right');
  // });

  // $('#gameboard').on('click', '#left', function() {
  // 	makePlay('left');
  // });

  // $('#gameboard').on('click', '#right', function() {
  // 	makePlay('right');
  // });

// });
// var currentDomino;
// //figure otu how to change class of things as you change them 
// //add domino class info to each piece (each suite value).

// var makeDom = function() {
//   $('#container').empty();
//   $('#player1').empty();
//   $('#player2').empty();
//   $('#gameboard').empty();

//   makeHand1();
//   makeHand2();
//   makeBoneYard();
//   makeTrain();
// };



// var makeBoneYard = function() {
// 	var boneYard = $('<button>').attr('id','boneyard').text('Draw a Bone!');
// 	$('#container').append(boneYard);
// };

// var makeTrain = function() {
// // this train doesnt have to look ike the array on the page.  

// 	var train = $('<div>').attr('id','train').text('Train');
// 	$('#gameboard').append(train);
// 	game.train.gameTrain.forEach(function(bone) {
// 		var dom = $('<div>').addClass('side').text(bone);
// 		$('#gameboard').append(dom);
// 	});
// 	$('.side').first().attr("id","left");
// 	$('.side').last().attr("id","right");
// };