function Player (Game,type,pos,playerNumber) {
	playerNumber = playerNumber || 4;

	this.Game 						= Game;
	this.config 					= Game.config.playerTypes[type];
	this.numberJumpsLeft 			= 0;
	this.deactivateMovementTime 	= 0;
	this.facingRight			 	= true;
	this.touchingWall 				= false;
	this.acceleration 				= 0.1;
	this.frozen 					= 60;



	this.sprite = Game.add.sprite(pos[0],pos[1],this.config.assetKey,0);
	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.bounce.y = 0;
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = this.config.gravity;
	this.sprite.anchor.setTo(0.5,0.5);

/*
	this.animations.add('left', [0, 1, 2, 3], 10, true);
*/

	if(Game.input.gamepad.supported && Game.input.gamepad["pad"+playerNumber].connected) {
		console.log("change touches")
	}

	this.cursors = {
		jump 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
		right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
		grab 	: Game.input.keyboard.addKey(Phaser.Keyboard.G),
		punch 	: Game.input.keyboard.addKey(Phaser.Keyboard.P)
	};

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
	if (this.frozen-- > 0) {
		this.sprite.body.allowGravity = false;
		this.sprite.body.immovable = true;
		this.sprite.body.velocity.x = this.sprite.body.velocity.y = 0;
		return
	}
	else{
		this.sprite.body.allowGravity = true;
		this.sprite.body.immovable = false;
	}

	this.touchingWall = this.sprite.body.blocked.left || this.sprite.body.blocked.right;
	this.sprite.scale.x = this.facingRight ? 1 : -1;
	if (!this.touchingWall) {
		this.sprite.body.gravity.y = this.config.gravity;
		if ((this.cursors.jump.downDuration() && this.sprite.body.onFloor()) || (this.cursors.jump.downDuration() && this.sprite.body.blocked.down))
			this.jump();
		else if (this.cursors.jump.downDuration() && this.numberJumpsLeft && this.sprite.body.velocity.y > 10){
			this.numberJumpsLeft--;
			this.jump();
		}
		this.smokeEmitter.on = false;
	}
	else{
		this.sprite.body.velocity.y = this.sprite.body.velocity.y.clamp(-this.config.speedUp,this.config.speedDown *0.25);
		if ((this.cursors.jump.downDuration() && this.sprite.body.onFloor()) || (this.cursors.jump.downDuration() && this.sprite.body.blocked.down))
			this.jump();
		else if (this.cursors.jump.downDuration()){
			this.sprite.body.velocity.y = -this.config.speedUp;
			this.sprite.body.velocity.x = this.config.speedX  * (this.sprite.body.blocked.left - this.sprite.body.blocked.right) * 0.75;
			this.deactivateMovementTime = 10;
		}
		if (!this.sprite.body.onFloor()) {
			this.smokeEmitter.emitX = this.sprite.x + this.sprite.width * 0.5 + Math.random() * 20 - 10;
			this.smokeEmitter.emitY = this.sprite.y + Math.random() * 20 - 10;
			this.smokeEmitter.on = true;
		};
	}

	this.move();

	if (this.cursors.grab.isDown && !this.isGrabbing) 
		this.grab();
	else if (this.cursors.punch.isDown && !this.isPunching) 
		this.punch();
	this.sprite.body.velocity.y = (this.sprite.body.velocity.y).clamp(-this.config.speedUp,this.config.speedDown);
}

Player.prototype.grab = function() {
	this.isGrabbing = true;
	console.log("grab");
	that = this;
	setTimeout(function() {that.isGrabbing = false}, 500);
}

Player.prototype.punch = function() {
	this.isPunching = true;
	console.log("punch");
	that = this;
	setTimeout(function() {that.isPunching = false}, 500);
}


Player.prototype.move = function() {
	if (this.deactivateMovementTime > 0){
		this.deactivateMovementTime--;
		return
	}

	

 	if (this.cursors.left.isDown){
		this.facingRight = false;
		this.sprite.body.velocity.x = (this.sprite.body.velocity.x - this.config.speedX * this.acceleration).clamp(-this.config.speedX, 10000);
 	}
	else if (this.cursors.right.isDown){
		this.facingRight = true;
		this.sprite.body.velocity.x = (this.sprite.body.velocity.x + this.config.speedX * this.acceleration).clamp(-10000, this.config.speedX);
	}
	else if (this.sprite.body.onFloor() || this.sprite.body.blocked.down){
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.25;
	}
	else
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.80;

	if (this.sprite.body.onFloor() || this.sprite.body.blocked.down) 
		this.numberJumpsLeft = this.config.maxJumps - 1;
	
};

Player.prototype.jump = function() {
	this.sprite.body.velocity.y = -this.config.speedUp;
};


function StaticBot (pos,Game,type) {
	Player.call(this,Game,type,pos);
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
	Player.call(this,Game,type,pos);
	this.sprite.x = pos[0];
	this.sprite.y = pos[1];
	this.sprite.body.mass = 0.5;

	this.sprite.scale.setTo(0.4,0.4);
}

PickupElement.prototype.constructor = PickupElement;
PickupElement.prototype = Object.create(Player.prototype);

PickupElement.prototype.update = function () {
	this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.8;
	if (this.Game.physics.arcade.overlap(this.sprite,this.Game.player.sprite,null)) {
		console.log("overlap with player")
	};
	for (var i = this.Game.pickableGroup.length - 1; i >= 0; i--) {
		this.Game.physics.arcade.collide(this.sprite,this.Game.pickableGroup[i].sprite,null);
		
	};
}