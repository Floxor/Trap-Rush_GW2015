/*
*   Class mère des pièges
*/
function Trap(Game, pX, pY, pSprite) {
    this.game = Game;
    this.x = pX;
    this.y = pY;
    if (pSprite) this.sprite = Game.add.sprite(this.x, this.y, pSprite, 0);

    Game.physics.enable(this);

    this.doAction = function () {
        console.log('loop');
    };

    this.addTrap = function() {
        Game.traps.push(this);
    };

    this.start = function() {
        this.doAction = this.doActionNormal;
    };
}

Trap.prototype.constructor = Trap;