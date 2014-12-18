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
  		var bone = new Bone(6,5);
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

  describe("#hasDoubles", function() {

  	it("should return true if a player has a double in their hand", function() {
  		var bone = new Bone(6,6);
  		boneyard.bones = [bone];
  		hand.addBone(boneyard);
  		expect(hand.hasDoubles()).toBe(true);
  	});

  	it("should return false if a player has no doubles", function() {
  		var bone = new Bone(6,5);
  		boneyard.bones = [bone];
  		hand.bones = [];
  		hand.addBone(boneyard);
  		expect(hand.hasDoubles()).toBe(false);
  	})

  });

  describe("#heaviestBone", function() {

  	it("should return the double with the highest value", function() {
  		var bone1 = new Bone(6,5);
  		var bone2 = new Bone(4,4);
  		var bone3 = new Bone(3,3);
  		boneyard.bones = [bone1, bone2, bone3];
  		hand.bones = [];
  		hand.setHand(boneyard, 3);
  		expect(hand.heaviestBone()).toBe(bone2)
  	});

  	it("should return the bone with the highest value if the hand has no doubles", function() {
  		var bone1 = new Bone(6,5);
  		var bone2 = new Bone(4,2);
  		var bone3 = new Bone(3,1);
  		boneyard.bones = [bone1, bone2, bone3];
  		hand.bones = [];
  		hand.setHand(boneyard, 3);
  		expect(hand.heaviestBone()).toBe(bone1)
  	});

  	it("should return 0,0 if it's the only double", function() {
  		var bone1 = new Bone(1,0);
  		var bone2 = new Bone(4,2);
  		var bone3 = new Bone(0,0);
  		boneyard.bones = [bone1, bone2, bone3];
  		hand.bones = [];
  		hand.setHand(boneyard, 3);
  		expect(hand.heaviestBone()).toBe(bone3)
  	});

    it("should break ties between two bones with the same totalPips", function() {
      var bone1 = new Bone(1,0);
      var bone2 = new Bone(5,1);
      var bone3 = new Bone(4,2);
      boneyard.bones = [bone1, bone2, bone3];
      hand.bones = [];
      hand.setHand(boneyard, 3);
      expect(hand.heaviestBone()).toBe(bone2)
    });


  });

  describe("#playBone", function() {
    it("should play a bone chosen from the players hand", function() {
      var bone = hand.bones[3];
      expect(hand.bones.indexOf(bone) > -1).toBe(true);
      var playBone = hand.playBone(3);
      expect(bone).toBe(playBone);
      expect(hand.bones.indexOf(bone) > -1).toBe(false);
    });

    it("should reduce the number of bones in the hand by one", function() {
      expect(hand.bones.length).toBe(7);
      var playBone = hand.playBone(1);
      expect(hand.bones.length).toBe(6);
    });

  });

  describe("#peek", function() {
    it("should show a bone at a given index", function() {
      var bone = new Bone(7,7);
      hand.bones.push(bone);
      expect(hand.peek(7)).toBe(bone);
    });
  });



});