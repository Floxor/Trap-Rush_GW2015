function TR_selection(Game){}

TR_selection.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		titre = Game.add.text(600, 100, 'CHOISISSEZ UN PERSONNAGE');
		titre.font = 'Calibri';
		titre.fontSize = 80;
		titre.fill = '#EE4444';
		titre.anchor.setTo(0.5,0.5);

		Game.carac1 = new buttonPerso(Game, 150, 200, "placeholder1");
		Game.carac2 = new buttonPerso(Game, 150, 300, "placeholder2");
		Game.carac3 = new buttonPerso(Game, 150, 400, "placeholder3");
		
		Game.buttons = [];
		Game.buttons.push(Game.carac1);
		Game.buttons.push(Game.carac2);
		Game.buttons.push(Game.carac3);

		Game.selected = Game.buttons[0];
		Game.caracSelected = new buttonPerso(Game, 400, 300, Game.buttons[0].name)
		Game.a = 0;

		if(Game.input.gamepad.supported && Game.input.gamepad["pad1"]) {
			if(Game.input.gamepad["pad1"]._rawPad)
				this.gamepadActivated = true;
		}

		var ellipse = Game.add.graphics(Game.world.centerX, Game.world.centerY);
		ellipse.lineStyle(8, 0xFFFFFF);
		ellipse.drawEllipse(100,100 ,200, 60);

		console.log(ellipse.x);
	},

	update: function(Game){
		Game.cursors.up.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] < -0.3 : Game.cursors.up.isDown;
		Game.cursors.up.isUp 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"]._rawPad.axes[1] > -0.3 : Game.cursors.up.isUp;
		Game.cursors.down.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] >  0.3 : Game.cursors.down.isDown;
		Game.cursors.down.isUp 	= this.gamepadActivated ?  	Game.input.gamepad["pad1"]._rawPad.axes[1] <  0.3 : Game.cursors.down.isUp;
		Game.cursors.valider.isDown 	= this.gamepadActivated ? 	Game.input.gamepad["pad1"].justPressed(Phaser.Gamepad.XBOX360_A,50) : Game.cursors.valider.isDown;
		// this.cursors.grab.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_Y,50) : this.cursors.grab.downDuration();
		// this.cursors.punch.isDown 	= this.gamepadActivated ?  	Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_X,50) : this.cursors.punch.downDuration();

		
		if(Game.cursors.down.isDown && Game.down == false)
		{
			Game.a++;
			if(Game.a > Game.buttons.length - 1)
				Game.a = 0;
			Game.selected = Game.buttons[Game.a];
			Game.down = true;
			Game.caracSelected.sprite.kill();
			Game.caracSelected = new buttonPerso(Game, 400, 300, Game.buttons[Game.a].name)
		}
		if(Game.cursors.down.isUp)
		{
			Game.down = false;
		}

		if(Game.cursors.up.isDown && Game.up == false)
		{
			Game.a--;
			if(Game.a < 0)
				Game.a = Game.buttons.length - 1;
			Game.selected = Game.buttons[Game.a];
			Game.up = true;
			Game.caracSelected.sprite.kill();
			Game.caracSelected = new buttonPerso(Game, 400, 300, Game.buttons[Game.a].name)
		}
		if(Game.cursors.up.isUp)
			Game.up = false;

		if(Game.cursors.valider.isDown && Game.valider == false && Game.jouer == false)
		{
			jouerButton = Game.add.button(600, 600, 'button', jouer, this, 1,1,1);
			jouerButton.input.useHandCursor = true;
			jouerButton.scale.setTo(1,0.6);
			jouerButton.anchor.setTo(0.5,0.5);
			Game.valider = true;
			Game.jouer = true;
			console.log("ok");
		}
		if(!Game.cursors.valider.isDown)
			Game.valider = false;
		if(Game.cursors.valider.isDown && Game.valider == false && Game.jouer == true)
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