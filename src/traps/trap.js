function Trap(pGame, pX, pY, pSprite) {
    this.x = pX;
    this.y = pY;
    this.sprite = Game.add.sprite(this.x, this.y, pSprite, 0);

    Game.physics.enable(this);

    this.doAction = function () {
        console.log('1');
    };

    this.start = function() {
        Game.traps.push(this);
    };
}