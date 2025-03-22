class End extends Phaser.Scene {

	constructor() {
		super({key : 'gameScene'});
	}

	init() {
        
	}

	create() {
	    this.add.text(450,350, 'THE END', { fontSize: 18, color: '#ffffff' });
	    cam = this.cameras.main;
        this.cameras.main.setViewport(0, 0, 900, 700);
        cam.backgroundColor.setTo(0,0,0);
	}
	end(){
	    
	}
}
export default End;