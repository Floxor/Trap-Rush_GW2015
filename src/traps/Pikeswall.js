/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm speed défini une vietesse de mouvement, par défaut est à 50
*/
function Pikeswall(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y, 'trap_pikeswall');
    this.speed = pParams.speed || 50;

    this.loweringTime = 1000;
    this.counter = 0;

    this.doNormal = function () {
        this.testKillPlayers();
    };

    this.doAction = function () {
        if (this.counter < this.loweringTime) {
            //this.sprite.angle(90);
            this.game.add.tween(this.sprite).to( { angle: 90 }, this.speed, Phaser.Easing.Linear.None, true);
        }

        this.testKillPlayers();
    };

    this.addTrap();

}

Pikeswall.prototype.constructor = Pikeswall;
Pikeswall.prototype = Object.create(Trap.prototype);