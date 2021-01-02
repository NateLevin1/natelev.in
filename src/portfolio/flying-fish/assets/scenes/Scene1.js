
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
		
		
	}
	
	/* START-USER-CODE */

	create() {
		// AUDIO
		const bubble = this.sound.add("bubble");
		const flap = this.sound.add("flap");
		const music = this.sound.add("music", { loop: true, volume: 0.8 });
		music.play();
		this.music = music;
		this.lastRateScore = 0;

		death = "die";
		this.add.text(10, 10, "Flying Fish 1.2\nClick and drag to launch\nthe fish.", {fontSize: '15px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);
			var mode = this.add.text(10, 970, "Disable Death", {fontSize: '20px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0,0).setScrollFactor(0).setDepth(100).setInteractive().on('pointerdown', function() {
				if(mode.text == 'Disable Death') {
					mode.text = 'Enable Death'
					death="nodie";
				} else if(mode.text == 'Enable Death') {
					mode.text = 'Disable Death'
					death="die";
				}
			});
		this.score = 0;
		this.scoreText = this.add.text(735, 955, this.score, {fontSize: '36px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(1,0).setDepth(100).setScrollFactor(0);
		
		this.startText = this.add.text(375, 500, "Tap to begin!", {fontSize: '30px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0.5,0.5).setDepth(100);

		this.matter.add.image(256.0, 128.0, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
		this.matter.add.image(512, -256, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
		
		var rand = 0;
		var yPos = 0;
		for(var g = 0; g<100; g++) { // 99 rooms
			rand = Phaser.Math.Between(1,4);
			yPos = g*-640 - 1024;
			
			if(rand == 1) {
				this.matter.add.image(512, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(0, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(128, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				//this.matter.add.image(256, -1024, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(384, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				//this.matter.add.image(640, -1024, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(768, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
			} else if(rand == 2) {
				this.matter.add.image(512, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
				this.matter.add.image(225, yPos-214, "wall", null, {isStatic: true}).setScale(1, 1).setIgnoreGravity(true);
			} else if(rand == 3) {
				this.matter.add.image(256, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
				this.matter.add.image(512, yPos-338, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
				this.matter.add.image(0, yPos-338, "wall", null, {isStatic: true}).setScale(1, 1).setIgnoreGravity(true);
			} else if(rand == 4) {
				this.matter.add.image(256, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
				this.matter.add.image(512, yPos-384, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
			}
		}
		
		//var win = this.matter.add.image(512, -1600, "win").setScale(1, 1).setIgnoreGravity(true).setCollisionCategory(null);
		this.graphics = this.add.graphics();
		this.graphics.lineStyle(1, 0x000000, 1);
		this.draw = false;
		this.player = this.matter.add.sprite(60, 1100,'fish', null, {timeScale:0.5}).setScale(1.3).setOnCollide(()=>this.lose());
		//this.matter.overlap(this.player, win, ()=>{alert("You Win!");});
		this.started = false;
		//this.pointer = this.input.activePointer;
		this.mouse = this.matter.add.sprite(0, 1100,'fish').setIgnoreGravity(true).setCollisionCategory(null).setVisible(false);
		this.cameras.main.startFollow(this.player);
		//this.cameras.main.setOrigin(0,1000);
		this.cameras.main.setBounds(0,-50000,450,51000);
		this.input.on('pointerdown', function(cursor) {
			if(this.startText.visible) {
				this.startText.visible = false;
			}

			if(this.started === false) {
				bubble.play(); // play sfx
				this.player.x=60;
				this.player.y=1000;
				this.player.setVelocityX(0);
				this.player.setVelocityY(0);
				this.player.thrustLeft(1); // up
				this.player.thrust(0.3); // forward
			} else {
				if(cursor.y<960) {
					this.draw = true;
				}
			}
			
		}, this);
		this.add.sprite(95, 980,'waves').setScale(2);
		this.add.sprite(287, 980,'waves').setScale(2);
		this.add.sprite(479, 980,'waves').setScale(2);
		this.add.sprite(671, 980,'waves').setScale(2);
		//this.waves = this.matter.add.sprite(95, 980,'waves', null, {setImmovable: true}).setIgnoreGravity(true).setScale(2);
		
		
		
		this.input.on('pointerup', function(cursor) {
			if(this.started !== false) {
				if(cursor.y<960) {
					this.draw = false;
					this.player.rotation = Phaser.Math.Angle.BetweenPoints(this.player, this.mouse);
					this.player.thrustBack(Phaser.Math.Distance.BetweenPoints(this.player, this.mouse)/800); // forward 0.3
					flap.setRate(Math.random()+0.8);
					flap.play();
				}
			} else {
				this.started = true;
				this.player.flipX = true;
			}
				
		}, this)
		this._create();
	}
	
	lose(force = false) {
		if((!force && death == "die") || force) {
			if(confirm("You Lose! Retry?")) {
				this.music.stop();
				this.scene.restart();
			}
		}
	}
	update() {
		
		if(Math.floor(this.player.y) < this.score) {
			this.score = Math.floor(this.player.y);
			this.scoreText.text = -this.score;
			if(this.lastRateScore - 5000 >= this.score) {
				this.music.setRate(1 + ((-this.score) / 50000));
				this.lastRateScore = Math.round(this.score / 100) * 100;
			}
		}
		
		this.mouse.x = this.input.activePointer.x + this.cameras.main.scrollX;
		this.mouse.y = this.input.activePointer.y + this.cameras.main.scrollY;
		if(this.draw === true) {
			this.graphics.lineStyle(5, 0x000000, 1);
			this.graphics.lineBetween(this.mouse.x, this.mouse.y, this.player.x, this.player.y);
			setTimeout(()=>{this.graphics.clear();}, 20);
		}
		
		if(this.started === true) {
			if(this.player.y>1100) {
				this.lose(true);
			} else if(this.player.y < -50000) {
				alert("You win!");
			}
			// screenwrap
			if(this.player.x > 820) {
				this.player.x = -70;
			}
			if(this.player.x < -70) {
				this.player.x = 820;
			}
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
