function Bone(n,s) {
	this.northSuite = n;
	this.southSuite = s;
	this.orientation = 0;
}

Bone.prototype.double = function() {
	return this.northSuite === this.southSuite;
};

Bone.prototype.totalPips = function() {
	return this.northSuite + this.southSuite;
};

Bone.prototype.largestSuite = function() {
	return this.northSuite >= this.southSuite ?
		this.northSuite : this.southSuite;
};