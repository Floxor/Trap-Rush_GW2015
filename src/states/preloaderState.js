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
	this.game.load.tilemap('map', 'assets/tilemapN5.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('tilesetPlaceholder', 'assets/tileset2.png');
    this.game.load.spritesheet('playerSpriteSheet', 'assets/sheets.png',154,115,-1,0,2);
    this.game.load.spritesheet('playerSpriteSheet2', 'assets/sheetsplayer2.png',154,115,-1,0,2);
    this.game.load.spritesheet('playerSpriteSheet3', 'assets/sheetsplayer3.png',154,115,-1,0,2);
    this.game.load.spritesheet('playerSpriteSheet4', 'assets/sheetsplayer4.png',154,115,-1,0,2);
	this.game.load.image('smoke', 'assets/particuleSmoke.png');
	this.game.load.image('background1', 'assets/background_1.png');
	this.game.load.image('placeholder1', 'assets/placeholders/pic_cha.png');
	this.game.load.image('placeholder2', 'assets/placeholders/pic_flo.png');
	this.game.load.image('placeholder3', 'assets/placeholders/pic_maureen.png');
	this.game.load.image('placeholder4', 'assets/placeholders/pic_nico.png');
	this.game.load.image('placeholder5', 'assets/placeholders/pic_theo.png');
	this.game.load.image('bgMenu', 'assets/ecran-personages.png');
	this.game.load.spritesheet('player', 'assets/player.png',114,153);
	this.game.load.spritesheet('jump', 'assets/saut.png',91,85);

    //traps
    this.game.load.spritesheet('trap_pikes', 'assets/traps/pikes.png', 201, 224, 3);
    this.game.load.image('trap_knifes', 'assets/traps/knife.png');
    this.game.load.image('trap_bigball', 'assets/traps/bigball.png');
    this.game.load.image('trap_pikeswall', 'assets/traps/pikeswall.png');
    this.game.load.spritesheet('trap_fireball', 'assets/traps/fireball.png', 223, 224, 15);
    this.game.load.spritesheet('lever', 'assets/traps/lever.png', 179, 160, 3);

	this.game.load.bitmapFont('ratatouille', 'fonts/AuthenticRatatouille.otf');

	this.game.load.image('buttonPlay', 'assets/bouton-play.png');
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	this.game.loadingText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function loadComplete () {
	this.game.state.start("menu");
}