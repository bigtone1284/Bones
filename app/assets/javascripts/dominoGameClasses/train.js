function Train() {
	this.gameTrain = [];
}

Train.prototype.head = function() {
	return this.gameTrain[0].northSuite;
};

Train.prototype.legalMove = function(bone, side) {
	if (side === "head") {
		if (bone.northSuite === this.head() || bone.southSuite === this.head()) {
			return true;
		}
		return false;
	}

	if (side === "tail") {
		if (bone.northSuite === this.tail() || bone.southSuite === this.tail()) {
			return true;
		}
		return false;
	}
	return false;
};

Train.prototype.playHead = function(bone) {
	if (this.legalMove(bone, "head")) {
		if (bone.northSuite === this.head()) {
			bone.reOrient();
		}
		return this.gameTrain.unshift(bone);
	}
	return false
};

Train.prototype.playTail = function(bone) {
	if (this.legalMove(bone, "tail")) {
		if (bone.southSuite === this.tail()) {
			bone.reOrient();
		}
		return this.gameTrain.push(bone);
	}
	return false;
};

Train.prototype.startBone = function(bone) {
	return this.gameTrain.push(bone);
};

Train.prototype.tail = function() {
	return this.gameTrain[this.gameTrain.length - 1].southSuite;
};

Train.prototype.asString = function() {
	var trainString = "";
	for (var i = 0; i < this.gameTrain.length; i++) {
		trainString += this.gameTrain[i].asString();
	}
	return trainString;
};

Train.prototype.fromString = function(trainString) {
	this.gameTrain = [];
	var trainArray = trainString.match(/.{1,2}/g);
	for (var i = 0; i < trainArray.length; i++) {
		var bone = new Bone;
		bone.fromString(trainArray[i]);
		this.gameTrain.push(bone);
	}
}







