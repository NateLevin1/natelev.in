class Instructions extends Phaser.Scene {
    constructor(){
        super({key : 'instructions'});
    }
    create() {
		this.add.sprite(342, 365, 'background'); // bg
        var title = this.add.text(16, 30, 'Instructions:', {fontSize: '50px', fill: '#000', fontFamily: '"Arial"'});
		this.add.text(16, 90, 'Move with wasd, arrow keys\nor joystick if on mobile.\nShoot an arrow by clicking.\nIf you have a colored\npaint (i.e. you defeated a\nboss) press e to draw\nwith it. Press r to switch\nbetween colors of paint.\nEnemies that are the same\ncolor as the paint can walk\nthrough it. Enemies that are\ndifferent colors than the paint\ncannot walk through it.', {fontSize: '20px', fill: '#000', fontFamily: '"Arial"'});
		this.add.text(325, 30, 'The green bar in the\nbottom right is your health.\nThe red and blue bars\nin the bottom right are\nhow much of each paint\nyou have. The number next\nto the arrows in the\nbottom right indicate how\nmany arrows you have.\nIf you are having trouble,\nuse space to take out\nyour sword.', {fontSize: '20px', fill: '#000', fontFamily: '"Arial"'});
		this.add.text(325, 320, 'Warning: Purple paint will\nhurt you.', {fontSize: '20px', fill: '#000', fontFamily: '"Arial"'});
		var instruct = this.add.sprite(185, 650, 'back').setScale(0.25).setInteractive().on('pointerdown', () => this.goBack());
    }
    goBack() {
        this.scene.switch('titleScene');
    }
}
export default Instructions;