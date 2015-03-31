/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*/
function Bigball(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_bigball');
    this.speed = pParams.speed || 20;

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.allowGravity = true;

    this.itsTarget = this.x - 1200 - this.sprite.width * 2;

    this.doActionNormal = function () {
        if(this.sprite.x > this.itsTarget) this.sprite.x -= this.speed;

        //ANIMATION
        //bird.animations.add('fly', [0, 1], 10, true);
        //bird.animations.play('fly');

        //COLISION
        this.game.physics.arcade.collide(this.sprite, this.game.player.sprite, function() {
            //kill le joueur
            console.log('hit');
        });
    };

    this.addTrap();
    this.start();
}