function TR_menu(Game){}

TR_menu.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		Game.input.gamepad.start();
		this.gamepadActivatedP1 = false;
		Game.bg = Game.add.sprite(0,0, 'ecranTitre');

		jouerButton = Game.add.button(600, 700, 'buttonPlay', selectionPerso, this, 1,1,1);
		jouerButton.input.useHandCursor = true;
		jouerButton.scale.setTo(0.4,0.4);
		jouerButton.anchor.setTo(0.5,0.5);

		Game.valider = false;
		
		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivatedP1 = true;
		}


		this.cursorsP1 = {
			valider : Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
			right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
			up 		: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S)
		}
	},

	update: function(Game){
		this.cursorsP1.up.isDown 		= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : this.cursorsP1.up.isDown;
		this.cursorsP1.up.isUp 			= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : this.cursorsP1.up.isUp;
		this.cursorsP1.down.isDown 		= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : this.cursorsP1.down.isDown;
		this.cursorsP1.down.isUp 		= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : this.cursorsP1.down.isUp;
		this.cursorsP1.valider.isDown 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"].justPressed(Phaser.Gamepad.XBOX360_A,50) : this.cursorsP1.valider.isDown;

		if(this.cursorsP1.valider.isDown && Game.valider == false)
		{
			Game.state.start('selection');
			Game.valider = true;
		}
	}	
}

function selectionPerso(Game)
{
	this.game.state.start('selection');
}