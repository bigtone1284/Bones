describe("Bone", function() {
  var bone;

  beforeEach(function() {
    bone = new Bone(6,4);
  });

  describe("northSuite, southSuite", function() {

    it("should be initialized with a north suite of n", function() {
      expect(bone.northSuite).toBe(6);
    });

    it("should be initialized with a south suite of s", function() {
      expect(bone.southSuite).toBe(4);
    });

  });

  describe("#double", function() {
    
    it("should return true if the piece is a double", function() {
      var bone2 = new Bone(6,6)
      expect(bone2.double()).toBe(true);
    });

    it("should return false if the piece is not a double", function() {
      expect(bone.double()).toBe(false);
    });
    
  });

  describe("#largestSuite", function() {

    it("should return northSuite if larger than southSuite", function() {
      expect(bone.largestSuite()).toBe(6);
    });

    it("should return southSuite if larger than northSuite", function() {
      var bone3 = new Bone(1,2);
      expect(bone3.largestSuite()).toBe(2);
    });

    it("should return northSuite if double", function() {
      var bone5 = new Bone(5,5);
      expect(bone5.largestSuite()).toBe(5);
    });

  });
  
  describe("#reOrient", function() {

    it("should swap the values of northSuite and southSuite", function() {
      var bone6 = new Bone(4,3);
      expect(bone6.southSuite).toBe(3);
      expect(bone6.northSuite).toBe(4);
      bone6.reOrient();
      expect(bone6.southSuite).toBe(4);
      expect(bone6.northSuite).toBe(3); 
    });

  });

  describe("#totalPips", function() {

    it("should return the total number of pips on the bone", function() {
      expect(bone.totalPips()).toBe(10);
    });

  });

  describe("asString", function() {

    it("should return the bone in the form of a string", function() {
      expect(bone.asString()).toBe("64");
    })

  })

  describe("fromString", function() {

    it("should return a bone from a two number string", function() {
      bone = new Bone(0,1);
      bone.fromString("25");
      expect(bone.northSuite).toBe(2);
      expect(bone.southSuite).toBe(5);
    })

  })
  
});