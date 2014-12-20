var startGame = function() {
	var names = $('input').val().split(',');
	currentDomino = null;
	game = new Game(names);
	game.whoGoesFirst();
	$('form').empty();
	makeHands();
	currentPlayerNotice();
	$('#hands').on('click', '.player.current .domino', setCurrentDomino);
	makeGameBoard();
	makePass();
	$('#container').on('click', '#boneyard', drawBone);
	$('#container').on('click', '#pass', passTurn);
	$('#gameboard').on('click', '.firstplay', firstPlay);
	$('#gameboard').on('click', '.head', playHead);
	$('#gameboard').on('click', '.tail', playTail);
}

var currentPlayerNotice = function() {
  $('#currentPlayerNotice').remove();
  var current = $('<p>').attr('id','currentPlayerNotice').text(game.getPlayerName(game.currentPlayer) + '\'s turn')
  $('#container').append(current);
  $('.current').removeClass('current');
  $('.player.' + game.currentPlayer).addClass('current');
};

var makeGameBoard = function() {
	$('#gameboard').addClass('active');
	var firstPlay = $('<div>').addClass('firstplay').text('Play first Bone Here');
	$('#gameboard').append(firstPlay);
};

var makeHand = function(handIndex) {
  var hand = $('<div>').addClass("player " + handIndex).text(game.getPlayerName(handIndex));
  game.getPlayerHand(handIndex).bones.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').text(bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').text(bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    hand.append(dom);
  });
  $('#hands').append(hand);
}

var remakeHand = function(handIndex) {
	var hand = $('.player.' + game.currentPlayer);
	hand.empty();
	hand.text(game.getPlayerName(game.currentPlayer))
	game.getPlayerHand(handIndex).bones.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').text(bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').text(bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    hand.append(dom);
  });
};

var makeHands = function() {
	for (var i = 0; i < game.numberOfPlayers(); i++) {
    makeHand(i);
  }
};

var makeTrain = function() {
	var train = $('.train');
	train.empty()
	game.train.gameTrain.forEach(function(bone, index) {
		var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').text(bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').text(bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    train.append(dom);
	})
};

var makePass = function() {
	$('#container').empty();
	if (game.emptyBoneYard()) {
		var pass = $('<button>').attr('id','pass').text('No more bones!');
    $('#container').append(pass);
	} else {
		var boneYard = $('<button>').attr('id','boneyard').text('Draw a Bone!');
    $('#container').append(boneYard);
	}
};

var setCurrentDomino = function() {
	currentDomino = null;
	currentDomino = Number($(this).attr('bone'));
	console.log(currentDomino)
};

var firstBoneGameboard = function() {
	$('.firstplay').remove();
	var train = $('<div>').addClass('train');
	train.appendTo('#gameboard')
	makeTrain();
};

var setTrainHead = function() {
	$('.head').removeClass('head');
	$('.train .domino .northSuite').first().addClass('head');
}

var setTrainTail = function() {
	$('.tail').removeClass('tail');
	$('.train .domino .southSuite').last().addClass('tail');
};

var firstPlay = function() {
	if (currentDomino !== null) {
		game.playFirst(currentDomino);
		firstBoneGameboard();
		remakeHand(game.currentPlayer);
		setTrainHead();
		setTrainTail();
		game.switchPlayer();
		currentPlayerNotice();
	}
};

var drawBone = function() {
	game.drawBone();
	remakeHand(game.currentPlayer);
	game.switchPlayer();
	currentPlayerNotice();
	makePass();
};

var passTurn = function() {
	game.passTurn();
	if (game.passGameOver()){
		game.gameOver();
	} else {
	game.switchPlayer();
	currentPlayerNotice();
	makePass();
	}
};

var playHead = function() {
	if(currentDomino !== null) {
		if (!game.playHead(currentDomino)) {
			return alert('illegal move');
		} else {
			remakeHand(game.currentPlayer);
			makeTrain();
			setTrainHead();
			setTrainTail();
			if (!game.gameOver()) {
				game.switchPlayer();
				currentPlayerNotice();
			} else {
				game.gameOver();
			}
		}
	}
};

var playTail = function() {
	if(currentDomino !== null) {
		if (!game.playTail(currentDomino)) {
			return alert('illegal move');
		} else {
			remakeHand(game.currentPlayer);
			makeTrain();
			setTrainHead();
			setTrainTail();
			if (!game.gameOver()) {
				game.switchPlayer();
				currentPlayerNotice();
			} else {
				game.gameOver();
			}
		}
	}
};




