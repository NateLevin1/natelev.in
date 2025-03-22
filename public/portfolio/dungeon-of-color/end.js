class End extends Phaser.Scene {
    constructor(){
        super({key : 'end'});
    }
    create() {
        var end = this.add.text(16, 90, 'You\nDied', {fontSize: '140px', fill: '#fff', fontFamily: '"Arial"'});
        this.add.text(500, 150, 'Kills:', {fontSize: '40px', fill: '#fff', fontFamily: '"Arial"'});
        this.add.text(500, 250, kills, {fontSize: '90px', fill: '#fff', fontFamily: '"Arial"'});
        this.add.image(130, 570, 'continue').setScale(0.5).setInteractive({ useHandCursor: true}).on('pointerdown', () => this.continueGame());
    }
    continueGame() {
        this.scene.switch('gameScene');
    }
}
export default End;