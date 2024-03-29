
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

		this.gameEverInvalidated = false;
		if(clickStrength != 1) {
			this.gameEverInvalidated = true;
		}

		this.add.text(10, 10, "Flying Fish 1.3\nClick and drag to launch\nthe fish. Avoid the walls!", {fontSize: '15px', fill: '#000', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);

		this.settingsGraphics = this.add.graphics();
		this.settingsShown = false;
		this.settingsItems = [];
		this.settings = this.add.image(5, 995, "settings", null, {isStatic: true}).setScale(0.3).setAlpha(0.6).setOrigin(0,1).setScrollFactor(0).setDepth(100)
			.setInteractive().on('pointerdown', (cursor, x, y, event)=>{
				if(this.restartConfig.display) {
					return;
				}
				event.stopPropagation();
				if(this.settingsShown) {
					this.hideSettings();
					return;
				}
				this.settingsShown = true;

				this.matter.pause();
				this.showSettings();
			}).on('pointerup', (cursor, x, y, event)=>{
				if(!this.draw) {
					event.stopPropagation();
				}
			});
		this.settings.input.cursor = "pointer";

		this.score = 0;
		this.scoreText = this.add.text(735, 995, this.score, {fontSize: 'calc(36px + 1.3vw)', fill: '#000', fontFamily: '"Arial"', stroke: "#ffffff90", strokeThickness: 5 }).setOrigin(1,1).setDepth(100).setScrollFactor(0);
		
		this.startText = this.add.text(375, 500, "Tap to begin!", {fontSize: '33px', fill: '#000', fontFamily: '"Arial"', stroke: "#ffffff", strokeThickness: 4}).setOrigin(0.5,0.5).setDepth(100);
		this.startTextScaleIncreasing = true;

		this.timerText = this.add.text(740, 10, "0:00", {fontSize: '30px', fill: '#000', fontFamily: '"Arial"', stroke: "#fff", strokeThickness: 5 }).setOrigin(1,0).setDepth(100).setScrollFactor(0);
		this.timerText.setAlpha(0);

		this.matter.add.image(256.0, 128.0, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);
		this.matter.add.image(512, -256, "wall", null, {isStatic: true}).setScale(2, 1).setIgnoreGravity(true);

		for(var i = 0; i < 50; i++) {
			yPos = i*2*-640 - 1064;
			this.matter.add.image(Math.random() * 750, yPos + Math.random()*200, "cloud", null, {isStatic: true, collisionFilter: {group: -1, mask: 0} }).setIgnoreGravity(true).setAlpha(0.3).setScale(0.8+(Math.random() * 0.4));
		}

		var rand = 0;
		var yPos = 0;
		for(var g = 0; g<=75; g++) { // create the "rooms"
			rand = Phaser.Math.Between(1,4);
			yPos = g*-640 - 1024;
			
			if(rand == 1) {
				this.matter.add.image(512, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(0, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(128, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
				this.matter.add.image(384, yPos, "wall", null, {isStatic: true}).setScale(2, 1).setAngle(90).setIgnoreGravity(true);
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
		if(!this.playerSkin) {
			this.playerSkin = "fish";
		}
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
			if(this.settingsShown) {
				return;
			}
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

				this.settings.setAlpha(0.2);
				
				this.startMillis = Date.now();
			} else {
				this.draw = true;
				this.drawStart = Date.now();
			}
			
		}, this);

		this.waves = [];
		let yHeight = 1050 + Math.random() * 3;
		for(var i = 0; i <= 750; i += 128) {
			yHeight = yHeight+ (Math.random() < 0.5 ? -1 : 1)*(Math.random()*1.5);
			this.waves.push(this.add.sprite(i, yHeight, "waves2").setScale(1, 0.8).setOrigin(0, 1));
		}
		
		
		this.input.on('pointerup', function(cursor) {
			if(this.settingsShown) {
				this.hideSettings();
				return;
			}
			if(this.started === true && this.restartConfig.display === false) {
				if(this.draw) {
					this.draw = false;
					this.player.rotation = Phaser.Math.Angle.BetweenPoints(this.player, this.mouse);
					this.player.thrustBack(Phaser.Math.Distance.BetweenPoints(this.player, this.mouse)/(800/clickStrength)); // forward 0.3
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
		const skins = [["fish"], ["shark"], ["redfish", 5000]];
		let skinsI = 0;
		this.input.keyboard.on("keydown-F", (event)=>{
			skinsI++;
			if(skinsI >= skins.length) skinsI = 0;

			while(skins[skinsI][1] > this.highScore) {
				skinsI++;
				if(skinsI >= skins.length) skinsI = 0;
			}

			this.player.setTexture(skins[skinsI][0]);
		});

		this.highScore = parseInt(localStorage.getItem("highscore")) || 0;

		this._create();
	}
	
	lose(force = false) {
		if((!force && death == "die") || force) {
			let newHighScore = false;
			const score = -this.score;
			if(!this.gameEverInvalidated && (score) >= this.highScore && score > 0) {
				newHighScore = true;
				this.highScore = score;
				localStorage.setItem("highscore", score);
			}

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
			this.add.text(735/2, 325, "Your Score:", {fontSize: '50px', fill: '#000', fontFamily: '"Arial"', stroke: "#fff", strokeThickness: 5 }).setOrigin(0.5).setDepth(100).setScrollFactor(0);
			this.add.text(735/2, 370, (score) + (this.gameEverInvalidated ? "*" : ""), {fontSize: '100px', fill: '#fff', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 10 }).setOrigin(0.5, 0).setDepth(100).setScrollFactor(0);
			this.add.text(735/2, 500, "High Score: "+(this.highScore == 0 ? "None" : this.highScore)+(newHighScore ? " (New Record!)" : ""), {fontSize: '25px', fill: '#000', fontFamily: '"Arial"', stroke: "#fff", strokeThickness: 1 }).setOrigin(0.5, 0).setDepth(100).setScrollFactor(0);
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
					this.player.y = -50_000;
					this.player.setVelocityX(0);
					this.player.setVelocityY(0);
					this.score = -50_000;
					if(!this.gameEverInvalidated) {
						localStorage.setItem("highscore", 50_000);
					}
					alert("You win!" + (this.gameEverInvalidated ? " (But, you disabled death!)" : ""));
					this.lose(true);
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

		if(this.player.y < 300 && this.timerText.alpha < 1) {
			this.timerText.setAlpha(Math.min((300-this.player.y)/400, 1));
		}

		if(!this.restartConfig.display) {
			const seconds = Math.floor((Date.now() - this.startMillis) / 1000);
			const displaySeconds = seconds % 60;
			const minutes = Math.floor(seconds / 60);
			this.timerText.text = `${minutes}:${displaySeconds < 10 ? "0" : ""}${displaySeconds}`;
		}

		let speed = 0.13;
		if(this.player.y > 200) {
			// undulate waves
			for(const wave of this.waves) {
				if(wave.increasing) {
					wave.setY(wave.y - speed);
					if(wave.y < 1038) {
						wave.increasing = false;
					}
				} else {
					wave.setY(wave.y + speed);
					if(wave.y > 1050) {
						wave.increasing = true;
					}
				}
			}
		}

		
		if(this.player.y < -15_000) {
			let r = 179;
			let g = 236;
			let b = 255;

			if(this.player.y < -30_000) {
				let x = Math.round(Math.min(this.player.y+30_000, 0) / -200);
				r = 189 + Math.round(x / 2);
				g = 200 - Math.round(x / 25);
				b = 255 - Math.round(x * 1.5);
			} else if(this.player.y < -25_000) {
				let x = Math.round(Math.min(this.player.y+25_000, 0) / -500);
				r = 179+x;
				g = 200;
			} else if(this.player.y < -15_000) {
				let x = Math.round(Math.min(this.player.y+15_000, 0) / -300);
				g = 236 - x;
			}
			
			let bgColor = `rgb(${r}, ${g}, ${b})`;
			this.cameras.main.setBackgroundColor(bgColor);
		}
	}

	showSettings() {
		const menuSound = this.sound.add("flap");
		menuSound.setRate(4);
		menuSound.play();

		const bgColor = 0x178bff;
		const bgOpacity = 1;
		const width = 470;
		const height = 510;
		const boxLeft = 735/2-(width/2);
		this.settingsGraphics.fillStyle(0x000000, 0.2);
		this.settingsGraphics.fillRoundedRect(373-((width)/2), 504-((height+3)/2), width+4, height, 21).setScrollFactor(0).setDepth(101);
		this.settingsGraphics.fillStyle(bgColor, bgOpacity);
		this.settingsGraphics.fillRoundedRect(375-(width/2), 500-(height/2), width, height, 20).setScrollFactor(0).setDepth(101);

		const deathEnabler = this.add.dom(735/2, 400, "div", "width: fit-content; height: 40px; color: white; font-size: 30px; user-select: none; -webkit-user-select: none; filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.75));").setOrigin(0.5, 0).setDepth(102).setScrollFactor(0);
		deathEnabler.setHTML(`
			<input id=deathEnabler class=settingsInput type=checkbox style='width: 25px; height: 25px; vertical-align: middle; cursor: pointer;' ${death == "die" ? "checked" : ""}></input>
			<label for=deathEnabler style='vertical-align: middle; cursor: pointer;'>Death Enabled</label>
		`);
		deathEnabler.addListener("change");
		deathEnabler.on("change", ()=>{
			if(death == "die") {
				this.gameEverInvalidated = true;
				death = "nodie";
			} else {
				death = "die";
			}
		});

		const clickDoubler = this.add.dom(735/2, 460, "div", "width: fit-content; height: 40px; color: white; font-size: 30px; user-select: none; -webkit-user-select: none; filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.75));").setOrigin(0.5, 0).setDepth(102).setScrollFactor(0);
		clickDoubler.setHTML(`
			<input id=clickDoubler class=settingsInput type=checkbox style='width: 25px; height: 25px; vertical-align: middle; cursor: pointer;' ${clickStrength != 1 ? "checked" : ""}></input>
			<label for=clickDoubler style='vertical-align: middle; cursor: pointer;'>Increase Click Strength</label>
		`);
		clickDoubler.addListener("change");
		clickDoubler.on("change", ()=>{
			if(clickStrength == 1) {
				this.gameEverInvalidated = true;
				clickStrength = 2;
			} else {
				clickStrength = 1;
			}
		});

		const x = this.add.text(boxLeft+22, 500-(height/2), "⤫", {fontSize: '65px', fill: '#f00', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 5 }).setOrigin(0, 0).setDepth(102).setScrollFactor(0).setInteractive();
		x.input.cursor = "pointer";

		const skins = [];
		const updateSkin = (newSkin)=>{
			this.playerSkin = newSkin;
			this.player.setTexture(newSkin);
			for(const skin of skins) {
				const key = skin[0];
				if(skin[3]) {
					skin[1].clear();
				}
				if(newSkin === key) {
					skin[1].fillStyle(0, 0.1);
					skin[1].fillRect(skin[2], 580, 142, 162).setDepth(102);
				}
			}
		}

		this.addSkinButton("fish", "Default", 0, null, skins, boxLeft, updateSkin);
		this.addSkinButton("shark", "Shark", 1, null, skins, boxLeft, updateSkin);
		this.addSkinButton("redfish", "Snapper", 2, 5000, skins, boxLeft, updateSkin);
		
		updateSkin(this.playerSkin);

		this.settingsItems.push(
			x,
			this.add.text(735/2, 330, "Settings", {fontSize: '55px', fill: '#fff', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 8 }).setOrigin(0.5).setDepth(102).setScrollFactor(0),
			deathEnabler,
			clickDoubler,
			this.add.text(boxLeft+30, 530, "Choose Skin:", {fontSize: '33px', fill: '#fff', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 4 }).setOrigin(0).setDepth(102).setScrollFactor(0),
		);
	}

	hideSettings() {
		this.settingsGraphics.clear();
		for(const item of this.settingsItems) {
			item.destroy();
		}
		this.matter.resume();
		this.settingsShown = false;
	}

	addSkinButton(skinName, prettyName, index, scoreRequired, skins, boxLeft, updateSkin) {
		const y = 579;
		const initOffset = 29;
		const imageOffset = initOffset+70;
		const width = 142;
		const height = 162;
		const totalWidth = 142;
		const buttonClickRectX = boxLeft+initOffset+(index*totalWidth);

		const defaultButtonClickRect = this.add.rectangle(buttonClickRectX, y, width, height).setDepth(102).setScrollFactor(0).setOrigin(0);
		const defaultButton = this.add.graphics().setDepth(102).setScrollFactor(0);
		defaultButton.setInteractive(defaultButtonClickRect, (_clickRect, x, y)=>{
			return x >= defaultButtonClickRect.getTopLeft().x && x <= defaultButtonClickRect.getTopRight().x
					&& y <= defaultButtonClickRect.getBottomLeft().y && y >= defaultButtonClickRect.getTopLeft().y;
		});
		defaultButton.input.cursor = "pointer";
		let canUse = true;
		
		if(scoreRequired && this.highScore < scoreRequired) {
			defaultButton.input.cursor = "not-allowed";
			canUse = false;
			defaultButton.fillStyle(0xff0000, 0.2);
			defaultButton.fillRect(buttonClickRectX, 580, width, height).setDepth(102);
			this.settingsItems.push(this.add.text(buttonClickRectX+(width/2), y+52, `${scoreRequired}+`, {fontSize: '35px', fill: '#f00', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 5 }).setOrigin(0.5, 0).setDepth(103).setScrollFactor(0));
		}
		defaultButton.on("pointerup", (_p, _x, _y, event)=>{
			event.stopPropagation();
			if(!canUse) {
				alert("You must have a highscore of "+scoreRequired+" or more to use this skin!");
				return;
			}

			updateSkin(skinName);
		});
		skins.push([skinName, defaultButton, buttonClickRectX, canUse]);

		const fishImg = this.add.image(boxLeft+imageOffset+(index*totalWidth), y+60, skinName).setScale(1.2).setAngle(-50).setOrigin(0.5).setDepth(102).setScrollFactor(0);
		const text = this.add.text(buttonClickRectX+(width/2), y+129, prettyName, {fontSize: '25px', fill: '#fff', fontFamily: '"Arial"', stroke: "#000", strokeThickness: 3 }).setOrigin(0.5, 0).setDepth(102).setScrollFactor(0);

		this.settingsItems.push(defaultButton, defaultButtonClickRect, fishImg, text);
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
