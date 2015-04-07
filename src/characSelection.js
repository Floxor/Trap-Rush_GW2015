function TR_selection(Game){}

TR_selection.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		Game.input.gamepad.start();
		this.gamepadActivatedP1 = false;
		this.gamepadActivatedP2 = false;
		Game.bg = Game.add.sprite(0,0, 'bgMenu');
		titre = Game.add.text(600, 100, 'CHOISISSEZ UN PERSONNAGE');
		titre.font = 'Calibri';
		titre.fontSize = 80;
		titre.fill = '#EE4444';
		titre.anchor.setTo(0.5,0.5);

		Game.carac1 = new buttonPerso(Game, 150, 200, "type1",1);
		Game.carac2 = new buttonPerso(Game, 150, 300, "type2",1);
		Game.carac3 = new buttonPerso(Game, 150, 400, "type3",1);
		Game.carac4 = new buttonPerso(Game, 150, 500, "type4",1);
		
		Game.buttonsP1 = [];
		Game.buttonsP1.push(Game.carac1);
		Game.buttonsP1.push(Game.carac2);
		Game.buttonsP1.push(Game.carac3);
		Game.buttonsP1.push(Game.carac4);

		Game.carac5 = new buttonPerso(Game, 900, 200, "type1",1);
		Game.carac6 = new buttonPerso(Game, 900, 300, "type2",1);
		Game.carac7 = new buttonPerso(Game, 900, 400, "type3",1);
		Game.carac8 = new buttonPerso(Game, 900, 500, "type4",1);
		
		Game.buttonsP2 = [];
		Game.buttonsP2.push(Game.carac5);
		Game.buttonsP2.push(Game.carac6);
		Game.buttonsP2.push(Game.carac7);
		Game.buttonsP2.push(Game.carac8);


		Game.selectedP1 = Game.buttonsP1[0];
		Game.caracSelectedP1 = new buttonPerso(Game, 400, 300, Game.buttonsP1[0].name)
		Game.aP1 = 0;
		Game.downP1 = false;
		Game.upP1 = false;
		Game.validerP1 = false;
		Game.jouerP1 = false;

		Game.selectedP2 = Game.buttonsP2[0];
		Game.caracSelectedP2 = new buttonPerso(Game, 600, 300, Game.buttonsP2[0].name)
		Game.aP2 = 0;
		Game.downP2 = false;
		Game.upP2 = false;
		Game.validerP2 = false;
		Game.jouerP2 = false;
		

		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivatedP1 = true;
		}

		if(Game.input.gamepad.supported && Game.input.gamepad["pad2"]) {
			if(Game.input.gamepad["pad2"]._rawPad)
				this.gamepadActivatedP2 = true;
		}
		
		this.cursorsP1 = {
			valider 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			up 		: Game.input.keyboard.addKey(Phaser.Keyboard.Z),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S)
		}

			this.cursorsP2 = {
			up 		: Game.input.keyboard.addKey(Phaser.Keyboard.UP),
			down 	: Game.input.keyboard.addKey(Phaser.Keyboard.DOWN),
			valider : Game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
		};
	},

	update: function(Game){
		this.cursorsP1.up.isDown 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : this.cursorsP1.up.isDown;
		this.cursorsP1.up.isUp 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : this.cursorsP1.up.isUp;
		this.cursorsP1.down.isDown 	= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : this.cursorsP1.down.isDown;
		this.cursorsP1.down.isUp 	= this.gamepadActivatedP1 ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : this.cursorsP1.down.isUp;
		this.cursorsP1.valider.isDown 	= this.gamepadActivatedP1 ? 	Game.input.gamepad["pad1"].justPressed(Phaser.Gamepad.XBOX360_A,50) : this.cursorsP1.valider.isDown;

		this.cursorsP2.up.isDown 	= this.gamepadActivatedP2 ? 	Game.input.gamepad["pad2"]._rawPad.axes[1] < -0.3 : this.cursorsP2.up.isDown;
		this.cursorsP2.up.isUp 	= this.gamepadActivatedP2 ? 	Game.input.gamepad["pad2"]._rawPad.axes[1] > -0.3 : this.cursorsP2.up.isUp;
		this.cursorsP2.down.isDown 	= this.gamepadActivatedP2 ?  	Game.input.gamepad["pad2"]._rawPad.axes[1] >  0.3 : this.cursorsP2.down.isDown;
		this.cursorsP2.down.isUp 	= this.gamepadActivatedP2 ?  	Game.input.gamepad["pad2"]._rawPad.axes[1] <  0.3 : this.cursorsP2.down.isUp;
		this.cursorsP2.valider.isDown 	= this.gamepadActivatedP2 ? 	Game.input.gamepad["pad2"].justPressed(Phaser.Gamepad.XBOX360_A,50) : this.cursorsP2.valider.isDown;
		
		// this.cursors.grab.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_Y,50) : this.cursors.grab.downDuration();
		// this.cursors.punch.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_X,50) : this.cursors.punch.downDuration();


		if(Game.jouerP1 == false)
		{
			if(this.cursorsP1.down.isDown && Game.downP1 == false)
			{
				Game.aP1++;
				if(Game.aP1 > Game.buttonsP1.length - 1)
					Game.aP1 = 0;
				Game.selectedP1 = Game.buttonsP1[Game.aP1];
				Game.downP1 = true;
				Game.caracSelectedP1.sprite.kill();
				Game.caracSelectedP1 = new buttonPerso(Game, 400, 300, Game.buttonsP1[Game.aP1].name)
			}
			if(this.cursorsP1.down.isUp)
			{
				Game.downP1 = false;
			}

			if(this.cursorsP1.up.isDown && Game.upP1 == false)
			{
				Game.aP1--;
				if(Game.aP1 < 0)
					Game.aP1 = Game.buttonsP1.length - 1;
				Game.selectedP1 = Game.buttonsP1[Game.aP1];
				Game.upP1 = true;
				Game.caracSelectedP1.sprite.kill();
				Game.caracSelectedP1 = new buttonPerso(Game, 400, 300, Game.buttonsP1[Game.aP1	].name)
			}
			if(this.cursorsP1.up.isUp)
				Game.upP1 = false;
		}

		if(Game.jouerP2 == false)
		{
			if(this.cursorsP2.down.isDown && Game.downP2 == false)
			{
				Game.aP2++;
				if(Game.aP2 > Game.buttonsP2.length - 1)
					Game.aP2 = 0;
				Game.selectedP2 = Game.buttonsP2[Game.aP2];
				Game.downP2 = true;
				Game.caracSelectedP2.sprite.kill();
				Game.caracSelectedP2 = new buttonPerso(Game, 600, 300, Game.buttonsP2[Game.aP2].name)
			}
			if(this.cursorsP2.down.isUp)
			{
				Game.downP2 = false;
			}

			if(this.cursorsP2.up.isDown && Game.upP2 == false)
			{
				Game.aP2--;
				if(Game.aP2 < 0)
					Game.aP2 = Game.buttonsP2.length - 1;
				Game.selectedP2 = Game.buttonsP2[Game.aP2];
				Game.upP2 = true;
				Game.caracSelectedP2.sprite.kill();
				Game.caracSelectedP2 = new buttonPerso(Game, 600, 300, Game.buttonsP2[Game.aP2].name)
			}
			if(this.cursorsP2.up.isUp)
				Game.upP2 = false;
		}


		if(!this.cursorsP1.valider.isDown)
			Game.valider = false;


		if(this.cursorsP1.valider.isDown && Game.validerP1 == false && Game.valider == false && Game.jouerP1 == false)
		{
			Game.validerP1 = true;
			Game.jouerP1 = true;
		}
		if(!this.cursorsP1.valider.isDown)
			Game.validerP1 = false;

		if(this.cursorsP2.valider.isDown && Game.validerP2 == false && Game.jouerP2 == false)
		{
			Game.validerP2 = true;
			Game.jouerP2 = true;
		}
		if(!this.cursorsP2.valider.isDown)
			Game.validerP2 = false;

		if(Game.jouerP1 == true && Game.jouerP2 == true)
		{
			jouerButton = Game.add.button(600, 700, 'buttonPlay', jouer, this, 1,1,1);
			jouerButton.input.useHandCursor = true;
			jouerButton.scale.setTo(0.4,0.4);
			jouerButton.anchor.setTo(0.5,0.5);
		}

		if(this.cursorsP1.valider.isDown && Game.validerP1 == false && Game.jouerP1 == true && Game.jouerP2 == true)
		{
			Game.state.start('debug');
		}
	}
}

function selection(Game)
{

}

function jouer(Game)
{
	this.game.state.start('debug');
}