describe("BoneYard", function() {
  var boneyard;

  beforeEach(function() {
    boneyard = new BoneYard();
  });

  describe("boneyard", function() {

  	it("should start off with 28 bones", function() {
  		expect(boneyard.bones.length).toBe(28);
  	});

  });

  describe("#fillBoneYard", function() {

  	it("should fill the boneyard with 28 bones", function() {
  		boneyard.bones = [];
  		expect(boneyard.bones.length).toBe(0);
  		boneyard.fillBoneYard();
  		expect(boneyard.bones.length).toBe(28);
  	});

  });

  describe("#getRandomBone", function() {

  	it("should return a random object of type Bone from the boneyard", function() {
  		var bone = boneyard.getRandomBone();
  		boneIsPrototype = Bone.prototype.isPrototypeOf(bone);
  		expect(boneIsPrototype).toBe(true);
  	});

  	it("should reduce the boneyard's bone count by 1 bone", function() {
  		expect(boneyard.bones.length).toBe(28);
  		boneyard.getRandomBone();
  		expect(boneyard.bones.length).toBe(27);
  	});

  });

  describe("#isEmpty", function() {

  	it("should return false if the boneyard has bones in it", function() {
  		expect(boneyard.bones.length).toBe(28);
  		expect(boneyard.isEmpty()).toBe(false);
  	});

  	it("should return true if the boneyard has no bones in it", function() {
  		expect(boneyard.bones.length).toBe(28);
  		boneyard.bones = [];
  		expect(boneyard.isEmpty()).toBe(true);
  	});

  });

  describe("#asString", function() {

    it("should return a string of the bones inside", function() {
      boneyard.bones = [new Bone(6,4), new Bone(5,2)];
      expect(boneyard.asString()).toBe("6452");
    })

  })

  describe("#fromString", function() {

    it("should remake the boneyard", function() {
      var bone1 = new Bone(1,0);
      var bone2 = new Bone(5,1);
      var bone3 = new Bone(4,2);
      boneyard.bones = [bone1, bone2, bone3];
      boneyard.fromString("1433");
      expect(boneyard.bones[0].northSuite).toBe(1);
      expect(boneyard.bones[0].southSuite).toBe(4);
      expect(boneyard.bones[1].northSuite).toBe(3);
      expect(boneyard.bones[1].southSuite).toBe(3);
    })
  })

});