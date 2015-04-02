function Hud(Game) {
    this.game = Game;
    this.init();

    //Timer second
    this.timer = 0;
    this.timerText = this.game.add.text(15, 20, "Time: "+this.timer, { font: "24px Arial", fill: "#dddddd" });

    this.loop = this.game.time.events.loop(Phaser.Timer.SECOND, function() {
        this.timer++;
        this.timerText.text = "Time: "+this.timer;
    }, this);









    this.update = function() {
        this.playerIcon1.x = this.game.player1.sprite.x
        this.playerIcon1.y = this.game.player1.sprite.y - this.game.player1.sprite.height * 0.5 - this.iconsDistance;
        this.playerIcon2.x = this.game.player2.sprite.x
        this.playerIcon2.y = this.game.player2.sprite.y - this.game.player2.sprite.height * 0.5 - this.iconsDistance;
    };




}

Hud.prototype.init = function() {
    this.startCountdown();

    //Players icons
    this.iconsDistance = 20;
    this.playerIcon1 = this.game.add.sprite(this.game.player1.sprite.x, this.game.player1.sprite.y - this.game.player1.sprite.height * 0.5 - this.iconsDistance,"icon_player1");
    this.playerIcon1.anchor.setTo(0.5, 1);
    this.playerIcon2 = this.game.add.sprite(this.game.player2.sprite.x, this.game.player2.sprite.y - this.game.player2.sprite.height * 0.5 - this.iconsDistance,"icon_player2");
    this.playerIcon2.anchor.setTo(0.5, 1);
};

Hud.prototype.startCountdown = function() {
    console.log('ANIMATION: COMPTE A REBOURS');
};