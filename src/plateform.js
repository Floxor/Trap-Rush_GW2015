function Plateform(Game, posX, posY)
{
	this.x = posX;
	this.y = posY;

	this.sprite = Game.add.sprite(this.x, this.y, 'bloc');
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.scale.setTo(0.5,0.5);

	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.bounce.y = 0;
	this.sprite.body.allowGravity = false;
	this.sprite.body.immovable = true;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	this.sprite.body.checkCollision.down = false;
}

function creerPlateform(Game)
{
	for(var i = 0; i < 3; i++)
	{
		Game.plateforms.push(new Plateform(Game, 200 + i*400, 650));
	}
	Game.plateforms.push(new Plateform(Game, 600, 300));
}