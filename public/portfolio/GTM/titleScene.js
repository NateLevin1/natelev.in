class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('background', 'assets/background.jpg');
		this.load.image('play', 'assets/play.png');
		//this.load.image('full', 'assets/fullscreen.png');
		
		// AUDIO
        this.load.audio('dirty', 'audio/titleScreen.mp3');
		this.load.audio('runningthroughthecity', 'audio/runningthroughthecity.mp3');
		
		// SCENES
		this.load.image('missionBG', 'assets/missionBG.png');
		this.load.image('buyGunBG', 'assets/buildingMaterials/clothes/gunBuyBG.png');
		this.load.image('buyClothesBG', 'assets/buildingMaterials/clothes/clothesBuyBG.png');
		this.load.image('pickUp', 'assets/buildingMaterials/clothes/pickUp.png');
		this.load.image('checkoutBG', 'assets/checkoutBG.png');
		this.load.image('pay', 'assets/pay.png');
		this.load.image('buyPredatory', 'assets/predatory.png');
		this.load.image('policeKnockoffShirt', 'assets/buildingMaterials/clothes/policeKnockoffShirt.png');
		
		var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        // Text
        var loadingText = this.make.text({
            x: 450,
            y: 250,
            text: 'Loading...',
            style: {
                font: '40px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: 430,
            y: 295,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        
        var assetText = this.make.text({
            x: 430,
            y: 395,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
		
		
        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
            
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.src);
        });
 
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
	}

	create() {
	    //music = this.sound.play('runningthroughthecity');
		var bg = this.add.sprite(200, 500, 'background');
        
        var title = this.add.text(16, 64, 'Grand Theft Manual', {fontSize: '80px', fill: '#000'});
		var playButton = this.add.image(450, 400, 'play').setInteractive({ useHandCursor: true}).on('pointerdown', () => this.clickButton());
		/*var fullscreen = this.add.image(450, 600, 'full').setInteractive().on('pointerdown', function() {
               window['game']['canvas'][game.device.fullscreen.request]();
               alert("Warning: Fullscreen is buggy.")
            });*/
            
	}
	
	clickButton() {
	    this.scene.switch('gameScene');
	}

}

export default TitleScene;