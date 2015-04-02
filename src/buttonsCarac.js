function buttonPerso(Game, posX, posY, name)
{
	this.game = Game;
	this.x = posX;
	this.y = posY;
	this.name = name;
	this.selected = false;
	this.graphics = Game.add.graphics(posX, posY);

	this.sprite = Game.add.sprite(posX, posY, name);
}

function selection(Game)
{
	
}

buttonPerso.prototype.update = function() {
	
}

