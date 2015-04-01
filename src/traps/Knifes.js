/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 30
*/
function Knifes(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_knifes');
    this.speed = pParams.speed || 30;

    this.init();

    this.itsTarget = this.x - 1200 - this.sprite.width * 2;

    this.doNormal = function () {
        this.sprite.x -= this.speed;
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
    this.sprite.body.allowGravity = false;
    this.sprite.checkWorldBounds = true;
    this.sprite.bringToTop();
};