describe("Train", function() {
	var hand;
	var boneyard;
	var train;

	beforeEach(function() {
    hand = new Hand();
    boneyard = new BoneYard;
  	hand.setHand(boneyard, 7);
  	train = new Train;
  });

  describe("#playBone", function() {

  	it("should add a bone to the an empty train", function() {
  		var bone = hand.bones[0];
  		train.playBone(hand.playBone(0));
  		expect(train.gameTrain[0]).toBe(bone.northSuite);
  		expect(train.gameTrain[1]).toBe(bone.southSuite);
  	});

  	it("should accept a legal move on the left", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(6,5);
  		train.playBone(boneStart);
  		train.playBone(bone1, "left");
  		expect(train.gameTrain[1]).toBe(6);
  		expect(train.gameTrain[0]).toBe(5);
  	});

  	it("should accept a legal move on the right", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(2,5);
  		train.playBone(boneStart);
  		train.playBone(bone1, "right");
  		expect(train.gameTrain[2]).toBe(2);
  		expect(train.gameTrain[3]).toBe(5);
  	});

  	it("should do nothing if an illegal move is played", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(5,3);
  		train.playBone(boneStart);
  		train.playBone(bone1, "right");
  		expect(train.gameTrain[0]).toBe(6);
  		expect(train.gameTrain[train.gameTrain.length - 1]).toBe(2);
  	});
  });

  describe("#legalMove", function() {

  	it("should return false if the move is illegal", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(3,5);
  		train.playBone(boneStart, "right");
  		expect(train.legalMove(bone1)).toBe(false);
  	});

  	it("should return true if the bone can be played to the train front", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(6,5);
  		train.playBone(boneStart);
  		expect(train.legalMove(bone1, "left")).toBe(true);
  	});

  	it("should return true if the bone can be played to the train back", function() {
  		var boneStart = new Bone(6,2);
  		var bone1 = new Bone(2,5);
  		train.playBone(boneStart);
  		expect(train.legalMove(bone1, "right")).toBe(true);
  	});

  });

});