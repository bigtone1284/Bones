describe("Bone", function() {
  var bone;

  beforeEach(function() {
    bone = new Bone();
  });

  describe("northSuite, southSuite", function() {

    it("should be initialized with a north suite of null", function() {
      expect(bone.northSuite).toBe(null);
    });

    it("should be initialized with a south suite of null", function() {
      expect(bone.southSuite).toBe(null);
    });

  });

  describe("#create", function() {

    beforeEach(function() {
      bone.create(6,4);
    });

    it("should give northSuite a value", function (){
      expect(bone.northSuite).toBe(6);
    });

    it("should give sorthSuite a value", function (){
      expect(bone.southSuite).toBe(4);
    });

  });

  describe("#double", function() {
    
    it("should return true if the piece is a double", function() {
      bone.create(6,6);
      expect(bone.double()).toBe(true);
    });

    it("should return false if the piece is not a double", function() {
      bone.create(6,4);
      expect(bone.double()).toBe(false);
    });
    
  });

  describe("#totalPips", function() {

    it("should return the total number of pips on the bone", function() {
      bone.create(4,2);
      expect(bone.totalPips()).toBe(6);
    });

  });

  

});