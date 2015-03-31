var TR_preload = function (Game) { }
TR_preload.prototype = {
	preload : function (Game) {	},
	
	//__________________________________________CREATE____________________________________________________________________________________

	create : function (Game) {
		Game.loadingText =  Game.add.text(32, 32,'Click to start loading', { fill: '#ffffff' })

		Game.load.onLoadStart.add(loadStart, this);
  	 	Game.load.onFileComplete.add(fileComplete, this);
  		Game.load.onLoadComplete.add(loadComplete, this);	
  		Game.load.start();

  		/*
		###########################
					JSON
		###########################
  		*/
  		Game.config = httpGetData("src/config/config.json");

  	},
  	update : function (Game) { 	}
  	
}

function loadStart () {
	this.game.load.image('placeholder1', 'assets/placeholders/pic_cha.png');
	this.game.load.image('placeholder2', 'assets/placeholders/pic_flo.png');
	this.game.load.image('placeholder3', 'assets/placeholders/pic_maureen.png');
	this.game.load.image('placeholder4', 'assets/placeholders/pic_nico.png');
	this.game.load.image('placeholder5', 'assets/placeholders/pic_theo.png');

}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	this.game.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function loadComplete () {
	this.game.state.start("debug");
}