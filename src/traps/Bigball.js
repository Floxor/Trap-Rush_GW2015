/**
*   La méthode start() doit être appeler pour actionner le piège
*   @param speed défini une vietesse de mouvement, par défaut est à 30
*   @param acceleration, par défaut est à 0.1
*   @param direction, par défaut vaut 'left'
*/
function Bigball(pParams) {
    Trap.call(this, {game: pParams.game, x: pParams.x, y: pParams.y, sprite:'trap_bigball', lever: pParams.lever});

    this.direction = pParams.direction || 'left';
    if(this.direction === 'left' || this.direction === -1) {
        this.direction = -1;
    } else if (this.direction === 'right' || this.direction === 1){
        this.direction = 1;
    }

    this.speed = pParams.speed || 10;
    this.acceleration = pParams.acceleration || 0.1;
    this.currentSpeed = 0;

    this.init();

    this.doAction = function () {

        //movement
        this.sprite.x += this.currentSpeed * this.direction;
        //acceleration
        if(this.currentSpeed < this.speed) this.currentSpeed += (this.speed - this.currentSpeed) * this.acceleration;


        //ANIMATION
        //bird.animations.add('fly', [0, 1], 10, true);
        //bird.animations.play('fly');

        //COLISION
        this.collide();
        this.testKillPlayers();
    };

    this.doNormal = function () {
        this.collide();
        //this.game.physics.arcade.collide(this.game.player.sprite, this.sprite);
        this.testKillPlayers();
    };

    this.addTrap();
}

Bigball.prototype.constructor = Bigball;
Bigball.prototype = Object.create(Trap.prototype);

Bigball.prototype.init = function () {
    this.sprite.body.allowGravity = true;
    this.sprite.body.gravity.y = 1500;
};