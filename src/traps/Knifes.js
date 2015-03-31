/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*/
function Knifes(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_knifes');
    this.speed = pParams.speed || 30;

    this.init();

    this.itsTarget = this.x - 1200 - this.sprite.width * 2;

    this.doActionNormal = function () {
        if(this.sprite.x > this.itsTarget) this.sprite.x -= this.speed;

        //COLISION
        this.game.physics.arcade.collide(this.sprite, this.game.player.sprite, function() {

        });
    };

    this.addTrap();
}

Knifes.prototype.constructor = Knifes;
Knifes.prototype = Object.create(Trap.prototype);

Knifes.prototype.init = function () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.outOfBoundsKill = true;
    this.sprite.checkWorldBounds = true;
    this.sprite.bringToTop();
};