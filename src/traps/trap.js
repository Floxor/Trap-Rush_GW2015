/*
*   Class mère des pièges
*/
function Trap(Game, pX, pY, pSprite) {
    this.game = Game;
    this.x = pX;
    this.y = pY;
    if (pSprite) {
        this.sprite = Game.add.sprite(this.x, this.y, pSprite, 0);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowGravity = false;
    }

    Game.physics.enable(this);

    this.doLoop = function () {
        this.doNormal();
    };

    this.addTrap = function() {
        Game.traps.push(this);
    };

    this.start = function() {
        this.doLoop = this.doAction;
    };

}

Trap.prototype.collide = function () {
    for (var i = 0; i < this.game.plateforms.length; i++) {
        this.game.physics.arcade.collide(this.sprite, this.game.plateforms[i].sprite);
    }
};

Trap.prototype.testKillPlayers = function () {
    //COLISION
    var _this = this;
    this.game.physics.arcade.overlap(this.sprite, this.game.player.sprite, function() {
        //_this.game.player.killAnimation();
        console.log('kill player')
    });
};