function Player (Game,type) {
	this.Game 						= Game;
	this.config 					= Game.config.playerTypes[type];
	this.numberJumpsLeft 			= 0;
	this.deactivateMovementTime 	= 0;
	this.facingRight			 	= true;
	this.touchingWall 				= false;
	this.acceleration 				= 0.1;



	this.sprite = Game.add.sprite(0,0,this.config.assetKey,0);
	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.bounce.y = 0;
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = this.config.gravity;
	this.sprite.anchor.setTo(0.5,0.5);

/*
	this.animations.add('left', [0, 1, 2, 3], 10, true);
*/
	jumpButton = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.smokeEmitter = Game.add.emitter(Game.world.centerX, Game.world.height *0.5, Game.world.width * 0.5);
	this.smokeEmitter.makeParticles('smoke');
	this.smokeEmitter.setXSpeed(0, 0);
	this.smokeEmitter.setYSpeed(0, 0);
	this.smokeEmitter.setRotation(0, 0);
	this.smokeEmitter.setAlpha(0, 1, 500,Phaser.Easing.Linear.None,true);
	this.smokeEmitter.setScale(0.2,0.5,0.2,0.5, 500,Phaser.Easing.Linear.None,true);
	this.smokeEmitter.gravity = Game.gravity * 0.99;

	this.smokeEmitter.start(false, 500, 50);
	this.smokeEmitter.on = false;
}




Player.prototype.update = function () {
	this.touchingWall = this.sprite.body.touching.left || this.sprite.body.touching.right;
	if (!this.touchingWall) {
		this.sprite.body.gravity.y = this.config.gravity;
		if ((jumpButton.isDown && this.sprite.body.onFloor()) || (jumpButton.isDown && this.sprite.body.touching.down == true))
			this.jump();
		else if (jumpButton.isDown && this.numberJumpsLeft && this.sprite.body.velocity.y > 10){
			this.numberJumpsLeft--;
			this.jump();
		}
		this.smokeEmitter.on = false;
	}
	else{
		this.sprite.body.velocity.y = this.sprite.body.velocity.y.clamp(-1000,200);
		if ((jumpButton.isDown && this.sprite.body.onFloor()) || (jumpButton.isDown && this.sprite.body.touching.down))
			this.jump();
		else if (jumpButton.downDuration()){
			this.sprite.body.velocity.y = -this.config.speedY * 0.75;
			this.sprite.body.velocity.x = this.config.speedX  * (this.sprite.body.touching.left - this.sprite.body.touching.right);
			this.deactivateMovementTime = 10;
		}
		if (!this.sprite.body.onFloor()) {
			this.smokeEmitter.emitX = this.sprite.x - (this.sprite.body.touching.left - this.sprite.body.touching.right) * this.sprite.width * 0.5 + Math.random() * 20 - 10;
			this.smokeEmitter.emitY = this.sprite.y + Math.random() * 20 - 10;
			this.smokeEmitter.on = true;
		};
	}

   this.move();
	
}

/*
G = 71 
P = 80
*/

Player.prototype.move = function() {
	if (this.deactivateMovementTime > 0){
		this.deactivateMovementTime--;
		return
	}

	

 	if (this.Game.keys.left.isDown){
		this.facingRight = false;
		this.sprite.body.velocity.x = (this.sprite.body.velocity.x - this.config.speedX * this.acceleration).clamp(-this.config.speedX, 10000);
 	}
	else if (this.Game.keys.right.isDown){
		this.facingRight = true;
		this.sprite.body.velocity.x = (this.sprite.body.velocity.x + this.config.speedX * this.acceleration).clamp(-10000, this.config.speedX);
	}
	else if (this.sprite.body.onFloor() || this.sprite.body.touching.down){
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.25;
	}
	else
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.80;
	
	if (this.sprite.body.onFloor() || this.sprite.body.touching.down) 
		this.numberJumpsLeft = this.config.maxJumps - 1;
	
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


function PickupElement (pos,Game,type) {
	Player.call(this,Game,type);
	this.sprite.x = pos[0];
	this.sprite.y = pos[1];
	this.sprite.body.mass = 0.5;
	this.sprite.scale.setTo(0.4,0.4);
}

PickupElement.prototype.constructor = PickupElement;
PickupElement.prototype = Object.create(Player.prototype);

PickupElement.prototype.update = function () {
	this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.8;
	this.Game.physics.arcade.collide(this.sprite,this.Game.player.sprite,null);
	for (var i = this.Game.pickableGroup.length - 1; i >= 0; i--) {
		this.Game.physics.arcade.collide(this.sprite,this.Game.pickableGroup[i].sprite,null);
		
	};
}