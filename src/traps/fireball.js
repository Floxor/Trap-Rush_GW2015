/**
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*   @parm angle défini un angle de départ, par défaut est à 45 degre
*/
function Fireball(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_fireball');
    this.speed = pParams.speed || 20;

    this.init();

    this.doAction = function () {

        //COLISION
        this.game.physics.arcade.overlap(this.sprite, this.game.player.sprite, function() {
            //kill le joueur
        });

    };

    this.addTrap();
}

Fireball.prototype.constructor = Fireball;
Fireball.prototype = Object.create(Trap.prototype);

Fireball.prototype.init = function () {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.allowGravity = false;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.angle = 90;

    //rebond et colision
    this.sprite.outOfBoundsKill         = true;
    this.sprite.checkWorldBounds        = true;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.bringToTop();
    this.sprite.body.bounce.x           = this.sprite.body.bounce.y = 1;
    this.sprite.body.velocity.x         = 750;
    this.sprite.body.velocity.y         = 750;

    //Destroy
    //this.sprite.lifespan = 5000;
    var _this = this;
    var delay = setTimeout(function() {
        _this.sprite.body.collideWorldBounds = false;
    }, 5000);
};