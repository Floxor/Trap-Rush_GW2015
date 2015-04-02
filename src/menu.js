function TR_menu(Game){}

TR_menu.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		Game.input.gamepad.start();
		titre = Game.add.text(600, 100, 'TRAP RUSH');
		titre.font = 'Calibri';
		titre.fontSize = 120;
		titre.fill = '#EE4444';
		titre.anchor.setTo(0.5,0.5);

		jouerButton = Game.add.button(600, 500, 'button', selectionPerso, this, 1,1,1);
		jouerButton.input.useHandCursor = true;
		jouerButton.scale.setTo(1,0.6);
		jouerButton.anchor.setTo(0.5,0.5);

		jouerText = Game.add.text(590,490, 'Choisir un personnage');
		jouerText.font = 'Arial';
		jouerText.fontSize = 30;
		jouerText.fill = "#000000";
		jouerText.anchor.setTo(0.5,0.5);

		Game.down = false;
		Game.up = false;
		Game.valider = false;
		Game.jouer = false;

		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivated = true;
		}

		Game.cursors = {
			valider 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
			right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
			up 	: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S)
		}
	},

	update: function(Game){
		Game.cursors.up.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : Game.cursors.up.isDown;
		Game.cursors.up.isUp 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : Game.cursors.up.isUp;
		Game.cursors.down.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : Game.cursors.down.isDown;
		Game.cursors.down.isUp 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : Game.cursors.down.isUp;
		Game.cursors.valider.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"].justPressed(Phaser.Gamepad.XBOX360_A,50) : Game.cursors.valider.isDown;

		if(Game.cursors.valider.isDown && Game.valider == false)
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