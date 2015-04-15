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
        Game.background = Game.add.tileSprite(0,0,Game.cache.getImage("background1").width,Game.height,"background1");
        Game.background.fixedToCamera  = true;
		Game.input.gamepad.start()
		Game.physics.startSystem(Phaser.Physics.ARCADE);
		Game.stage.backgroundColor = '#38384B';
		Game.time.desiredFps = 60;
		Game.physics.arcade.gravity.y = 0;
		Game.keys = Game.input.keyboard.createCursorKeys();
		Game.map = Game.add.tilemap('map');
		Game.map.addTilesetImage('collision', 'tilesetPlaceholder');
		Game.scale.compatibility.forceMinimumDocumentHeight = true;
        Game.traps = []; //Liste des traps
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

		Game.player1 = new Player(Game,Game.selectedP1.name,[250,3150],1);
		Game.player2 = new Player(Game,Game.selectedP2.name,[250,3100],2);

		Game.shakeWorld = 0;

		Game.end = new Fin(Game, 7025, 275);

		Game.centerCamera = Game.add.sprite(0,0,null);
		Game.camera.follow(Game.centerCamera);

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
        Game.stageEdges.right.width     = Game.stageEdges.left.width    = 100;
        Game.stageEdges.right.height    = Game.stageEdges.left.height   = Game.height;
        Game.stageEdges.bottom.width    = Game.stageEdges.top.width     = Game.width;
        Game.stageEdges.bottom.height   = Game.stageEdges.top.height    = 100;
        Game.stageEdges.left.anchor.setTo(1, 0);
        Game.stageEdges.top.anchor.setTo(0, 1);


		var pikes1 = new Pikes({
			game: Game,
			x: 950,
			y: 3250
		});
		var leverP1 = new Lever({
		game: Game,
		x: 1500,
		y: 3210,
		trap: pikes1
		});

		var bigball1 = new Bigball({
			game: Game,
			x: 3250,
			y: 3380,
			speed: 15
		});
		var leverBB1 = new Lever({
		game: Game,
		x: 1870,
		y: 3570,
		trap: bigball1
		});

        var leverK1 = new Lever({ 
			game: Game,
			x: 4800,
			y: 3930,
			callBack: function() {
				new Knifes({
					game: Game,
					x: 5000,
					y: 3600
				}); 
			}
		});

		var bigball2 = new Bigball({
			game: Game,
			x: 6750,
			y: 1500,
			direction: 'right',
			speed: 1.5
		});
		var leverBB2 = new Lever({
		game: Game,
		x: 6600,
		y: 3150,
		trap: bigball2
		});

		var pikes2 = new Pikes({
			game: Game,
			x: 5500,
			y: 2960
		});
		var leverP2 = new Lever({
		game: Game,
		x: 5300,
		y: 2250,
		trap: pikes2
		});

		var leverF1 = new Lever({ 
			game: Game,
			x: 4500,
			y: 2250,
			callBack: function() {
				new Fireball({
					game: Game,
					x: 4500,
					y: 2200
				}); 
			}
		});

		var pikeswall1 = new Pikeswall({
			game: Game,
			x: 5200,
			y: 1650
		});
		var leverPW1 = new Lever({
		game: Game,
		x: 3700,
		y: 2250,
		trap: pikeswall1
		});

		var bigball3 = new Bigball({
			game: Game,
			x: 1000,
			y: 1790,
			direction: 'right'
		});
		var leverBB3 = new Lever({
		game: Game,
		x: 1600,
		y: 2490,
		trap: bigball3
		});

		var pikeswall2 = new Pikeswall({
			game: Game,
			x: 2400,
			y: 100
		});
		var leverPW2 = new Lever({
		game: Game,
		x: 2000,
		y: 810,
		trap: pikeswall2
		});

		Game.go = Game.add.sprite(250,2500, 'decompte');
		Game.go.animations.add('start',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]);
		Game.go.animations.play('start', 24, false);

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


		if(Game.physics.arcade.collide(Game.player1.sprite, Game.end.sprite))
		{
			Game.winner = Game.selectedP1.asset;
			Game.state.start("fin");
		}

		if(Game.physics.arcade.collide(Game.player2.sprite, Game.end.sprite))
		{
			Game.winner = Game.selectedP2.asset;
			Game.state.start("fin");
		}

		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player1.sprite, Game.tilesCollision);
		Game.physics.arcade.collideSpriteVsTilemapLayer(Game.player2.sprite, Game.tilesCollision);
		Game.player2.update();
		Game.player1.update();
		fixCamera(Game);

        //Loop traps & levers
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

function victoire(Game)
{
	
}

function fixCamera (Game) {
	var angleBetween2Players 	= this.Game.physics.arcade.angleBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	var distanceBetween2Players = this.Game.physics.arcade.distanceBetween(this.Game.player1.sprite,this.Game.player2.sprite);
	Game.centerCamera.x = this.Game.player1.sprite.x + Math.cos(angleBetween2Players) * distanceBetween2Players * 0.5;
	Game.centerCamera.y = this.Game.player1.sprite.y + Math.sin(angleBetween2Players) * distanceBetween2Players * 0.5;
	Game.background.tilePosition.set(-Game.camera.x * 0.1, 0);
}



