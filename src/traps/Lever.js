/*
*   Levier utilisé pour activer un piège associé
*   @params game attend le Game
*   @params trap attend le piège associer
*   @params x et y est la position du piège
*   @params callBack est la fonction appelé lors de l'activation du livier
*/
function Lever(pParams) {
    this.game = pParams.game;
    this.trap = pParams.trap || false;  //si trap on .start sinon pas. +callBack parce que cool
    this.x = pParams.x;
    this.y = pParams.y;
    this.callBack = pParams.callBack || function(){};

    this.init();

    this.doLoop = function () {
        var _this = this;
        this.game.physics.arcade.overlap(this.sprite, this.game.player.sprite, function() {
            _this.activation();
        });
    };

    this.addLeverLoop();
}

Lever.prototype.init = function() {
    this.sprite = this.game.add.sprite(this.x, this.y, 'trap_lever', 0);
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
};

Lever.prototype.addLeverLoop = function() {
    this.game.traps.push(this);
};