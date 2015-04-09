/**
*   La méthode start() doit être appeler pour actionner le piège
*   @param speed défini une vietesse de mouvement, par défaut est à 50
*   @param direction, par défaut vaut 'left'
*/
function Pikeswall(pParams) {
    Trap.call(this, {game: pParams.game, x: pParams.x, y: pParams.y, sprite:'trap_pikeswall', lever: pParams.lever});

    this.speed = pParams.speed || 50;

    this.direction = pParams.direction || 'left';
    if(this.direction === 'left' || this.direction === -1) {
        // this.sprite.scale.x = -1;
        // this.sprite.anchor.setTo(1, 0);
        this.angle = 90;
    } else if (this.direction === 'right' || this.direction === 1){
        this.sprite.scale.x = 1;
        this.sprite.anchor.setTo(1, 0);
        this.angle = -90;
    }

    // pivot = Game.add.tween(this.sprite);

    this.loweringTime = 1000;
    this.counter = 0;

    this.doNormal = function () {
        this.testKillPlayers();
    };

    this.doAction = function () {
        if (this.counter < this.loweringTime) {
            // pivot.to({ angle: this.angle }, this.speed, Phaser.Easing.Linear.None, true);
            // pivot.start();
            this.game.add.tween(this.sprite).to( { angle: this.angle }, this.speed, Phaser.Easing.Linear.None, true);
        }

        // pigArrives = game.add.tween(pig);

        // pigArrives.to({x:150}, 1000, Phaser.Easing.Bounce.Out);
        // pigArrives.onComplete.add(firstTween, this);
        // pigArrives.start();

        this.testKillPlayers();
    };

    this.addTrap();

}

Pikeswall.prototype.constructor = Pikeswall;
Pikeswall.prototype = Object.create(Trap.prototype);