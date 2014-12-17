

var setCurrentDomino = function() {
	currentDomino = null;
	if($(this).parent().parent().hasClass('active')) {currentDomino = Number($(this).attr('bone'))};
};

var makePlay = function(direction) {
	// legal move problem (click on a domino, allow reset.  )
	if (currentDomino) {
		game.play(direction, currentDomino);
		game.checkWin();
		makeDom();
		$('.gutter').toggleClass('active');
	}
};