describe("Bone", function() {
  var bone;

  beforeEach(function(){
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

  

});