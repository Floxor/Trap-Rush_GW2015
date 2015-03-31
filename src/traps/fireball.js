/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*   @parm angle défini un angle de départ, par défaut est à 45 degre
*/
function Fireball(pParams) {
    /*Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_fireball');
    this.speed = pParams.speed || 20;

    this.init();

    this.doActionNormal = function () {
        this.sprite.x -= this.speed;
        this.sprite.y -= this.speed;

        //COLISION
        this.game.physics.arcade.collide(this.sprite, this.game.player, function() {
            //kill le joueur
        });
    };

    this.addTrap();*/
}
/*
Fireball.prototype.constructor = Fireball;
Fireball.prototype = Object.create(Trap.constructor);

Fireball.prototype.init = function () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.angle = 90;
};*/