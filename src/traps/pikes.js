function Pikes(pParams) {
    Trap.call(this, pParams.x, pParams.y, 'trap_pikes');
    this.sprite.anchor.setTo(0, 1);
    pParams.orientation = pParams.orientation || 'haut';

    if (pParams.orientation === 'haut') {
        this.sprite.scale.y = 1;
    } else if (pParams.orientation === 'bas') {
        this.sprite.scale.y = -1;
    }

    this.doAction = function () {

    };

    this.start();
}