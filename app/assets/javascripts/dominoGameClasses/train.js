function Train() {
	this.gameTrain = [];
}

Train.prototype.playBone = function(bone, side) {
	if (this.gameTrain.length === 0) {
		this.gameTrain.push(bone.northSuite, bone.southSuite);
	} else {
		if (this.legalMove(bone, side)) {
			
			if (side === "left") {
				if (bone.northSuite === this.gameTrain[0]) {
					this.gameTrain.unshift(bone.southSuite, bone.northSuite);
				} else {
					this.gameTrain.unshift(bone.northSuite, bone.southSuite);
				}
			}

			if (side === "right") {
				if (bone.northSuite === this.gameTrain[this.gameTrain.length - 1]) {
					this.gameTrain.push(bone.northSuite, bone.southSuite);
				} else {
					this.gameTrain.push(bone.southSuite, bone.northSuite);
				}
			}
		}		
	}
};

Train.prototype.legalMove = function(bone, side) {
	var tail = this.gameTrain.length - 1;
	if (side === "left") {
		if (bone.northSuite === this.gameTrain[0] || bone.southSuite === this.gameTrain[0]) {
			return true;
		}
	}

	if (side === "right") {
		if (bone.northSuite === this.gameTrain[tail] || bone.southSuite === this.gameTrain[tail]) {
			return true;
		}
	}
	return false;
};