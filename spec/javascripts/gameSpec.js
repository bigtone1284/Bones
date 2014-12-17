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

	});

});