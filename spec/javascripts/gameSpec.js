describe("Game", function() {
	var game;

	beforeEach(function() {
		game = new Game(['hari','tony','jimbob']);
	});

	it("should initialize moves = 0", function() {
		expect(game.moves).toBe(0);
	});

	it("should initialize active to be true", function() {
		expect(game.active).toBe(true);
	});

	describe("#dealBones", function() {

		it("should deal out n number of hands for the number of players", function() {
			expect(game.hands.length).toBe(3);
		});

		it("should create hands as a nested collection, with each element containing a username", function() {
			expect(game.hands[0]["username"]).toBe('hari');
		});

		it("should create hands as a nested collection, with each element containing a player's hand for a given game", function() {
			var hand = game.hands[1]["hand"];
			handIsPrototype = Hand.prototype.isPrototypeOf(hand);
			expect(handIsPrototype).toBe(true);
		});

	});

	describe("#whoGoesFirst", function() {
		var playerOneHand;
		var playerTwoHand;
		var playerThreeHand;

		beforeEach(function() {
			playerOneHand = game.hands[0]["hand"];
			playerTwoHand = game.hands[1]["hand"];
			playerThreeHand = game.hands[2]["hand"];
		});

		it("should set the currentPlayer to whomever has the heaviest Bone", function() {
			playerOneHand.bones = [new Bone(6,5)];
			playerTwoHand.bones = [new Bone(6,6)];
			playerThreeHand.bones = [new Bone(4,4)];
			game.whoGoesFirst();
			expect(game.currentPlayer).toBe(1);
		});

		it("edge case -- very low double versus higher non-doubles", function() {
			playerOneHand.bones = [new Bone(0,0)];
			playerTwoHand.bones = [new Bone(2,3)];
			playerThreeHand.bones = [new Bone(5,6)];
			game.whoGoesFirst();
			expect(game.currentPlayer).toBe(0);
		});

		it("edge case -- all doubles", function() {
			playerOneHand.bones = [new Bone(0,0)];
			playerTwoHand.bones = [new Bone(2,2)];
			playerThreeHand.bones = [new Bone(5,5)];
			game.whoGoesFirst();
			expect(game.currentPlayer).toBe(2);
		});

		it("edge case -- no doubles", function() {
			playerOneHand.bones = [new Bone(1,0)];
			playerTwoHand.bones = [new Bone(2,6)];
			playerThreeHand.bones = [new Bone(6,4)];
			game.whoGoesFirst();
			expect(game.currentPlayer).toBe(2);
		});

	});

	describe("#switchPlayer", function() {

		it("should return false if an intial player has not been set", function() {
			expect(game.switchPlayer()).toBe(false);
		});

		it("should increase the currentPlayer by 1 when called", function() {
			game.currentPlayer = 1;
			game.switchPlayer();
			expect(game.currentPlayer).toBe(2);
		});

		it("should increase the currentPlayer by 1 when called", function() {
			game.currentPlayer = 2;
			game.switchPlayer();
			expect(game.currentPlayer).toBe(0);
		});

	});

	describe("#emptyHand", function() {

		it("should return false if all players have bones in their hands", function() {
			expect(game.emptyHand()).toBe(false);
		});

		it("should return the index of the player with the empty hand in the hands array", function() {
			game.hands[2]["hand"].bones = [];
			expect(game.emptyHand()).toBe(2);
			expect(game.active).toBe(false);
		});

	});

	describe("#fewestPips", function() {

		var playerOneHand;
		var playerTwoHand;
		var playerThreeHand;

		beforeEach(function() {
			playerOneHand = game.hands[0]["hand"];
			playerTwoHand = game.hands[1]["hand"];
			playerThreeHand = game.hands[2]["hand"];
		});

		it("should return the index of the player with the fewest pips", function() {
			playerOneHand.bones = [new Bone(3,4)];
			playerTwoHand.bones = [new Bone(1,2)];
			playerThreeHand.bones = [new Bone(5,5)];
			expect(game.fewestPips()).toBe(1);
		});

		it("should return the index of the player who doesn't have the heaviest bone in case there is a tie", function() {
			playerOneHand.bones = [new Bone(1,2)];
			playerTwoHand.bones = [new Bone(0,3)];
			playerThreeHand.bones = [new Bone(5,5)];
			expect(game.fewestPips()).toBe(0);
		});

	});

	describe("#emptyBoneYard", function() {

		it("should return false if there boneyard has bones", function() {
			expect(game.emptyBoneYard()).toBe(false);
		});

		it("should return true if the boneyard is empty", function() {
			game.boneyard.bones = [];
			expect(game.emptyBoneYard()).toBe(true);
		});

	});

	describe("#playFirst", function() {

		it("should play the first bone", function() {
			game.whoGoesFirst();
			game.playFirst(0);
			expect(game.train.gameTrain.length).toBe(1);
		});

	});

	describe("#playHead", function() {

		var playerOneHand;
		var playerTwoHand;
		var playerThreeHand;

		beforeEach(function() {
			game.currentPlayer = 0;
			game.train.gameTrain = [new Bone(6,6)];
			playerOneHand = game.hands[0]["hand"];
			playerTwoHand = game.hands[1]["hand"];
			playerThreeHand = game.hands[2]["hand"];
		});

		it("should return false if a bone may not be played", function() {
			playerOneHand.bones = [new Bone(5,4)];
			expect(game.playHead(0)).toBe(false);
		});

		it("should play bone to the train if its a legal move", function() {
			var testBone = new Bone(6,4);
			playerOneHand.bones = [testBone];
			game.playHead(0);
			expect(game.train.gameTrain.indexOf(testBone) > -1).toBe(true);
		})

		it("should remove the played bone from the player's hand", function() {
			var testBone = new Bone(6,4);
			var testBone2 = new Bone(2,3);
			playerOneHand.bones = [testBone, testBone2];
			game.playHead(0);
			expect(playerOneHand.bones.indexOf(testBone) > -1).toBe(false);
		});

	});
		
		describe("#playTail", function() {

		var playerOneHand;
		var playerTwoHand;
		var playerThreeHand;

		beforeEach(function() {
			game.currentPlayer = 0;
			game.train.gameTrain = [new Bone(6,6)];
			playerOneHand = game.hands[0]["hand"];
			playerTwoHand = game.hands[1]["hand"];
			playerThreeHand = game.hands[2]["hand"];
		});

		it("should return false if a bone may not be played", function() {
			playerOneHand.bones = [new Bone(5,4)];
			expect(game.playTail(0)).toBe(false);
		});

		it("should play bone to the train if its a legal move", function() {
			var testBone = new Bone(6,4);
			playerOneHand.bones = [testBone];
			game.playTail(0);
			expect(game.train.gameTrain.indexOf(testBone) > -1).toBe(true);
		})

		it("should remove the played bone from the player's hand", function() {
			var testBone = new Bone(6,4);
			var testBone2 = new Bone(2,3);
			playerOneHand.bones = [testBone, testBone2];
			game.playTail(0);
			expect(playerOneHand.bones.indexOf(testBone) > -1).toBe(false);
		});

	});


	describe("#drawBone", function() {

		it("should give users a bone from the boneyard", function() {
			game.currentPlayer = 0;
			var playerOneHand = game.hands[0]["hand"].bones;
			expect(playerOneHand.length).toBe(7);
			expect(game.boneyard.bones.length).toBe(7);
			game.drawBone();
			expect(playerOneHand.length).toBe(8);
			expect(game.boneyard.bones.length).toBe(6);
		});

		it("should return false if the boneyard is empty", function() {
			game.currentPlayer = 0;
			var playerOneHand = game.hands[0]["hand"].bones;
			game.boneyard.bones = [];
			expect(game.drawBone()).toBe(false);
		})

	});

	describe("#passTurn", function() {

		it("#should increase passes by 1", function() {
			game.currentPlayer = 0;
			expect(game.passes).toBe(0);
			game.passTurn();
			expect(game.passes).toBe(1);
		})

	});

	describe("#passGameOver", function() {

		it("#should return false if the game is not over", function() {
			expect(game.passGameOver()).toBe(false);
		});

		it("should return true if passes = the number of players", function() {
			game.passes = 3;
			expect(game.passGameOver()).toBe(true);
			expect(game.active).toBe(false);
		})

	});


});

