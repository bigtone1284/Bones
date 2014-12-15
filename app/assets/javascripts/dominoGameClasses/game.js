var game = {
	boneYard: '',
	train: '',
	hand1: '',
	hand2: '',
	currentPlayer: 1,
	active: true,
	start: function() {
		this.boneYard = new BoneYard;
		this.train = new Train;
		this.hand1 = new Hand;
		this.hand1.setHand(this.boneYard, 7);
		this.hand2 = new Hand;
		this.hand2.setHand(this.boneYard, 7);
	},
	play: function(move, bone) {
		var hand;
		if (this.currentPlayer === 1) {
			hand = this.hand1;
		} else {
			hand = this.hand2;
		}

		if (move === "pass" && this.boneYard.length) {
			hand.addBone(this.BoneYard);
			this.switchPlayer();
		} else {
			var x = this.train.playBone(hand.peek(bone), move);
			
			if (x) {
				hand.playBone(bone);
				this.switchPlayer();
			}
		}
	},
	checkWin: function() {
		if (this.hand1.bones.length === 0 || this.hand2.bones.length === 0) {
			alert(this.currentPlayer + " has won!");
			return true;
		} else {
			return false;
		}
	},
	switchPlayer: function() {
		this.currentPlayer *= -1;
	}



};