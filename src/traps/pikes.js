/**
*   La méthode start() doit être appeler pour actionner le piège
*   @parm orientation attend un string qui défini si les piques sont vers le 'haut' ou vers le 'bas'
*   @parm quantity défini la quantité de pique, par lot de 3
*/
function Pikes(pParams) {
    Trap.call(this, pParams.game, pParams.x, pParams.y);
    this.orientation = pParams.orientation || 'haut';
    this.quantity = pParams.quantity || 1;

    this.init();

    //First COLLISION
    this.sprite.hitArea = new Phaser.Rectangle(0,0,this.sprite[0].width,50)

    this.doAction = function() {
        //COLISION
        this.game.physics.arcade.collide(this.sprite.hitArea, this.game.player, function() {
            console.log('kill le joueur');
        });
    };

    this.doActionNormal = function() {
        //COLISION
        this.game.physics.arcade.collide(this.sprite, this.game.player, function() {
            console.log('kill le joueur');
        });
    };

    this.start = function () {
        this.doAction = this.doActionNormal;

        //ANIMATION
        //bird.animations.add('fly', [0, 1], 10, true);
        //bird.animations.play('fly');
        console.log('ANIMATION PIKES');
    };

    this.addTrap();
}

Pikes.prototype.constructor = Pikes;
Pikes.prototype = Object.create(Trap.constructor);

Pikes.prototype.init = function () {
    this.sprite = [];
    this.sprite[0] = Game.add.sprite(this.x, this.y, 'trap_pikes', 0);
    for (var i = 1; i < this.quantity; i++) {
        this.sprite.push(Game.add.sprite(this.x + (i * this.sprite[0].width), this.y, 'trap_pikes', 0));
    }

    for (var i = 0; i < this.quantity; i++) {
        this.sprite[i].anchor.setTo(0, 1);

        if (this.orientation === 'haut') {
            this.sprite[i].scale.y = 1;
        } else if (this.orientation === 'bas') {
            this.sprite[i].scale.y = -1;
        }
    }
};