function TR_end(Game){}

TR_end.prototype = {
	preload: function(Game)
	{

	},

	create: function(Game)
	{

		winner = Game.add.sprite(800,400,Game.winner)
		winner.scale.setTo(2,2);

		textWin = Game.add.text(-400, 100, Game.textWinner);
		textWin.font = 'Calibri';
		textWin.fontSize = 70;
		textWin.fill = '#EE9933'

		Game.add.tween(textWin).to({x: 400}, 3000, Phaser.Easing.Bounce.Out, true);

		Game.rejouer = new buttonPerso(Game, 500, 550, 'button');
		Game.rejouer.sprite.scale.setTo(0.8,0.8);
		Game.rejouer.sprite.anchor.setTo(0.5,0.5);

		Game.menu = new buttonPerso(Game, 500, 650, 'button');
		Game.menu.sprite.scale.setTo(0.8,0.8);
		Game.menu.sprite.anchor.setTo(0.5,0.5);

		Game.buttonsEnd = [];
		Game.buttonsEnd.push(Game.menu);
		Game.buttonsEnd.push(Game.rejouer);

		Game.selectedEnd = Game.buttonsEnd[0];
		Game.a = 0;
		Game.down = false;
		Game.up = false;
		Game.valider = false;
		this.jouer = false;

		menuText = Game.add.text(420, 510, 'MENU');
		menuText.font = 'Calibri';
		menuText.fontSize = 50;
		menuText.fill = '#000000';

		menuText = Game.add.text(400, 610, 'REJOUER');
		menuText.font = 'Calibri';
		menuText.fontSize = 50;
		menuText.fill = '#000000';

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

		for(var i = 0; i < Game.buttonsEnd.length; i++)
		{
			if(Game.selectedEnd == Game.buttonsEnd[i])
			{
				Game.buttonsEnd[i].sprite.scale.setTo(0.9,0.9);
			}
			else
				Game.buttonsEnd[i].sprite.scale.setTo(0.8,0.8);
		}

		if(this.cursorsP1.down.isDown && Game.down == false)
		{
			Game.a++;
			if(Game.a > Game.buttonsEnd.length - 1)
				Game.a = 0;
			Game.selectedEnd = Game.buttonsEnd[Game.a];
			Game.down = true;
		}
		if(this.cursorsP1.down.isUp)
		{
			Game.down = false;
		}

		if(this.cursorsP1.up.isDown && Game.up == false)
		{
			Game.a--;
			if(Game.a < 0)
				Game.a = Game.buttonsEnd.length - 1;
			Game.selectedEnd = Game.buttonsEnd[Game.a];
			Game.up = true;
		}
		if(this.cursorsP1.up.isUp)
			Game.up = false;

		if(!this.cursorsP1.valider.isDown)
			Game.valider = false;
		if(this.cursorsP1.valider.isDown && Game.valider == false && this.jouer == false)
		{
			Game.valider = true;
			if(Game.selectedEnd == Game.buttonsEnd[0])
				Game.state.start('debug');
			else
				Game.state.start('selection');
		}
	}
}

function rejouer(Game)
{
	this.game.state.start('debug');
}

function menu(Game)
{
	this.game.state.start('menu');
}