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

  describe("#head", function() {

    it("should return the head of the train", function() {
      var bone2 = new Bone(4,5);
      train.gameTrain.push(bone2)
      expect(train.head()).toBe(4);
    });

  });

  describe("#legalMove", function() {

    it("should return false if the move is illegal", function() {
      var boneStart = new Bone(6,2);
      var bone1 = new Bone(3,5);
      train.startBone(boneStart, "");
      expect(train.legalMove(bone1)).toBe(false);
    });

    it("should return true if the bone can be played to the train front", function() {
      var boneStart = new Bone(6,2);
      var bone1 = new Bone(6,5);
      train.startBone(boneStart);
      expect(train.legalMove(bone1, "head")).toBe(true);
    });

    it("should return true if the bone can be played to the train back", function() {
      var boneStart = new Bone(6,2);
      var bone1 = new Bone(2,5);
      train.startBone(boneStart);
      expect(train.legalMove(bone1, "tail")).toBe(true);
    });

  });

  describe("#playHead", function() {

    it("should return false if a bone may not be played to the head", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(5,4);
      train.startBone(boneStart);
      expect(train.playHead(bone3)).toBe(false);
    });

    it("should accept a bone that can be played at the head", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(4,6);
      train.startBone(boneStart);
      train.playHead(bone3);
      expect(bone3).toBe(train.gameTrain[0]);
    });

    it("should reset the head of the train after a successful play", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(6,5);
      train.startBone(boneStart);
      expect(train.head()).toBe(6);
      train.playHead(bone3);
      expect(train.head()).toBe(5);
    });

  });

  describe("#playTail", function() {

    it("should return false if a bone may not be played to the tail", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(5,4);
      train.startBone(boneStart);
      expect(train.playTail(bone3)).toBe(false);
    });

    it("should accept a bone that can be played at the tail", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(4,6);
      train.startBone(boneStart);
      train.playTail(bone3);
      expect(bone3).toBe(train.gameTrain[train.gameTrain.length - 1]);
    });

    it("should reset the tail of the train after a successful play", function() {
      var boneStart = new Bone(6,6);
      var bone3 = new Bone(5,6);
      train.startBone(boneStart);
      expect(train.tail()).toBe(6);
      train.playTail(bone3);
      expect(train.tail()).toBe(5);
    });

  });

  describe("#startBone", function() {

    it("should add the first bone to the train", function() {
      var boneStart = new Bone(6,5);
      train.startBone(boneStart);
      expect(train.head()).toBe(6);
      expect(train.tail()).toBe(5);
      expect(train.gameTrain.length).toBe(1);
    });

  });

  describe("#tail", function() {

    it("should return the tail of the train", function() {
      var bone2 = new Bone(4,5);
      train.gameTrain.push(bone2)
      expect(train.tail()).toBe(5);
    });

  });

  describe("#asString", function() {
    it("should return the train as a string", function() {
      train.gameTrain = [new Bone(1,2), new Bone(3,5)];
      expect(train.asString()).toBe("1235");
    })
  })

  describe("#fromString", function() {
    it("should remake the train from a string", function() {
      var bone1 = new Bone(1,0);
      var bone2 = new Bone(5,1);
      var bone3 = new Bone(4,2);
      train.gameTrain = [bone1, bone2, bone3];
      train.fromString("1445");
      expect(train.gameTrain[0].northSuite).toBe(1);
      expect(train.gameTrain[0].southSuite).toBe(4);
      expect(train.gameTrain[1].northSuite).toBe(4);
      expect(train.gameTrain[1].southSuite).toBe(5);
    }) 
  })

});