function TR_end(Game){}

TR_end.prototype = {
	preload: function(Game)
	{

	},

	create: function(Game)
	{
		Game.plateforms = [];
		creerPlateform(Game);

		winner = Game.add.sprite(800,400,'placeholder2')
		winner.scale.setTo(2,2);

		textWin = Game.add.text(-400, 100, 'FLO WIN !!');
		textWin.font = 'Calibri';
		textWin.fontSize = 70;
		textWin.fill = '#EE9933'

		Game.add.tween(textWin).to({x: 400}, 3000, Phaser.Easing.Bounce.Out, true);

		rejouer = Game.add.button(300, 500, 'button', rejouer, this, 1,1,1);
		rejouer.input.useHandCursor = true;
		rejouer.scale.setTo(0.5,0.5);

		menu = Game.add.button(300, 500, 'button', menu, this, 1,1,1);
		menu.input.useHandCursor = true;
		menu.scale.setTo(0.5,0.5);

		menuText = Game.add.text(365, 515, 'MENU');
		menuText.font = 'Calibri';
		menuText.fontSize = 40;
		menuText.fill = '#000000';
	},

	update: function(Game)
	{	}
}

function rejouer(Game)
{
	this.game.state.start('debug');
}

function menu(Game)
{
	this.game.state.start('menu');
}