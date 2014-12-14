function Bone() {
	this.northSuite = null;
	this.southSuite = null;
}

Bone.prototype.create = function(n,s) {
	this.northSuite = n;
	this.southSuite = s;
};

Bone.prototype.double = function() {
	return this.northSuite === this.southSuite;
};

Bone.prototype.totalPips = function() {
	return this.northSuite + this.southSuite;
};

Bone.prototype.largestSuite = function() {
	if (this.northSuite >= this.southSuite) {
		return this.northSuite;
	} else {
		return this.southSuite;
	};
};

