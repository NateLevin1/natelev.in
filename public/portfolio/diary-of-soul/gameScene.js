class GameScene extends Phaser.Scene {

	constructor() {
		super({key : 'gameScene'});
	}

	init() {
        
	}

	preload() {
		// Preload in title
	}

	create() {
	    
	    this.add.image(190.5, 162, 'bg');
	    
        player = this.physics.add.sprite(156, 210, 'playerImg').setDepth(100);
        
        gameBody = this.physics.add.sprite(400, 230, 'chest').setAngle(90);
        tree = this.physics.add.sprite(650, 190, 'tree');
        var hole = this.physics.add.sprite(780, 280, 'hole');
        bLadder = this.physics.add.sprite(780, 280, 'bLadder').setVisible(false);
        this.physics.add.sprite(780, 357, 'underground');
        dark = this.physics.add.sprite(384, 357, 'dark');
        gamePlug = this.physics.add.sprite(500, 357, 'plug').setScale(0.90);
        gameSwitch = this.physics.add.sprite(913.5, 357, 'switch').setScale(0.90);
        var outlet = this.physics.add.sprite(1100, 357, 'outlet').setScale(0.65);
        gameOS = this.physics.add.sprite(1100, 357, 'os').setScale(0.7).setVisible(false);
        
        talkbox = this.physics.add.sprite(200, 180, 'talkbox').setDepth(101).setVisible(false);
        talkText = this.add.text(178,173,'Talking...', { fontSize: 7, color: '#000000' }).setDepth(102).setVisible(false);
        // MENU ITEMS           MENU ITEMS          MENU ITEMS          MENU ITEMS          MENU ITEMS
        //star1 = this.add.image(-8,2, 'starUnfilled').setScale(0.5).setDepth(1000).setScrollFactor(0);
        
        pointer = game.input.activePointer;
        
        // CAMERA
        cam = this.cameras.main;
        this.cameras.main.setViewport(277, 333, 381, 324);
        cam.startFollow(player, true);
        cam.setFollowOffset(-35, 50);
        cam.backgroundColor.setTo(0,0,0);
        
        // Collision
        this.physics.add.overlap(player, gameBody, ()=>{
            player.x=379;
            talk("Looks to be a dead body.");
            text.text = "";
            cross.clear(true,true);
            text.text+= '"Looks to be a dead body,"\nI think to myself. I can inspect\nit with "I inspect body."\n';
            oldText = text.text;
        }, null, this);
        
        this.physics.add.overlap(player, tree, ()=>{
            player.x=617.5;
            talk("A tree blocks my path");
            text.text = "";
            cross.clear(true,true);
            text.text+= '"A tree blocks my path,"\nI say aloud.\n';
            oldText = text.text;
        }, null, this);
        this.physics.add.overlap(player, hole, ()=>{
            if(bLadder.visible === false) {
                player.x=757.5;
                talk("A hole.");
                text.text = "";
                cross.clear(true,true);
                text.text+= '"A hole." I sigh. In order to go\ndown it, I must have a makeshift ladder,\nwhich is created from bones and a log\nusing "I make ladder."\n';
                oldText = text.text;
            } else {
                player.y += 1;
            }
        }, null, this);
        
        let wonAlready = false;
        this.physics.add.overlap(player, dark, ()=>{
            if(section < 5 ) {
            player.x=480.5;
            //talk("Too dark!.");
            text.text = "";
            cross.clear(true,true);
            text.text+= 'I can\'t see past this point. I\nneed to turn on the lights.\n';
            oldText = text.text;
            } else {
                if(wonAlready) return;
                wonAlready = true;
                player.x=480;
                text.text = "";
                cross.clear(true,true);
                text.text+= 'Wha... Why are there so many dead\nbodies? Wait a minute. That means...\n';
                setTimeout(()=>{
                    text.text+= 'In order to join my friends, I need\nto be a part of this pile. Than\nyou for the assistance.\n';
                },8000);
                section = 6;
                setTimeout(()=>{
                    this.sound.play('gong');
                    game.scene.destroy('gameScene');
                    game.scene.destroy('titleScene');
                },4000);
            }
        }, null, this);
        
        this.physics.add.overlap(player, gamePlug, ()=>{
            player.x=522;
            text.text = "";
            cross.clear(true,true);
            text.text+= 'This is a plug. It can become an\noutlet starter. Looks like it\'s missing a\npiece, though.\n';
            oldText = text.text;
        }, null, this);
        
        this.physics.add.overlap(player, gameSwitch, ()=>{
            player.x=889;
            text.text = "";
            cross.clear(true,true);
            text.text+= 'This is a switch. Looks like it controls\nsomething important.\n';
            oldText = text.text;
        }, null, this);
        
        this.physics.add.overlap(player, outlet, ()=>{
            player.x=1078.5;
            text.text = "";
            cross.clear(true,true);
            text.text+= 'This is an outlet! Might come\nin handy.\n';
            oldText = text.text;
        }, null, this);
        

    }

	update() {
	    if(playerDir == "right") {
	        player.setVelocityX(100);
	    } else if(playerDir == "left") {
	        player.setVelocityX(-100);
	    } else {
	        player.setVelocityX(0);
	    }
	}


	end() {
		
	}
	


}

export default GameScene;