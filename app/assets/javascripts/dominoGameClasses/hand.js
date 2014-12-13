function Hand() {
	this.bones = [];
}

Hand.prototype.setHand = function(boneYard, n) {
	for (var i = 0;  i < n; i++) {
		var bone = boneYard.getRandomBone();
		this.bones.push(bone);
	}
};

Hand.prototype.addBone = function(boneYard) {
	var bone = boneYard.getRandomBone();
	this.bones.push(bone);
};

Hand.prototype.totalPips = function() {
	var value = 0;
	this.bones.forEach( 
		function(bone) {
			value += bone.totalPips();
		}
	)
	return value;
};

Hand.prototype.isEmpty = function() {
	return this.bones.length === 0;
};


