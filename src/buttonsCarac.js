function buttonPerso(Game, posX, posY, name, buttonNum)
{
	this.game = Game;
	this.x = posX;
	this.y = posY;
	this.name = name;
	this.config = Game.config.playerTypes[name];
	this.asset = this.config.assetKey;
	this.buttonNum = this.config.assetKey;

	this.graphics = Game.add.graphics(posX, posY);

	this.sprite = Game.add.sprite(posX, posY, this.asset);


}
