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

Hand.prototype.hasDoubles = function() {
	var doubles = false;
	for (var i = 0; i < this.bones.length; i++) {
		if (this.bones[i].double()) {
			doubles = true;
		}
	}
	return doubles;
};

Hand.prototype.heaviestBone = function() {
	var heaviest = new Bone;
	if (this.hasDoubles()) {
		for (var i = 0; i < this.bones.length; i++) {
			if (this.bones[i].double()) {
				if (this.bones[i].largestSuite() >= heaviest.largestSuite()) {
					heaviest = this.bones[i];
				}
			}
		}
	} else {
		for (var i = 0; i < this.bones.length; i++) {
			if (this.bones[i].totalPips() > heaviest.totalPips()) {
				heaviest = this.bones[i];
			}
			if (this.bones[i].totalPips() === heaviest.totalPips()) {
				if (this.bones[i].largestSuite() > heaviest.largestSuite()) {
					heaviest = this.bones[i];
				}
			}
		}
	}
	return heaviest;
};


