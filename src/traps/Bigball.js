/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*/
function Bigball(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_bigball');
    this.speed = pParams.speed || 10;

    this.init();

    this.itsTarget = this.x - 1200 - this.sprite.width * 2;

    this.doActionNormal = function () {
        if(this.sprite.x > this.itsTarget) this.sprite.x -= this.speed;

        //ANIMATION
        //bird.animations.add('fly', [0, 1], 10, true);
        //bird.animations.play('fly');

        //COLISION
        this.collide();
    };

    this.doAction = function () {
        this.collide();
    };

    this.addTrap();
}

Bigball.prototype.constructor = Bigball;
Bigball.prototype = Object.create(Trap.prototype);

Bigball.prototype.init = function () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = true;
    this.sprite.body.gravity.y = 1500;
};