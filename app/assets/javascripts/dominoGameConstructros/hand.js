var Hand = function() {
	this.bones = [];
}

Hand.prototype.addBone = function(boneYard) {
	var bone = boneYard.getRandomBone();
	this.bones.push(bone);
};

Hand.prototype.hasBone = function(bone) {
	return this.bones.indexOf(bone) > -1;
};

Hand.prototype.hasDoubles = function() {
	var doubles = false;
	this.bones.forEach(function(bone){
		if (bone.isDouble()) {doubles = true}
	})
	return doubles;
};

Hand.prototype.heaviestBone = function() {
	var heaviest = new Bone(-1, 0);
	if (this.hasDoubles()) {
		for (var i = 0; i < this.bones.length; i++) {
			if (this.bones[i].isDouble()) {
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

Hand.prototype.isEmpty = function() {
	return this.bones.length === 0;
};

Hand.prototype.peek = function(boneIndex) {
	return this.bones[boneIndex]
};

Hand.prototype.playBone = function(boneIndex) {
	return this.bones.splice(boneIndex, 1)[0];
};

Hand.prototype.setHand = function(boneYard, n) {
	for (var i = 0;  i < n; i++) {
		var bone = boneYard.getRandomBone();
		this.bones.push(bone);
	}
};

Hand.prototype.totalPips = function() {
	var value = 0;
	this.bones.forEach(function(bone) {
		value += bone.totalPips();
	})
	return value;
};

Hand.prototype.asString = function() {
	var handString = "";
	for (var i = 0; i < this.bones.length; i++) {
		handString += this.bones[i].asString();
	}
	return handString;
}

Hand.prototype.fromString = function(handString) {
	this.bones = [];
	var handArray = handString.match(/.{1,2}/g);
	for (var i = 0; i < handArray.length; i++) {
		var bone = new Bone;
		bone.fromString(handArray[i]);
		this.bones.push(bone);
	}
}
