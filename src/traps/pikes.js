/**
*   La méthode start() doit être appeler pour actionner le piège
*   @param orientation attend un string qui défini si les piques sont vers le 'top' ou vers le 'bottom'
*   @param quantity défini la quantité de pique, par lot de 3
*/
function Pikes(pParams) {
    Trap.call(this, {game: pParams.game, x: pParams.x, y: pParams.y, lever: pParams.lever});
    this.orientation = pParams.orientation || 'top';
    this.quantity = pParams.quantity || 1;

    this.init();

    this.doNormal = function () {
        this.game.physics.arcade.overlap(this.hitArea, this.game.player.sprite, function() {
            //_this.game.player.killAnimation();
            console.log('kill player')
        });
    };

    this.doAction = function () {
        for (var i = this.quantity -1; i >= 0; i--) {
            this.game.physics.arcade.overlap(this.sprite[i], this.game.player.sprite, function() {
                //_this.game.player.killAnimation();
                console.log('kill player')
            });
        }
    };

    this.start = function () {
        this.doLoop = this.doAction;

        //ANIMATION
        for (var i = this.quantity -1; i >= 0; i--) {
            this.sprite[i].animations.play('trap_pikes'+i, 20, false, false);
            console.log(i+' ggg');
        }

        console.log('ANIMATION PIKES');
    };

    this.addTrap();
}

Pikes.prototype.constructor = Pikes;
Pikes.prototype = Object.create(Trap.prototype);

Pikes.prototype.init = function () {
    this.sprite = [];
    this.sprite[0] = this.game.add.sprite(this.x, this.y, 'trap_pikes', 0);
    this.sprite[0].animations.add('trap_pikes'+0);
    for (var i = 1; i < this.quantity; i++) {
        this.sprite.push(this.game.add.sprite(this.x + (i * this.sprite[0].width), this.y, 'trap_pikes', 0));
        this.sprite[i].animations.add('trap_pikes'+i);
    }

    for (var i = 0; i < this.quantity; i++) {
        this.sprite[i].anchor.setTo(0, 1);
        this.game.physics.enable(this.sprite[i], Phaser.Physics.ARCADE);
        this.sprite[i].body.allowGravity = false;

        //COLLISION state: Normal
        this.hitArea = this.game.add.sprite(0, 0, null);
        this.game.physics.enable(this.hitArea, Phaser.Physics.ARCADE);
        this.hitArea.body.allowGravity = false;
        this.hitArea.body.setSize(this.sprite[0].width * this.quantity, 10, this.sprite[0].x, this.sprite[0].y);
        

        if (this.orientation === 'top') {
            this.sprite[i].scale.y = 1;
        } else if (this.orientation === 'bottom') {
            this.sprite[i].scale.y = -1;
        }
    }
};