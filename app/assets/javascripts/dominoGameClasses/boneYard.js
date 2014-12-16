function BoneYard() {
	this.bones = [];
	this.fillBoneYard();
}

BoneYard.prototype.fillBoneYard = function() {
	var suites = [0, 1, 2, 3, 4, 5, 6];
	for (var i = 0; i < suites.length; i++) {
		for (var j = i; j < suites.length; j++) {
			this.bones.push(new Bone(i,j));
		}
	}
};

BoneYard.prototype.getRandomBone = function() {
  return popRandomElement(this.bones);
};

BoneYard.prototype.isEmpty = function() {
	return this.bones === 0;
};