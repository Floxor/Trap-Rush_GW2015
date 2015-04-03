function Player (Game,type,pos,playerNumber) {
	this.playerNumber 				= playerNumber || 4;
	this.gamepadActivated 			= false

	this.Game 						= Game;
	this.config 					= Game.config.playerTypes[type];
	this.numberJumpsLeft 			= 0;
	this.deactivateMovementTime 	= 0;
	this.facingRight			 	= true;
	this.touchingWall 				= false;
	this.slidding 					= false;
	this.acceleration 				= 0.1;
	this.frozen 					= 60;
	this.punchTimeout 				= 0;
	this.grabTimeout 				= 0;
	this.activeSpeedX 				= this.config.speedX;

	var arrayPlayers = [1,2];
	arrayPlayers.splice(arrayPlayers.indexOf(this.playerNumber),1);
	this.opponentNumber = arrayPlayers[0];




	this.sprite = Game.add.sprite(pos[0],pos[1],this.config.assetKey,0);
	Game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.bounce.y = 0;
	this.sprite.body.gravity.y = this.config.gravity;
	this.sprite.body.setSize(50,75,0,0);
	this.originalBody = {};
	this.originalBody.width = this.sprite.body.width;
	this.originalBody.height = this.sprite.body.height;
	
	this.sprite.body.mass = 0.1;
	this.sprite.anchor.setTo(0.5,0.5);
	this.sprite.scale.setTo(this.config.scale[0],this.config.scale[1]);


	this.sprite.animations.add("idle",[17,18,19,20,21,22,23,24,25,26,27,28,29]);
	this.sprite.animations.add("jump",[0,1,2,3,4,5,6,7,8,9]);
	this.sprite.animations.add("run",[34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]);
	this.sprite.animations.add("death",[51,52,53,54,55,56,57,58,59,60,61,62]);
	this.sprite.animations.add("fall",[85,86,87,88,89,90,91,92,93,94,95,96,97,98,99]);
	this.sprite.animations.add("roll",[102,103,104,105,106,107,108,109]);
	this.sprite.animations.add("spin",[119,120,121,122,123,124,125,126,127,129,130,131,132,133,134,135]);
	this.sprite.animations.add("slide",[136]);
	this.sprite.animations.play("idle",24,true);

	this.cursors = {
		jump 	: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		left 	: Game.input.keyboard.addKey(Phaser.Keyboard.Q),
		right 	: Game.input.keyboard.addKey(Phaser.Keyboard.D),
		down 	: Game.input.keyboard.addKey(Phaser.Keyboard.S),
		grab 	: Game.input.keyboard.addKey(Phaser.Keyboard.G),
		punch 	: Game.input.keyboard.addKey(Phaser.Keyboard.P)
	};

	this.gamepadActivated = Game.input.gamepad["pad"+playerNumber] ? Game.input.gamepad["pad"+playerNumber]._rawPad : false;


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

	this.rectColli = Game.add.sprite(0, 0, null);
	Game.physics.enable(this.rectColli, Phaser.Physics.ARCADE);
	this.rectColli.body.setSize(100, 125, 0, 0);
	this.rectColli.anchor.setTo(0.5, 0.5);


}




Player.prototype.update = function () {

	this.gamepadActivated = this.Game.input.gamepad["pad"+this.playerNumber] ? this.Game.input.gamepad["pad"+this.playerNumber]._rawPad : false;

	this.sprite.body.velocity.x = Math.abs(this.sprite.body.velocity.x) < 1? 0 : this.sprite.body.velocity.x;
	this.sprite.body.velocity.y = Math.abs(this.sprite.body.velocity.y) < 1? 0 : this.sprite.body.velocity.y;

	if (this.Game.input.gamepad["pad"+this.playerNumber]._rawPad) {
		this.cursors.left.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber]._rawPad.axes[0] < -0.3 : this.cursors.left.isDown;
		this.cursors.right.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber]._rawPad.axes[0] >  0.3 : this.cursors.right.isDown;
		this.cursors.down.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber].isDown(Phaser.Gamepad.XBOX360_B) : this.cursors.down.isDown;
		this.cursors.down.realeased = this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber].isUp(Phaser.Gamepad.XBOX360_B) : this.cursors.down.upDuration();
		this.cursors.jump.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_A,50) : this.cursors.jump.downDuration();
		this.cursors.grab.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_Y,50) : this.cursors.grab.downDuration();
		this.cursors.punch.isDown 	= this.gamepadActivated ? this.Game.input.gamepad["pad"+this.playerNumber].justPressed(Phaser.Gamepad.XBOX360_X,50) : this.cursors.punch.downDuration();
	}	

	this.slidding = this.cursors.down.isDown;
	

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

	if (this.isDead-- < 0 && this.sprite.alive == true) {
		 this.respawn();
	};

	this.touchingWall = this.sprite.body.blocked.left || this.sprite.body.blocked.right;
	this.sprite.scale.x = this.facingRight ? this.config.scale[0] : -this.config.scale[0];

	if (this.slidding && this.sprite.body.blocked.down) {
		this.deactivateMovementTime = 1;
		if (this.sprite.body.velocity.x < -this.activeSpeedX  * 0.3)
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x).clamp(-this.activeSpeedX , -this.activeSpeedX  * 0.3);
		else if (this.sprite.body.velocity.x > this.activeSpeedX  * 0.3)
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x).clamp(this.activeSpeedX  * 0.3, this.activeSpeedX );
		this.sprite.body.setSize(this.originalBody.width,this.originalBody.height * 0.5,0,this.originalBody.height * 0.25);
		this.sprite.animations.play("roll",24,true);
	}
	else if(this.cursors.down.realeased)
		this.sprite.body.setSize(this.originalBody.width,this.originalBody.height,0,0);


	this.move();
	if (!this.touchingWall) {
		this.sprite.body.gravity.y = this.config.gravity;
		if ((this.cursors.jump.isDown && this.sprite.body.onFloor()) || (this.cursors.jump.isDown && this.sprite.body.blocked.down))
			this.jump();
		else if (this.cursors.jump.isDown && this.numberJumpsLeft && this.sprite.body.velocity.y > -500){
			this.numberJumpsLeft--;
			this.jump();
			this.sprite.animations.play("roll",24,true);
		}
		this.smokeEmitter.on = false;
	}
	else{
		if (this.punchTimeout <= 0) 
			this.sprite.animations.play("slide",24,true);

		this.sprite.body.velocity.y = this.sprite.body.velocity.y.clamp(-this.config.speedUp,this.config.speedDown *0.25);
		if ((this.cursors.jump.isDown && this.sprite.body.onFloor()) || (this.cursors.jump.isDown && this.sprite.body.blocked.down))
			this.jump();
		else if (this.cursors.jump.isDown){
			this.numberJumpsLeft = this.config.maxJumps - 1;
			this.facingRight = !this.facingRight;
			this.launch(10,this.activeSpeedX   * (this.sprite.body.blocked.left - this.sprite.body.blocked.right) * 0.75,-this.config.speedUp);
		}
		if (!this.sprite.body.blocked.down) {
			this.smokeEmitter.emitX = this.sprite.x + this.sprite.body.width * 0.5 * this.sprite.scale.x + Math.random() * 20 - 10;
			this.smokeEmitter.emitY = this.sprite.y + Math.random() * 20 - 10;
			this.smokeEmitter.on = true;
		};
	}


	if (this.grabTimeout-- < 0 && this.cursors.grab.isDown) 
		this.grab();
	else if (this.punchTimeout-- < 0 && this.cursors.punch.isDown) 
		this.punch();
	this.sprite.body.velocity.y = (this.sprite.body.velocity.y).clamp(-this.config.speedUp,this.config.speedDown);
	this.rectColli.x = this.sprite.x + this.sprite.width * 0.5 + this.rectColli.width * (this.facingRight - 0.5);
	this.rectColli.y = this.sprite.y;

	if (this.sprite.body.velocity.y > 500 && this.sprite.animations.currentAnim.name != "fall" && this.punchTimeout <= 0 && !this.touchingWall) {
		this.sprite.animations.play("fall",24,false);
	};
	if (this.punchTimeout > 0 && this.sprite.animations.currentAnim.name != "spin") {
		this.sprite.animations.play("spin",24,false);
	}

}

Player.prototype.grab = function() {
	this.grabTimeout = 30;
		if (this.Game.physics.arcade.overlap(this.rectColli,this.Game["player"+this.opponentNumber].sprite)) {
			var angle = this.Game.physics.arcade.angleBetween(this.sprite,this.Game["player"+this.opponentNumber].sprite);
			this.Game["player"+this.opponentNumber].launch(20,- this.config.punchPower * Math.cos(angle) * 0.75,  - 300 - this.config.punchPower * Math.sin(angle));
			return;
		};	

		if (this.carrying) {
			var angle = this.Game.physics.arcade.angleBetween(this.sprite,this.Game["player"+this.opponentNumber].sprite);
			this.objectCarried.throw(this.Game["player"+this.opponentNumber],this.config.punchPower + this.config.punchPower * Math.cos(angle) * 0.5,  this.config.punchPower +  this.config.punchPower * Math.sin(angle))
			this.carrying = false;
			this.objectCarried = null;
			return;
		};

		for (var i = this.Game.pickableGroup.length - 1; i >= 0; i--) {
			if (this.Game.physics.arcade.overlap(this.rectColli,this.Game.pickableGroup[i].sprite) && !this.Game.pickableGroup[i].thrown) {
				this.Game.pickableGroup[i].picked = true;
				this.Game.pickableGroup[i].pickedBy = this;
				this.Game.pickableGroup[i].sprite.body.allowGravity = false;
				this.Game.pickableGroup[i].sprite.body.immovable = true;
				this.carrying = true;
				this.objectCarried = this.Game.pickableGroup[i];
				return;
			}
		};

}

Player.prototype.punch = function() {
	this.sprite.animations.play("spin",24,false);
		if (this.Game.physics.arcade.overlap(this.rectColli,this.Game["player"+this.opponentNumber].sprite)) {
			var angle = this.Game.physics.arcade.angleBetween(this.sprite,this.Game["player"+this.opponentNumber].sprite);

			this.Game["player"+this.opponentNumber].launch(15,this.config.punchPower * Math.cos(angle) *0.5,  - 300 + this.config.punchPower * Math.sin(angle));
		};	
	this.punchTimeout = 30;
}

Player.prototype.launch = function(timeStunned,forceX,forceY) {
	this.sprite.animations.play("jump",24,true);
	this.deactivateMovementTime = timeStunned;
	this.sprite.body.velocity.x = forceX;
	this.sprite.body.velocity.y = forceY;
}



Player.prototype.move = function() {
	if (this.deactivateMovementTime-- >= 0)
		return
	
	//if (this.Game["player"+this.opponentNumber].deactivateMovementTime <= 0)
	//	this.Game.physics.arcade.collide(this.Game.player1.sprite,this.Game.player2.sprite);

 	if (this.cursors.left.isDown){
 		if (this.sprite.body.blocked.down) 
			this.sprite.animations.play("run",24,true);
		this.facingRight = false;
		if (this.gamepadActivated) 
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x - this.activeSpeedX  * this.acceleration * Math.abs(this.Game.input.gamepad["pad"+this.playerNumber]._rawPad.axes[0])).clamp(-this.activeSpeedX , 10000);
		else
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x - this.activeSpeedX  * this.acceleration).clamp(-this.activeSpeedX , 10000);
 	}
	else if (this.cursors.right.isDown){
 		if (this.sprite.body.blocked.down) 
			this.sprite.animations.play("run",24,true);
		this.facingRight = true;
		if (this.gamepadActivated) 
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x + this.activeSpeedX  * this.acceleration * Math.abs(this.Game.input.gamepad["pad"+this.playerNumber]._rawPad.axes[0])).clamp(-10000, this.activeSpeedX );
		else
			this.sprite.body.velocity.x = (this.sprite.body.velocity.x + this.activeSpeedX  * this.acceleration).clamp(-10000, this.activeSpeedX );
	}
	else if (this.sprite.body.onFloor() || this.sprite.body.blocked.down){
		if (this.punchTimeout <= 0) 
			this.sprite.animations.play("idle",24,true);
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.25;
	}
	else
		this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.80;

	if (this.sprite.body.onFloor() || this.sprite.body.blocked.down) 
		this.numberJumpsLeft = this.config.maxJumps - 1;
	
};

Player.prototype.jump = function() {
	if (this.deactivateMovementTime <= 0){
		this.sprite.animations.play("jump",24,true);
		this.sprite.body.velocity.y = -this.config.speedUp;
	}

};


Player.prototype.killAnimation = function () {
	this.sprite.animations.play("death",24,false,true);

	this.frozen = this.isDead = 60;
	
}

Player.prototype.respawn = function () {
	this.sprite.revive();
	this.sprite.x = this.Game["player"+this.opponentNumber].sprite.x;
	this.sprite.y = this.Game["player"+this.opponentNumber].sprite.y;
}


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
	this.Game.physics.arcade.collide(this.sprite,this.Game.player1.sprite,null);
	this.Game.physics.arcade.collide(this.sprite,this.Game.player2.sprite,null);
}


function PickupElement (pos,Game,type) {
	Player.call(this,Game,type,pos);
	this.sprite.x = pos[0];
	this.sprite.y = pos[1];
	this.sprite.body.mass = 0.05;
	this.sprite.body.setSize(this.sprite.body.width*10,this.sprite.body.height* 10,0,0);

}

PickupElement.prototype.constructor = PickupElement;
PickupElement.prototype = Object.create(Player.prototype);

PickupElement.prototype.update = function () {
	if (this.thrown) {
		this.sprite.outOfBoundsKill = true;
		if (this.Game.physics.arcade.overlap(this.sprite,this.targetPlayer.sprite)) {
			var angle = this.Game.physics.arcade.angleBetween(this.pickedBy.sprite,this.Game["player"+this.opponentNumber].sprite);
			this.targetPlayer.launch(90,10 * Math.cos(angle), 300 * Math.sin(angle));
			this.sprite.destroy();
			this.Game.pickableGroup.splice(this.Game.pickableGroup.indexOf(this),1);
		};
		return;
	};
	this.sprite.body.velocity.x = this.sprite.body.velocity.x * 0.97;
	this.sprite.body.velocity.y = (this.sprite.body.velocity.y).clamp(-this.config.speedUp,this.config.speedDown);
	if (this.picked) {
		
		this.sprite.x = this.pickedBy.rectColli.x;
		this.sprite.y = this.pickedBy.rectColli.y;
		return;
	};

	for (var i = this.Game.pickableGroup.length - 1; i >= 0; i--) {
		this.Game.physics.arcade.collide(this.sprite,this.Game.pickableGroup[i].sprite,null);
	};
}


PickupElement.prototype.throw = function(target,forceX,forceY) {
	if (!this.sprite.body){
		this.sprite.kill();
		return;
	}
	this.targetPlayer 			= target;
	this.thrown 				= true;
	this.sprite.body.velocity.x = forceX;
	this.sprite.body.velocity.y = forceY;
	this.sprite.body.immovable  = false;
	this.goThroughMap 			= true;
}