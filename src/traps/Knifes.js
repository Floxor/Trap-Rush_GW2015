/**
*   La méthode start() doit être appeler pour actionner le piège
*   @param speed défini une vietesse de mouvement, par défaut est à 30
*   @param direction, par défaut vaut 'left'
*   @params x et y est la position du piège.
*/
function Knifes(pParams) {
    Trap.call(this, {game: pParams.game, x: pParams.x, y: pParams.y, sprite:'trap_knifes'});

    this.direction = pParams.direction || 'left';
    if(this.direction === 'left' || this.direction === -1) {
        this.direction = -1;
    } else if (this.direction === 'right' || this.direction === 1){
        this.direction = 1;
    }
    this.speed = (pParams.speed || 30) * this.direction;
    this.sprite.scale.x = -this.direction;

    this.init();

    this.itsTarget = this.x - 1200 - this.sprite.width * 2;

    this.doNormal = function () {
        this.sprite.x += this.speed;
        this.testKillPlayers();
        if (this.sprite.x < 0) {
            this.sprite.outOfBoundsKill = true;
        }
    };

    this.addTrap();
}

Knifes.prototype.constructor = Knifes;
Knifes.prototype = Object.create(Trap.prototype);

Knifes.prototype.init = function () {
    this.sprite.anchor.setTo(0, 1);
    this.simplePattern = true;
    this.sprite.body.allowGravity = false;
    this.sprite.checkWorldBounds = true;
    this.sprite.bringToTop();
};