window.addEventListener("load",init);

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}

var Game;

function init(){
	 if (Game)
		return;

	//Game = new Phaser.Game(1440, 864, Phaser.AUTO, 'gameContainer');
	Game = new Phaser.Game(1200, 720, Phaser.CANVAS, 'gameContainer', null, false, null);
	Game.state.add('preload' , TR_preload);
	Game.state.add('menu', TR_menu);
	Game.state.add('selection', TR_selection);
	Game.state.add('debug' , TR_start);
	Game.state.add('fin', TR_end);
	Game.state.start('preload');
}

function TR_start (Game) { }

TR_start.prototype = {

	preload : function(Game) {

	},

	create : function (Game) {
		Game.input.gamepad.start()
		Game.physics.startSystem(Phaser.Physics.ARCADE);
		Game.stage.backgroundColor = '#38384B';
		Game.time.desiredFps = 50;
		Game.physics.arcade.gravity.y = 0;
		Game.keys = Game.input.keyboard.createCursorKeys();
		Game.map = Game.add.tilemap('map');
		Game.map.addTilesetImage('collision', 'tilesetPlaceholder');
		Game.scale.compatibility.forceMinimumDocumentHeight = true
	//	Game.add.plugin(Phaser.Plugin.Debug);
		Game.map.layers.forEach(function(l){
			var layer=Game.map.createLayer(l.name);
		
			if(l.name==='collision'){
				var firstgid=Game.map.tilesets[Game.map.getTilesetIndex('collision')].firstgid;

				l.data.forEach(function(e){
					e.forEach(function(t){
						if (t.index >-1) {
						}

						if (t.index < 0) {
						} else if (t.index - firstgid === 0) {
						} else if (t.index - firstgid === 2) {
							t.slope = 'HALF_TRIANGLE_BOTTOM_LEFT';
						} else if (t.index - firstgid === 1) {
							t.slope = 'HALF_TRIANGLE_BOTTOM_RIGHT';
						}else  if (t.index - firstgid === -1) {
							t.slope = 'RECTANGLE_BOTTOM';
						}else{
						}
						// you could also add custom collide function;
						// t.slopeFunction = function (i, body, tile) { custom code }
					});
				});

				var collisionTiles = [1,2,3];
				Game.map.setCollision(collisionTiles, true, layer);

				Game.tilesCollision=layer;
			}
			Game.lol = true;
			
			layer.resizeWorld();
		}, Game);
		Game.map.autoCull = true;

		Game.world.setBounds(0, 0, Game.map.widthInPixels, Game.map.heightInPixels);

		console.log("start");

		Game.bots = [];
		Game.winner = null;

		Game.player1 = new Player(Game,Game.selectedP1.name,[150,600],1);
		Game.player2 = new Player(Game,Game.selectedP2.name,[250,600],2);

		Game.pickableGroup = [];
		for (var i = 3 - 1; i >= 0; i--) {
			Game.pickableGroup.push(new PickupElement([200 +i*250,100],Game,"placeholder3"));
		};
		Game.shakeWorld = 0;
		Game.camera.follow(Game.player1.sprite);

		Game.end = new Fin(Game, 3650, 250);

		Game.centerCamera = Game.add.sprite(0,0,null);
		Game.camera.follow(Game.player1.sprite);
	},

	update: function(Game){

		if (Game.shakeWorld > 0) {
		   var rand1 = Game.rnd.integerInRange(-20,20);
		   var rand2 = Game.rnd.integerInRange(-20,20);
		    Game.world.setBounds(rand1, rand2, Game.width + rand1, Game.height + rand2);
		    Game.shakeWorld--;
		    if (Game.shakeWorld == 0) {
		        Game.world.setBounds(0, 0, Game.width,Game.height); // normalize after shake?
		    }
		}

		for (var i = Game.bots.length - 1; i >= 0; i--) {
			Game.bots[i].update();
		};

		for (var i = Game.pickableGroup.length - 1; i >= 0; i--) {
			if (!Game.pickableGroup[i].goThroughMap) 
				Game.physics.arcade.collideSpriteVsTilemapLayer(Game.pickableGroup[i].sprite, Game.tilesCollision);
			Game.pickableGroup[i].update();
		};

		if(Game.physics.arcade.collide(Game.player1.sprite, Game.end.sprite))
		{
			Game.winner = Game.selectedP1.name;
			console.log(Game.winner);
			Game.textWinner = "Player 1 win !!"
			Game.state.start("fin");
		}

		if(Game.physics.arcade.collide(Game.player2.sprite, Game.end.sprite))
		{
			Game.winner = Game.selectedP2.name;
			console.log(Game.winner);
			Game.textWinner = "Player 2 win !!"
			Game.state.start("fin");
		}

		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player1.sprite, Game.tilesCollision);
		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player2.sprite, Game.tilesCollision);
		Game.player2.update();
		Game.player1.update();
		fixCamera(Game);
	},

	render:function (Game) {
	}

}

function victoire(Game)
{
	
}

function fixCamera (Game) {
	var angleBetween2Players 	= this.Game.physics.arcade.angleBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	var distanceBetween2Players = this.Game.physics.arcade.distanceBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	 Game.centerCamera.x = this.Game.player1.sprite.x + Math.cos(angleBetween2Players) * distanceBetween2Players * 0.5;
	 Game.centerCamera.y = this.Game.player1.sprite.y + Math.sin(angleBetween2Players) * distanceBetween2Players * 0.5;
}



