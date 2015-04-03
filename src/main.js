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

		Game.input.gamepad.start()
		Game.physics.startSystem(Phaser.Physics.ARCADE);
		Game.stage.backgroundColor = '#38384B';
		Game.time.deltaCap=0.02;
		Game.physics.arcade.frameRate = 1 / 60;
		Game.physics.arcade.gravity.y = 0;
		Game.keys = Game.input.keyboard.createCursorKeys();
 		console.log("start");

 		//Liste des traps
 		Game.traps = [];

		Game.map = Game.add.tilemap('map');
		Game.map.addTilesetImage('collision', 'tilesetPlaceholder');

		Game.map.layers.forEach(function(l){
			var layer=Game.map.createLayer(l.name);
		
			if(l.name==='collision'){
				var firstgid=Game.map.tilesets[Game.map.getTilesetIndex('collision')].firstgid;

				l.data.forEach(function(e){
					e.forEach(function(t){
						if (t.index >-1) {
							t.slopeIndex = t.index - firstgid;
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

		Game.world.setBounds(0, 0, Game.map.widthInPixels, Game.map.heightInPixels);

		console.log("start");

		Game.bots = [];
		Game.player = new Player(Game,"type1",[150,150],1);

		Game.pickableGroup = [];
		for (var i = 3 - 1; i >= 0; i--) {
			Game.pickableGroup.push(new PickupElement([200 +i*250,100],Game,"type3"));
		};

		Game.shakeWorld = 0;
		Game.camera.follow(Game.player.sprite);

		//Bords du stage
		Game.stageEdges = {
			right: Game.add.sprite(Game.width, 0, false),
			bottom: Game.add.sprite(0, Game.height, false),
			left: Game.add.sprite(-100, 0, false),
			top: Game.add.sprite(0, -100, false)
		};

		for(var x in Game.stageEdges) {
			Game.physics.enable(Game.stageEdges[x], Phaser.Physics.ARCADE);
			Game.stageEdges[x].body.allowGravity = false;
		}

        Game.stageEdges.right.width 	= Game.stageEdges.left.width 	= 100;
        Game.stageEdges.right.height 	= Game.stageEdges.left.height 	= Game.height;
        Game.stageEdges.bottom.width 	= Game.stageEdges.top.width 	= Game.width;
        Game.stageEdges.bottom.height 	= Game.stageEdges.top.height 	= 100;

        Game.stageEdges.left.anchor.setTo(1, 0);
		Game.stageEdges.top.anchor.setTo(0, 1);

		var trap = new Pikes({
			x: 800,
			y: 1400,
			game: Game,
			quantity: 3
		});

		var trap1 = new Lever({
			x: 400,
			y: 1500,
			game: Game,
			callBack: function() {
				new Knifes({
					game: Game,
					x: 500,
					y: 1400
				});
			},
			trap: trap

		});

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
			Game.physics.arcade.collideSpriteVsTilemapLayer(Game.pickableGroup[i].sprite, Game.tilesCollision);
			Game.pickableGroup[i].update();
		};
		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player.sprite, Game.tilesCollision);
		Game.player.update();

		var trapsLength = Game.traps.length;
 		for (var i = 0; i < trapsLength; i++) {
 			Game.traps[i].doLoop();
 		}

 		Game.stageEdges.right.x = Game.camera.x + Game.width;
 		Game.stageEdges.right.y = Game.camera.y;
 		Game.stageEdges.bottom.x = Game.camera.x;
 		Game.stageEdges.bottom.y = Game.camera.y + Game.height;
 		Game.stageEdges.left.x = Game.camera.x;
 		Game.stageEdges.left.y = Game.camera.y;
 		Game.stageEdges.top.x = Game.camera.x;
 		Game.stageEdges.top.y = Game.camera.y;

	},

	render:function (Game) {

	}

}
