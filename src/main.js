window.addEventListener("load",init);
var Game;

function init(){
	 if (Game)
	 	return;

	Game = new Phaser.Game(1200, 720, Phaser.AUTO, 'gameContainer');
	Game.state.add('start' , TR_start);
	Game.state.start('start');
}

function TR_start (Game) { }

TR_start.prototype = {

	preload : function(Game) {

	},

	create : function (Game) {
 		console.log("start");
	},

	update: function(Game){
 		console.log("update");
	}

}

