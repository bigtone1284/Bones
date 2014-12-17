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
			expect(game.switchPlayer()).toBe(2);
		});

		it("should increase the currentPlayer by 1 when called", function() {
			game.currentPlayer = 2;
			expect(game.switchPlayer()).toBe(0);
		});

	});

	describe("#emptyHand", function() {

		it("should return false if all players have bones in their hands", function() {
			expect(game.emptyHand()).toBe(false);
		});

		it("should return the index of the player with the empty hand in the hands array", function() {
			game.hands[2]["hand"].bones = [];
			expect(game.emptyHand()).toBe(2);
		});


	});





});