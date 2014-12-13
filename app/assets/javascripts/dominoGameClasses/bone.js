function Bone() {
	this.northSuite = null;
	this.southSuite = null;
}

Bone.prototype.create = function(n,s) {
	this.northSuite = n;
	this.southSuite = s;
};

