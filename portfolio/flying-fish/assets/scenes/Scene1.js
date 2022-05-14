
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
		music.setVolume(0.3);
		music.play();
		this.music = music;
		this.lastRateScore = 0;

		death = "die";
		this.deathEverDisabled = false;
		this.add.text(10, 10, "Flying Fish 1.3\nClick and drag to launch\nthe fish. Avoid the walls!", {fontSize: '15px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);
		const mode = this.add.text(74, 970, "Disable Death", {fontSize: '20px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0.5,0).setScrollFactor(0).setDepth(100).setInteractive().on('pointerdown', ()=>{
			if(mode.text == 'Disable Death') {
				mode.text = 'Enable Death'
				death="nodie";
				this.deathEverDisabled = true;
			} else if(mode.text == 'Enable Death') {
				mode.text = 'Disable Death'
				death="die";
			}
		});
		mode.input.cursor = "pointer";

		this.score = 0;
		this.scoreText = this.add.text(735, 955, this.score, {fontSize: '36px', fill: '#000', fontFamily: '"Arial"', stroke: "#ffffff90", strokeThickness: 5 }).setOrigin(1,0).setDepth(100).setScrollFactor(0);
		
		this.startText = this.add.text(375, 500, "Tap to begin!", {fontSize: '30px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0.5,0.5).setDepth(100);
		this.startTextScaleIncreasing = true;

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
		this.lineGraphics = this.add.graphics();
		this.lineGraphics.lineStyle(1, 0x000000, 1);
		this.draw = false;
		this.drawStart = 0;
		this.playerSkin = "fish";
		this.player = this.matter.add.sprite(60, 1100, this.playerSkin, null, {timeScale:0.5}).setScale(1.3).setOnCollide(()=>{
			if(!this.restartConfig.display) this.lose();
		});

		this.restartGraphics = this.add.graphics();
		this.restartConfig = {
			bgColor: 0xfff000,
			bgOpacity: 0.5,
			width: 600,
			height: 500,

			buttonColor: 0xff0000,
			buttonWidth: 400,

			display: false
		};

		//this.matter.overlap(this.player, win, ()=>{alert("You Win!");});
		this.started = false;
		//this.pointer = this.input.activePointer;
		this.mouse = this.matter.add.sprite(0, 1100,'fish').setIgnoreGravity(true).setCollisionCategory(null).setVisible(false);
		this.cameras.main.startFollow(this.player);
		//this.cameras.main.setOrigin(0,1000);
		this.cameras.main.setBounds(0,-50000,450,51000);
		this.input.on('pointerdown', (cursor)=>{
			if(this.restartConfig.display === true) return;
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
				if(cursor.y<960 || cursor.x > 140) {
					this.draw = true;
					this.drawStart = Date.now();
				}
			}
			
		}, this);
		this.add.sprite(95, 980,'waves').setScale(2);
		this.add.sprite(287, 980,'waves').setScale(2);
		this.add.sprite(479, 980,'waves').setScale(2);
		this.add.sprite(671, 980,'waves').setScale(2);
		//this.waves = this.matter.add.sprite(95, 980,'waves', null, {setImmovable: true}).setIgnoreGravity(true).setScale(2);
		
		
		
		this.input.on('pointerup', function(cursor) {
			if(this.started === true && this.restartConfig.display === false) {
				if(this.draw) {
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
				
		}, this);

		this.input.keyboard.on("keydown-R", (event)=>{
			if(this.restartConfig.display) {
				this.restart();
			}
		});
		this.input.keyboard.on("keydown-F", (event)=>{
			if(this.player.texture.key === "fish") {
				this.player.setTexture("shark");
			} else {
				this.player.setTexture("fish");
			}
		});

		this._create();
	}
	
	lose(force = false) {
		if((!force && death == "die") || force) {
			const bubble = this.sound.add("bubble");
			bubble.setRate(6);
			bubble.play();
			setTimeout(()=>{
				bubble.setRate(5);
				bubble.play();
			}, 100);
			setTimeout(()=>{
				bubble.setRate(4);
				bubble.play();
			}, 200);

			this.draw = false;
			this.matter.world.engine.timing.timeScale = 0.5;
			this.restartConfig.display = true;
			const {
				bgColor, bgOpacity, width, height,
				buttonColor, buttonWidth 
			} = this.restartConfig;
			this.add.text(735/2, 350, "Your Score:", {fontSize: '50px', fill: '#000', fontFamily: '"Arial"', stroke: "#fff", strokeThickness: 5 }).setOrigin(0.5).setDepth(100).setScrollFactor(0);
			this.add.text(735/2, 400, (-this.score) + (this.deathEverDisabled ? "*" : ""), {fontSize: '100px', fill: '#fff', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 10 }).setOrigin(0.5, 0).setDepth(100).setScrollFactor(0);
			this.restartGraphics.fillStyle(bgColor, bgOpacity);
			this.restartGraphics.fillRoundedRect(375-(width/2), 500-(height/2), width, height, 20).setScrollFactor(0);
			
			// restart button
			const restartButton = this.add.graphics();
			restartButton.useHandCursor = true;
			const clickRect = this.add.rectangle(735/2-buttonWidth/2, 555, buttonWidth, 150).setScrollFactor(0).setOrigin(0);
			restartButton.setInteractive(clickRect, (_clickRect, x, y)=>{
				return x >= clickRect.getTopLeft().x && x <= clickRect.getTopRight().x
						&& y <= clickRect.getBottomLeft().y && y >= clickRect.getTopLeft().y;
			});
			restartButton.input.cursor = "pointer";
			// restartButton.setInteractive();
			restartButton.fillStyle(0x000000, 0.5);
			restartButton.fillRoundedRect(735/2-(buttonWidth+3)/2, 558, (buttonWidth+3), 150, 20).setScrollFactor(0);
			const fillButton = ()=>{
				restartButton.fillStyle(buttonColor, 1);
			restartButton.fillRoundedRect(735/2-buttonWidth/2, 555, buttonWidth, 150, 20).setScrollFactor(0);
			};
			fillButton();
			restartButton.once("pointerup", ()=>this.restart());
			const stopShadow = ()=>{
				restartButton.clear();
				fillButton();
			};
			restartButton.on("pointerdown", stopShadow);
			const text = this.add.text(735/2, 630, "Restart!", {fontSize: '60px', fill: '#fff', fontFamily: '"Arial"'}).setOrigin(0.5).setDepth(100).setScrollFactor(0).setInteractive().on("pointerup", ()=>this.restart());
			text.input.cursor = "pointer";
			text.on("pointerdown", stopShadow);
		}
	}
	restart() {
		this.matter.world.engine.timing.timeScale = 1;
		this.music.stop();
		this.scene.restart();
	}
	update() {
		
		if(!this.restartConfig.display && Math.floor(this.player.y) < this.score) {
			this.score = Math.floor(this.player.y);
			this.scoreText.text = -this.score;
			if(this.lastRateScore - 5000 >= this.score) {
				this.music.setRate(1 + ((-this.score) / 50000));
				this.lastRateScore = Math.round(this.score / 100) * 100;
			}
		}
		
		this.mouse.x = this.input.activePointer.x + this.cameras.main.scrollX;
		this.mouse.y = this.input.activePointer.y + this.cameras.main.scrollY;
		this.lineGraphics.clear();
		if(this.draw === true || Date.now() - this.drawStart < 50) {
			this.lineGraphics.lineStyle(5, 0x000000, 1);
			this.lineGraphics.lineBetween(this.mouse.x, this.mouse.y, this.player.x, this.player.y);
		}
		
		if(this.started === true) {
			if(!this.restartConfig.display) {
				if(this.player.y>1100) {
					this.lose(true);
				} else if(this.player.y < -50000) {
					alert("You win!" + (this.deathEverDisabled ? " (But, you disabled death!)" : ""));
				}
			}
			
			// screenwrap
			if(this.player.x > 820) {
				this.player.x = -70;
			}
			if(this.player.x < -70) {
				this.player.x = 820;
			}
		}

		if(this.startText.visible) {
			if(this.startTextScaleIncreasing) {
				this.startText.setScale(this.startText.scaleX+0.002);
				if(this.startText.scaleX > 1.15) {
					this.startTextScaleIncreasing = false;
				}
			} else {
				this.startText.setScale(this.startText.scaleX-0.002);
				if(this.startText.scaleX < 1) {
					this.startTextScaleIncreasing = true;
				}
			}
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
