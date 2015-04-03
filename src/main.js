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
	Game.state.add('debug' , TR_start);
	Game.state.start('preload');
}

function TR_start (Game) { }

TR_start.prototype = {

	preload : function(Game) {

	},

	create : function (Game) {
		Game.background = Game.add.tileSprite(0,0,Game.cache.getImage("background1").width,Game.height,"background1");
		Game.background.fixedToCamera  = true;
		Game.input.gamepad.start()
		Game.physics.startSystem(Phaser.Physics.ARCADE);
		Game.stage.backgroundColor = '#38384B';
		Game.time.desiredFps = 50;
		Game.physics.arcade.gravity.y = 0;
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

			
			layer.resizeWorld();
		}, Game);
		Game.map.autoCull = true;

		Game.world.setBounds(0, 0, Game.map.widthInPixels, Game.map.heightInPixels);

		console.log("start");

		Game.bots = [];
		Game.player1 = new Player(Game,"type1",[150,150],1);
		Game.player2 = new Player(Game,"type3",[250,150],2);
		Game.pickableGroup = [];
		for (var i = 3 - 1; i >= 0; i--) {
			Game.pickableGroup.push(new PickupElement([500 +i*50,100],Game,"type4"));
		};

//		Game.plateforms = [];
//		creerPlateform(Game);
		Game.shakeWorld = 0;
		Game.centerCamera = Game.add.sprite(0,0,null);
		Game.camera.follow(Game.centerCamera);
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

		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player1.sprite, Game.tilesCollision);
		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player2.sprite, Game.tilesCollision);
		Game.player2.update();
		Game.player1.update();
		fixCamera(Game);

	},

	render:function (Game) {
	}

}

function fixCamera (Game) {
	var angleBetween2Players 	= this.Game.physics.arcade.angleBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	var distanceBetween2Players = this.Game.physics.arcade.distanceBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	 Game.centerCamera.x = this.Game.player1.sprite.x + Math.cos(angleBetween2Players) * distanceBetween2Players * 0.5;
	 Game.centerCamera.y = this.Game.player1.sprite.y + Math.sin(angleBetween2Players) * distanceBetween2Players * 0.5;
	Game.background.tilePosition.set(-Game.camera.x * 0.1, 0);
	// if (distanceBetween2Players > 1000) {
	// 	Game.world.scale.setTo(1000 / distanceBetween2Players);
	// };

}



