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
	Game.state.add('menu', TR_menu);
	Game.state.add('debug' , TR_start);
	Game.state.add('fin', TR_end);
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

 		Game.plateforms = [];
		creerPlateform(Game);

 		Game.bot = new StaticBot([100,400],Game,"type2");
		Game.player = new Player(Game,"type1");
		Game.pickableGroup = [];
		for (var i = 3 - 1; i >= 0; i--) {
			Game.pickableGroup.push(new PickupElement([200 +i*250,100],Game,"type3"));
		};
	},

	update: function(Game){
		Game.bot.update();
 		for (var i = Game.pickableGroup.length - 1; i >= 0; i--) {
 			Game.pickableGroup[i].update();
 		};

 		for(var i = 0; i < Game.plateforms.length; i++)
 		{
 			if(Game.physics.arcade.collide(Game.player.sprite, Game.plateforms[i].sprite))
 			{
 				Game.player.touching = true;
 			}
 		}
 		Game.player.update();

 		if(Game.player.sprite.x >= 1100)
 		{

 			Game.state.start('fin');
 		}
	}

}



