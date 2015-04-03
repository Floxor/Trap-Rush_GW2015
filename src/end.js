function TR_end(Game){}

TR_end.prototype = {
	preload: function(Game)
	{

	},

	create: function(Game)
	{
		Game.bg = Game.add.sprite(0,0, 'bgMenu');

		winner = Game.add.sprite(800,400,Game.winner)
		winner.scale.setTo(2,2);

		if(Game.winner == Game.selectedP1.asset)
			textWin = Game.add.sprite(500, 100, 'Win1');
		else if(Game.winner == Game.selectedP2.asset)
			textWin = Game.add.sprite(500, 100, 'Win2');

		Game.menu = new buttonPerso(Game, 500, 650, 'buttonPlay');
		Game.menu.sprite.scale.setTo(0.8,0.8);
		Game.menu.sprite.anchor.setTo(0.5,0.5);

		Game.valider = false;
		this.jouer = false;

		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivated = true;
		}

		this.cursorsP1 = {
			valider 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
			right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
			up 	: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S)
		}
	},

	update: function(Game)
	{	
		this.cursorsP1.up.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : this.cursorsP1.up.isDown;
		this.cursorsP1.up.isUp 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : this.cursorsP1.up.isUp;
		this.cursorsP1.down.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : this.cursorsP1.down.isDown;
		this.cursorsP1.down.isUp 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : this.cursorsP1.down.isUp;
		this.cursorsP1.valider.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"].justPressed(Phaser.Gamepad.XBOX360_A,50) : this.cursorsP1.valider.isDown;

		if(!this.cursorsP1.valider.isDown)
			Game.valider = false;
		if(this.cursorsP1.valider.isDown && Game.valider == false && this.jouer == false)
		{
			Game.valider = true;
				Game.state.start('selection');
		}
	}
}
