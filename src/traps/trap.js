/*
*   Class mère des pièges
*/
function Trap(pParams) {
    this.game = pParams.game;
    this.x = pParams.x;
    this.y = pParams.y;
    if (pParams.sprite) {
        this.sprite = this.game.add.sprite(this.x, this.y, pParams.sprite, 0);
        this.sprite.animations.add(pParams.sprite);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.allowGravity = false;
    }
    if (pParams.lever) {
        new Lever({
            game: this.game,
            x: pParams.lever.x,
            y: pParams.lever.y,
            trap: this
        });
    }
    this.simplePattern = false; // doit être à true quand le trap s'enclanche dès ça création (il n'utilise pas de doAction)

    Game.physics.enable(this);

    this.doLoop = function () {
        this.doNormal();
    };

    this.addTrap = function() {
        Game.traps.push(this);
    };

    this.start = function() {
        if (!this.simplePattern) {
            this.doLoop = this.doAction;
        }
    };

}

Trap.prototype.collide = function () {
    this.game.physics.arcade.collideSpriteVsTilemapLayer(this.sprite, this.game.tilesCollision);
};

Trap.prototype.testKillPlayers = function () {
    //COLISION
    var _this = this;
    this.game.physics.arcade.overlap(this.sprite, this.game.player1.sprite, function() {
        _this.game.player1.killAnimation();
        _this.game.player1.frozen = 60;
    });
    this.game.physics.arcade.overlap(this.sprite, this.game.player2.sprite, function() {
        _this.game.player2.killAnimation();
        _this.game.player2.frozen = 60;
    });
};