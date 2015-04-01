function TR_menu(Game){}

TR_menu.prototype = {
	preload: function(Game){

	},

	create: function(Game){
		textWin = Game.add.text(600, 100, 'TRAP RUSH');
		textWin.font = 'Calibri';
		textWin.fontSize = 120;
		textWin.fill = '#EE4444';
		textWin.anchor.setTo(0.5,0.5);

		jouerButton = Game.add.button(600, 500, 'button', jouer, this, 1,1,1);
		jouerButton.input.useHandCursor = true;
		jouerButton.scale.setTo(0.8,0.8);
		jouerButton.anchor.setTo(0.5,0.5);

		jouerText = Game.add.text(590,490, 'JOUER');
		jouerText.font = 'Arial';
		jouerText.fontSize = 50;
		jouerText.fill = "#000000";
		jouerText.anchor.setTo(0.5,0.5);
	},

	update: function(Game){

	}
}

function jouer(Game)
{
	this.game.state.start('debug');
}