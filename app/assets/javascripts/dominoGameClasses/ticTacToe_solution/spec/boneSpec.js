describe("Cell", function() {
	var cell;

	beforeEach(function(){
		cell = new Cell();
	});

	describe("value", function() {

		it("should have a value", function() {
			expect(cell.value).toBeDefined();
		});

		it("is 0 when the cell is empty", function() {
			expect(cell.value).toBe(0);
		});
	});
	describe("setState", function() {

		it("can change the state of the value", function() {
			expect(cell.setState).toBeDefined();
		});

		it("should change the state of the value", function() {
			cell.setState(-1);
			expect(cell.value).toBe(-1);
		});
	});

	describe("playable", function() {

		it("is playable when there is no value", function() {
			expect(cell.playable()).toBe(true);
		});

		it("is not playable when there is a value already", function() {
			cell.setState(1);
			expect(cell.playable()).toBe(false);
		});
	});

	describe("render", function() {

		it("should return the current state of the cell", function() {
			cell.setState(1);
			expect(cell.render()).toBe(1);
		});
	});

});