var Bone = function(n,s) {
	this.northSuite = n;
	this.southSuite = s;
}

Bone.prototype.isDouble = function() {
	return this.northSuite === this.southSuite;
};

Bone.prototype.largestSuite = function() {
	return this.northSuite >= this.southSuite ?
		this.northSuite : this.southSuite;
};

Bone.prototype.reOrient = function() { 
	this.northSuite = this.southSuite + ((this.southSuite = this.northSuite) - this.northSuite);
};

Bone.prototype.totalPips = function() {
	return this.northSuite + this.southSuite;
};

Bone.prototype.asString = function() {
	return this.northSuite.toString() + this.southSuite.toString();
};

Bone.prototype.fromString = function(numString) {
	this.northSuite = Number(numString[0]);
	this.southSuite = Number(numString[1]);
}
