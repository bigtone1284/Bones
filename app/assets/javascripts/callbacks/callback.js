

var startGame = function() {
	var names = [];
	var users = $('#gameUsers').data('gameusers');
	gameNum = $('#gameNum').data('gamenum');
	for (var i = 0; i < users.length; i++) {
		names.push(users[i].username);
	}
	currentDomino = null;
	game = new Game(names);
	game.whoGoesFirst();
	$('form').empty();
	makeHands();
	// $('#hands').on('click', '.player.current .domino', setCurrentDomino);
	makeGameBoard();
	makePass();
	$('#container').on('click', '#boneyard', drawBone);
	$('#container').on('click', '#pass', passTurn);
	$('#gameboard').on('drop', '.firstplay', firstPlay);
	$('#gameboard').on('drop', '.header', playHead);
	$('#gameboard').on('drop', '.tailer', playTail);
	$('#hands').on('drag', '.player.current .domino', setCurrentDomino);
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
	polling();
}

var currentPlayerNotice = function() {
  $('#currentPlayerNotice').remove();
  var current = $('<p>').attr('id','currentPlayerNotice').text(game.getPlayerName(game.currentPlayer) + '\'s turn')
  $('#container').append(current);
  $('.current').removeClass('current');
  $('.player.' + game.currentPlayer).addClass('current');
  $('.player.current .domino').draggable();

};

var makeGameBoard = function() {
	$('#gameboard').addClass('active');
	var firstPlay = $('<div>').addClass('firstplay').text('Play first Bone Here').droppable();
	$('#gameboard').append(firstPlay);
};

var makeHand = function(handIndex) {
  var hand = $('<div>').addClass("player " + handIndex)
  										 .attr('data', game.getPlayerName(handIndex))
  										 .text(game.getPlayerName(handIndex));
  game.getPlayerHand(handIndex).bones.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').addClass('d' + bone.northSuite.toString()).text('d' + bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').addClass('d' + bone.southSuite.toString()).text('d' + bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    dom.attr('bone', index);
    hand.append(dom);
  });
  $('#hands').append(hand);
  if (hand.attr('data') !== $('#userLink').text()) {
  	hand.hide();
  }
}

var remakeHand = function(handIndex) {
	var hand = $('.player.' + game.currentPlayer);
	hand.empty();
	hand.text(game.getPlayerName(game.currentPlayer))
	game.getPlayerHand(handIndex).bones.forEach(function(bone, index) {
    var dom = $('<div>').addClass('domino');
    var northSuite = $('<div>').addClass('northSuite').addClass('d' + bone.northSuite.toString()).text('d' + bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').addClass('d' + bone.southSuite.toString()).text('d' + bone.southSuite);
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
    var northSuite = $('<div>').addClass('northSuite').addClass('d' + bone.northSuite.toString()).text('d' + bone.northSuite);
    var southSuite = $('<div>').addClass('southSuite').addClass('d' + bone.southSuite.toString()).text('d' + bone.southSuite);
    dom.append(northSuite);
    dom.append(southSuite);
    if (bone.northSuite === bone.southSuite) {
    	dom.addClass('double')	
    }
    dom.attr('bone', index);
    train.append(dom);
	})
	var header = $('<div>').addClass('header').prependTo(train).droppable();
	var tailer = $('<div>').addClass('tailer').appendTo(train).droppable();
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
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
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
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
};

var drawBone = function() {
	game.drawBone();
	remakeHand(game.currentPlayer);
	game.switchPlayer();
	currentPlayerNotice();
	makePass();
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
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
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
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
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
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
	var gameJson = { game: {
			active: true,
			hand1: game.hands[0].hand.asString(), 
			hand2: game.hands[1].hand.asString(),
			boneyard: game.boneyard.asString(),
			train: game.train.asString(),
		}
	};
	$.ajax({
        type: 'PUT',
        url: '/games/' + gameNum,
        data: gameJson,
        dataType: "JSON",
        success: function(data) {
            console.log(data);
        }
  });
};

var polling = function() {
	$.get('/games/' + gameNum + '.json')
	.done(function(data) {
		game.hands[0].hand.fromString(data.hand1); 
		game.hands[1].hand.fromString(data.hand2);
		game.boneyard.fromString(data.boneyard);
		remakeHand(0);
		remakeHand(1);
		if (game.train.gameTrain.length > 0) {
			game.train.fromString(data.train);
			makeTrain();
		};
		currentPlayerNotice();
		console.log(data);
	});
	setTimeout(polling, 5000);
}




