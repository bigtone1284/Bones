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

  describe("#totalPips", function() {

    it("should return the total number of pips on the bone", function() {
      expect(bone.totalPips()).toBe(10);
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

});