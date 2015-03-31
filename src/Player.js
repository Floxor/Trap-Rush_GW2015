function Player (Game,type) {
	this.Game = Game;
	this.config = Game.config.playerTypes[type];
	this.numberJumpsLeft = 0;
	this.touchingWall = false;
	this.deactivateMovementTime = 0;




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
	this.touchingWall = false;
	if (this.sprite.body.onFloor() || this.sprite.body.touching.down){
		this.sprite.body.velocity.x = 0;
		this.numberJumpsLeft = this.config.maxJumps - 1;
	}
	else{
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.95;
	}

	if (this.sprite.body.touching.left || this.sprite.body.touching.right) {
		this.touchingWall = true;
	};

	if (!this.touchingWall) {
		this.sprite.body.gravity.y = this.config.gravity;
	 	if ((jumpButton.isDown && this.sprite.body.onFloor()) || (jumpButton.isDown && this.sprite.body.touching.down))
	    	this.jump();
	    else if (jumpButton.isDown && this.numberJumpsLeft && this.sprite.body.velocity.y > 10){
	    	this.numberJumpsLeft--;
	    	this.jump();
	    }
    }
    else{
		this.sprite.body.gravity.y = this.config.gravity / 5;
	 	if ((jumpButton.isDown && this.sprite.body.onFloor()) || (jumpButton.isDown && this.sprite.body.touching.down))
	    	this.jump();
	    else if (jumpButton.downDuration()){
        	this.sprite.body.velocity.y = -this.config.speedY * 0.75;
        	this.sprite.body.velocity.x = this.config.speedX * (this.sprite.body.touching.left - this.sprite.body.touching.right);
        	this.deactivateMovementTime = 20;
	    }
    }

   this.move();
    
}

Player.prototype.move = function() {
	if (this.deactivateMovementTime > 0){
		this.deactivateMovementTime--;
		return
	}
	 if (this.Game.keys.left.isDown) 
    	this.sprite.body.velocity.x = -this.config.speedX;
    
	if (this.Game.keys.right.isDown) 
    	this.sprite.body.velocity.x = this.config.speedX;
};

Player.prototype.jump = function() {
        this.sprite.body.velocity.y = -this.config.speedY;
};


function StaticBot (pos,Game,type) {
	Player.call(this,Game,type);
	this.sprite.body.allowGravity = false;
	this.sprite.x = pos[0];
	this.sprite.y = pos[1];
	this.sprite.body.immovable = true;
}

StaticBot.prototype.constructor = StaticBot;
StaticBot.prototype = Object.create(Player.prototype);

StaticBot.prototype.update = function () {
	this.Game.physics.arcade.collide(this.sprite,this.Game.player.sprite,null);
}