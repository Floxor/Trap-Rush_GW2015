function Fin(Game, posX, posY)
{
	this.Game = Game;
	this.x = posX;
	this.y = posY;

	this.sprite = Game.add.sprite(this.x, this.y, 'placeholder5');
	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.allowGravity = false;
}