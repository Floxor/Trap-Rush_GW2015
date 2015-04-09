/*
*   Levier utilisé pour activer un piège associé
*   @params game attend le Game
*   @params trap attend le piège associer (optinel)
*   @params x et y est la position du piège
*   @params callBack est la fonction appelé lors de l'activation du livier
*/
function Lever(pParams) {
    this.game = pParams.game;
    this.trap = pParams.trap || false;
    this.x = pParams.x;
    this.y = pParams.y;
    this.callBack = pParams.callBack || function(){};

    this.activated = false;

    this.init();

    this.doLoop = function () {
        var _this = this;
        if(!this.activated){
            this.game.physics.arcade.overlap(this.sprite, this.game.player1.sprite, function() {
                if (_this.game.player1.cursors.down.isDown) {
                    _this.activation();
                    _this.game.player1.killAnimation();
                    _this.game.player1.actionTrap = true;
                }
            });
            this.game.physics.arcade.overlap(this.sprite, this.game.player2.sprite, function() {
                if (_this.game.player2.cursors.down.isDown) {
                    _this.activation();
                    _this.game.player2.killAnimation();
                    _this.game.player2.actionTrap = true;
                }
            });
        }
    };

    this.addLeverLoop();
}

Lever.prototype.init = function() {
    this.sprite = this.game.add.sprite(this.x, this.y, 'lever', 0);
    this.sprite.animations.add('lever');
    this.sprite.anchor.setTo(0, 1);
    this.game.physics.enable(this);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
};

Lever.prototype.activation = function() {
    if (!this.activation.called) {
        this.activation.called = true;
        this.callBack();
        this.animation();

        if(this.trap && this.trap.start) {
            this.trap.start();
        }
    }
};

Lever.prototype.animation = function() {
    console.log('Animation du levier');
    this.sprite.animations.play('lever', 20, false, false);
    this.activated = true;
};

Lever.prototype.addLeverLoop = function() {
    this.game.traps.push(this);
};