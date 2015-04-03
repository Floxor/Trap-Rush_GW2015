/**
*   @param speed défini la vélocité, par défaut est à 50
*   @param acceleration, par défaut est à 0.1
*   @param angle défini un angle de départ, par défaut est à 45 degre
*   @params x et y est la position du piège
*   @params directionX et directionY, par défaut est aléatoire. Peux valoir 'right', 'left' et 'top', 'bottom' ou 1 et -1
*/
function Fireball(pParams) {
    Trap.call(this, {game: pParams.game, x: pParams.x, y: pParams.y, sprite:'trap_fireball'});
    this.speed = pParams.speed || 700;
    this.currentSpeed = 1;
    this.acceleration = 0.25;

    this.directionX = pParams.directionX || 'right';
    this.directionY = pParams.directionY || 'bottom';
    if(this.directionX === 'right' || this.directionX === 1) {
        this.directionX = 1;
    } else if (this.directionX === 'left' || this.directionX === -1){
        this.directionX = -1;
    }
    if(this.directionY === 'bottom' || this.directionY === 1) {
        this.directionY = 1;
    } else if (this.directionY === 'top' || this.directionY === -1){
        this.directionY = -1;
    }

    this.init();

    this.doNormal = function () {

        this.testKillPlayers();

        //accelaration
        if(this.currentSpeed < this.speed) this.currentSpeed += (this.speed - this.currentSpeed) * this.acceleration;

        if (this.collidable) {

            if (this.game.physics.arcade.collide(this.sprite, this.game.stageEdges.bottom)) {
                //this.sprite.body.velocity.y = - this.currentSpeed;
                this.directionY = -1;
            } else if (this.game.physics.arcade.collide(this.sprite, this.game.stageEdges.right)) {
                //this.sprite.body.velocity.x = - this.currentSpeed;
                this.directionX = -1;
            } else if (this.game.physics.arcade.collide(this.sprite, this.game.stageEdges.left)) {
                //this.sprite.body.velocity.x = this.currentSpeed;
                this.directionX = 1;
            } else if (this.game.physics.arcade.collide(this.sprite, this.game.stageEdges.top)) {
                //this.sprite.body.velocity.y = this.currentSpeed;
                this.directionY = 1;
            }

            this.sprite.body.velocity.x = this.currentSpeed * this.directionX;
            this.sprite.body.velocity.y = this.currentSpeed * this.directionY;
        }

    };

    this.addTrap();
}

Fireball.prototype.constructor = Fireball;
Fireball.prototype = Object.create(Trap.prototype);

Fireball.prototype.init = function () {
    this.simplePattern = true;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.angle = 90;

    //rebond et colision
    this.collidable = true;
    this.sprite.outOfBoundsKill     = true;
    this.sprite.bringToTop();
    this.sprite.body.bounce.x       = this.sprite.body.bounce.y = 1;

    //movement
    this.sprite.body.velocity.x = this.currentSpeed * this.directionX;
    this.sprite.body.velocity.y = this.currentSpeed * this.directionY;

    //Destroy
    var _this = this;
    var delay = setTimeout(function() {
        _this.collidable = false;
    }, 5000);
};