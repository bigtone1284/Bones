function Game(playerArray) {
	this.boneyard = new BoneYard;
	this.train = new Train;
	this.hands = [];
	this.moves = 0;
	this.active = true;
	this.currentPlayer = null;
	this.passes = 0;
	this.dealBones(playerArray);
	this.winner = null;
}

Game.prototype.dealBones = function(playerNames) {
	playerNames.forEach(function(player) {
		var playerHand = new Hand;
		playerHand.setHand(this.boneyard, 7);
		var playerHandObject = {
			username: player,
			hand: playerHand
		};
		this.hands.push(playerHandObject)
	}.bind(this)); 
};


Game.prototype.drawBone = function() {
	if (this.emptyBoneYard()) {
		return false;
	} else {
		this.moves += 1;
		return this.getPlayerHand(this.currentPlayer).addBone(this.boneyard);
	}
};

Game.prototype.emptyBoneYard = function() {
	return this.boneyard.isEmpty();
};


Game.prototype.emptyHand = function() {
	for (var i = 0; i < this.hands.length; i++) {
		if (this.getPlayerHand(i).isEmpty()) {
			this.active = false;
			return i;
		}
	}
	return false;
};

Game.prototype.fewestPips = function() {
	var pips = 999999;
	var playerIndex = -1;
	this.hands.forEach(function(player, index) {
		if (player.hand.totalPips() < pips) {
			pips = player.hand.totalPips();
			playerIndex = index;
		} else if (player.hand.totalPips() === pips) {
			var testHand = new Hand;
			var heavyBoneOne = player.hand.heaviestBone();
			var heavyBoneTwo = this.getPlayerHand(playerIndex).heaviestBone();
			testHand.bones = [heavyBoneOne, heavyBoneTwo];
			var heavy = testHand.heaviestBone();
			if (heavy === heavyBoneTwo) {
				playerIndex = index;
			}
		}
	}.bind(this));
	return playerIndex;
};

Game.prototype.gameOver = function() {
	if (this.emptyHand()) {
		debugger
		this.winner = this.currentPlayer;
		return alert(this.getPlayerName(this.winner) + " WON!")
	} else if (this.passGameOver()) {
		this.winner = this.fewestPips();
		return alert(this.getPlayerName(this.winner) + " WON!")
	}
	return false;
};

Game.prototype.getPlayerHand = function(handsIndex) {
	return this.hands[handsIndex].hand;
}

Game.prototype.getPlayerName = function(handsIndex) {
	return this.hands[handsIndex].username;
}

Game.prototype.numberOfPlayers = function() {
	return this.hands.length
}


Game.prototype.passGameOver = function() {
	if (this.passes === this.hands.length) {
		this.active = false;
		return true;
	}
	return false;
};

Game.prototype.passTurn = function() {
	this.moves += 1;
	this.passes += 1;
};

Game.prototype.playFirst = function(boneIndex) {
	this.moves += 1;
	this.train.startBone(this.getPlayerHand(this.currentPlayer).peek(boneIndex));
	this.getPlayerHand(this.currentPlayer).playBone(boneIndex);
};

Game.prototype.playHead = function(boneIndex) {
	if (this.train.playHead(this.getPlayerHand(this.currentPlayer).peek(boneIndex))) {
		this.moves += 1;
		return this.getPlayerHand(this.currentPlayer).playBone(boneIndex);
	}
	return false;	
};

Game.prototype.playTail = function(boneIndex) {
	if (this.train.playTail(this.getPlayerHand(this.currentPlayer).peek(boneIndex))) {
		this.moves += 1;
		return this.getPlayerHand(this.currentPlayer).playBone(boneIndex);
	}
	return false;	
};

Game.prototype.switchPlayer = function() {
	if (this.currentPlayer === null) {
		return false;
	} else {
		if (this.currentPlayer === this.hands.length - 1) {
			return this.currentPlayer = 0;
		} else {
			return this.currentPlayer += 1;
		}
	}
};

Game.prototype.whoGoesFirst = function() {
	var heaviestBones = new Hand;
	this.hands.forEach(function(player, index) {
		heaviestBones.bones.push(player.hand.heaviestBone());
	});
	var heavy = heaviestBones.heaviestBone();
	return this.currentPlayer = heaviestBones.bones.indexOf(heavy);
};