function buttonPerso(Game, posX, posY, name, buttonNum)
{
	this.game = Game;
	this.x = posX;
	this.y = posY;
	this.name = name;
	this.buttonNum = buttonNum;
	this.graphics = Game.add.graphics(posX, posY);

	this.sprite = Game.add.sprite(posX, posY, name);


}
