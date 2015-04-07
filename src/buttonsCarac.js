function buttonPerso(Game, posX, posY, name, buttonNum)
{
	this.game = Game;
	this.x = posX;
	this.y = posY;
	this.name = name;
	this.config = Game.config.playerTypes[name];
	if (this.config){
		this.asset = this.config.icon;
		this.buttonNum = this.config.assetKey;
	}
	else
		this.asset = name;

	this.sprite = Game.add.sprite(posX, posY, this.asset);
	this.sprite.scale.setTo(0.5,0.5);
}
