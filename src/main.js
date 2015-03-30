window.addEventListener("load",init);
var Game;

function init(){
	 if (Game)
	 	return;

	Game = new Phaser.Game(1200, 720, Phaser.CANVAS, 'gameContainer');
	Game.state.add('preload' , TR_preload);
	Game.state.add('debug' , TR_start);
	Game.state.start('preload');
}

function TR_start (Game) { }

TR_start.prototype = {

	preload : function(Game) {

	},

	create : function (Game) {
 		console.log("start");
 		Game.add.sprite(300,300,"placeholder1");
	},

	update: function(Game){
 		console.log("update");
	}

}

