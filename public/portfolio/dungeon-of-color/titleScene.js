class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('background', 'assets/bg.png');
		this.load.image('play', 'assets/play.png');
		this.load.image('instructions', 'assets/instructions.png');
		this.load.image('back', 'assets/back.png');
		this.load.image('continue', 'assets/continue.png');
		this.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.fnt');
		
		// Game:
		//this.load.image('player', 'assets/player.png');
		this.load.image('player', 'assets/playerNew.png');
		this.load.image('sword', 'assets/sword4.png');
		this.load.image('room', 'assets/room.png');
		this.load.image('redEye', 'assets/enemies/red1.png');
		this.load.image('red2', 'assets/enemies/red2.png');
		this.load.image('chest', 'assets/chest.png');
		this.load.image('popupArrows', 'assets/popupArrows.png');
		this.load.image('popupHealth', 'assets/popupHealth.png');
		this.load.image('redBoss', 'assets/redBoss.png');
		this.load.image('blueBoss', 'assets/blueBoss.png');
		this.load.spritesheet('redPaintSpritesheet', 
            'assets/redPaintSpritesheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.image('arrow', 'assets/arrow.png');
        this.load.spritesheet('purplePaintSpritesheet', 
            'assets/purplePaintSpritesheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('bluePaintSpritesheet', 
            'assets/bluePaintSpritesheet.png',
            { frameWidth: 64, frameHeight: 64 });
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('bow', 'assets/bow.png');
        this.load.image('door1', 'assets/door1.png');
        this.load.image('door2', 'assets/door2.png');
		this.load.image('door3', 'assets/door3.png');
		this.load.image('blue1', 'assets/enemies/blue1.png');
		this.load.image('blue2', 'assets/enemies/blue2.png');
		this.load.image('damageOverlay', 'assets/damageOverlay.png');
		this.load.image('selector', 'assets/selector.png');
		this.load.image('popupLife', 'assets/popupLife.png');
		this.load.image('swordY', 'assets/swordY.png');
		this.load.image('swordX', 'assets/swordX.png');
		
		// ROOMS
		this.load.image('room1', 'assets/rooms/room1.png');
		
		this.load.image('room2W', 'assets/rooms/room2W.png');
		this.load.image('room2Y', 'assets/rooms/room2Y.png');
		this.load.image('room2B', 'assets/rooms/room2B.png');
		
		this.load.image('room3W', 'assets/rooms/room3W.png');
		this.load.image('room3B', 'assets/rooms/room3B.png');
		this.load.image('room3R', 'assets/rooms/room3R.png');
		
		this.load.image('room4W', 'assets/rooms/room4W.png');
		this.load.image('room4B', 'assets/rooms/room4B.png');
		this.load.image('room4R', 'assets/rooms/room4R.png');
		this.load.image('room4Y', 'assets/rooms/room4Y.png');
		
		this.load.image('corridor', 'assets/rooms/corridor.png');
		this.load.image('corridorY', 'assets/rooms/corridorY.png');
		
		this.load.image('bigBossRoom', 'assets/rooms/bigBossRoom.png');
		this.load.image('room5', 'assets/rooms/room5.png');
		this.load.image('room6', 'assets/rooms/room6.png');
		this.load.image('bigBlueBossRoom', 'assets/rooms/bigBlueBossRoom.png');
		this.load.image('corridorArena', 'assets/rooms/corridorArena.png');
		this.load.image('arena', 'assets/rooms/arena.png');
		// INVIS
		this.load.image('160x', 'assets/rooms/invis/160x.png');
		this.load.image('512y', 'assets/rooms/invis/512y.png');
		this.load.image('512x', 'assets/rooms/invis/512x.png');
		this.load.image('384y', 'assets/rooms/invis/384y.png');
		this.load.image('64x', 'assets/rooms/invis/64x.png');
		this.load.image('64y', 'assets/rooms/invis/64y.png');
		this.load.image('768x', 'assets/rooms/invis/768x.png');
		this.load.image('645y', 'assets/rooms/invis/645y.png');
		this.load.image('668x', 'assets/rooms/invis/668x.png');
		this.load.image('160y', 'assets/rooms/invis/160y.png');
		this.load.image('1024x', 'assets/rooms/invis/1024x.png');
		this.load.image('1024y', 'assets/rooms/invis/1024y.png');
		// AUDIO
        this.load.audio('theme', 'audio/kazoo.mp3');
		
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
	    var music = this.sound.add('theme', {loop:true});
	    music.play();
		this.add.sprite(342, 365, 'background'); // bg
        
        
        var title = this.add.bitmapText(16, 90, 'font', 'Dungeon\nof\nColor');
        //var title = this.add.text(16, 90, 'Dungeon\nof\nColor', {fontSize: '70px', fill: '#000', fontFamily: '"Arial"'});
		var playButton = this.add.image(450, 525, 'play').setScale(0.25).setInteractive({ useHandCursor: true}).on('pointerdown', () => this.clickButton());
		var instruct = this.add.sprite(185, 650, 'instructions').setScale(0.25).setInteractive().on('pointerdown', () => this.showInstructions());
		/*var fullscreen = this.add.image(450, 600, 'full').setInteractive().on('pointerdown', function() {
               window['game']['canvas'][game.device.fullscreen.request]();
               alert("Warning: Fullscreen is buggy.")
            });*/
            
	}
	
	clickButton() {
	    this.scene.switch('gameScene');
	}
	
	showInstructions() {
	    this.scene.switch('instructions');
	}

}

export default TitleScene;