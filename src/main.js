window.addEventListener("load",init);

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}

var Game;

function init(){
	 if (Game)
	 	return;

	Game = new Phaser.Game(1200, 720, Phaser.AUTO, 'gameContainer');
	Game.state.add('preload' , TR_preload);
	Game.state.add('debug' , TR_start);
	Game.state.start('preload');
}

function TR_start (Game) { }

TR_start.prototype = {

	preload : function(Game) {

	},

	create : function (Game) {
		Game.physics.startSystem(Phaser.Physics.ARCADE);
	 	Game.physics.arcade.gravity.y = 1000;
		Game.keys = Game.input.keyboard.createCursorKeys();
 		console.log("start");

 		//Liste des traps
 		Game.traps = [];

 		var myTrap = new Bigball({game: Game, x: 400, y: 720});

		Game.player = new Player(Game,"type1");
	},

	update: function(Game){

 		Game.player.update();

 		var trapsLength = Game.traps.length;
 		for (var i = 0; i < trapsLength; i++) {
 			Game.traps[i].doAction();
 		}
	}

}
