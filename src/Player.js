function Player (Game,type) {
	this.Game = Game;
	this.config = Game.config.playerTypes[type];
	this.numberJumpsLeft = 0;





	this.sprite = Game.add.sprite(0,0,this.config.assetKey,0);
	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.sprite.body.bounce.y = 0;
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = this.config.gravity;

/*
 	this.animations.add('left', [0, 1, 2, 3], 10, true);
*/
	jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

Player.prototype.update = function () {
	if (this.sprite.body.onFloor()){
		this.sprite.body.velocity.x = 0;
		this.numberJumpsLeft = this.config.maxJumps - 1;
	}
	else{
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.95;
	}

	if (this.sprite.body) {};

 	if (jumpButton.isDown && this.sprite.body.onFloor())
    	this.jump();
    if (jumpButton.isDown && this.numberJumpsLeft && this.sprite.body.velocity.y > 10){
    	this.numberJumpsLeft--;
    	this.jump();
    }

    if (this.Game.keys.left.isDown) 
    	this.sprite.body.velocity.x = -this.config.speedX;
    
	if (this.Game.keys.right.isDown) 
    	this.sprite.body.velocity.x = this.config.speedX;
    
}

Player.prototype.jump = function() {
        this.sprite.body.velocity.y = -this.config.speedY;
};