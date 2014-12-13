describe("Hand", function() {
  var hand;
  var boneyard;

  beforeEach(function() {
    hand = new Hand();
    boneyard = new BoneYard;
  	hand.setHand(boneyard, 7);
  });

  describe("#setHand", function() {

  	it("should give the player's hand 7 bones", function() {
  		expect(hand.bones.length).toBe(7);
  	});
  	
  });

  describe("#addBone", function () {

  	it("should add one more bone to the player's hand", function() {
  		expect(hand.bones.length).toBe(7);
  		hand.addBone(boneyard);
  		expect(hand.bones.length).toBe(8);
  	});

  });

  describe("#totalPips", function() {

  	it("should return the number of pips in a player's hand", function() {
  		var bone = new Bone;
  		bone.create(6,5);
  		hand.bones = [];
  		boneyard.bones = [bone];
  		hand.addBone(boneyard);
  		expect(hand.totalPips()).toBe(11);
  	});

  	it("should return 0 if the player has no bones", function() {
  		hand.bones = [];
  		expect(hand.totalPips()).toBe(0);
  	});

  });

  describe("#isEmpty", function() {

  	it("should return true if player's hand has no bones", function() {
  		hand.bones = [];
  		expect(hand.isEmpty()).toBe(true);
  	});

  	it("should return false if the player's hand has bones", function() {
  		expect(hand.bones.length).toBe(7);
  		expect(hand.isEmpty()).toBe(false);
  	});

  });

});