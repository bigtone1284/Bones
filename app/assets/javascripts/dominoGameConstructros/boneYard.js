var BoneYard = function() {
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
	return this.bones.length === 0;
};

BoneYard.prototype.asString = function() {
	var boneYardString = "";
	for (var i = 0; i < this.bones.length; i++) {
		boneYardString += this.bones[i].asString();
	}
	return boneYardString;
};

BoneYard.prototype.fromString = function(boneYardString) {
	this.bones = [];
	var boneYardArray = boneYardString.match(/.{1,2}/g);
	for (var i = 0; i < boneYardArray.length; i++) {
		var bone = new Bone();
		bone.fromString(boneYardArray[i]);
		this.bones.push(bone);
	}
};
