function Bone() {
	this.northSuite: "";
	this.southSuite: "";
}

Bone.prototype.create = function(n,s) {
	this.northSuite = n;
	this.southSuite = s;
};

