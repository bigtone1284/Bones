describe("Bone", function() {
  var bone;

  beforeEach(function(){
    bone = new Bone();
  });

  describe("northSuite, southSuite", function() {

    it("should be initialized with a north suite of \'\'", function() {
      expect.(bone.northSuite).toBe("");
    });

    it("should be initialized with a south suite of \'\'", function() {
      expect.(bone.sorthSuite).toBe("");
    });

  });

  

});