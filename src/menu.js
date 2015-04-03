function TR_menu(Game){}

TR_menu.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		Game.input.gamepad.start();
		this.gamepadActivatedP1 = false;
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

		Game.valider = false;
		
		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivatedP1 = true;
		}


		this.cursorsP1 = {
			valider 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
			right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
			up 	: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S)
		}
	},

	update: function(Game){
		this.cursorsP1.up.isDown 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : this.cursorsP1.up.isDown;
		this.cursorsP1.up.isUp 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : this.cursorsP1.up.isUp;
		this.cursorsP1.down.isDown 	= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : this.cursorsP1.down.isDown;
		this.cursorsP1.down.isUp 	= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : this.cursorsP1.down.isUp;
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