
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
		
		this.add.image(361.96622, 996.40955, "ground");
		
		
	}
	
	/* START-USER-CODE */

	create() {
		var screams = this.sound.add("screams");
		
		var down = this.add.image(647, 96, "down").setInteractive().setScrollFactor(0);
		down.setScale(1.5376197, 1.4202883);
		
		var up = this.add.image(647, 38, "up").setInteractive().setScrollFactor(0);
		up.setScale(1.5376197, 1.4202883);
		
		up.on('pointerdown', ()=>{moveInDir = "up";});
		up.on('pointerup', ()=>{moveInDir = "";});
		
		down.on('pointerdown', ()=>{moveInDir = "down";});
		down.on('pointerup', ()=>{moveInDir = "";});
		
		this.add.text(15, 28,"Click to place a story.\nStack as high as you can.\nYour score is the number\non the left. Switch\ncolors by clicking on a\ncolored building.", {fontSize: '12px', color:'#000'}).setScrollFactor(0);
		this.add.text(15, 10,"City Buildr 1.1", {fontSize: '12px', color:'#fff'}).setScrollFactor(0);
		
		var toBuild = "grey";
		this.add.image(381.20175, 65.66489, "buildingBlue").setInteractive().on('pointerdown', ()=>{toBuild = "blue"}).setScrollFactor(0);
		
		this.add.image(235.14014, 66.455574, "building").setInteractive().on('pointerdown', ()=>{toBuild = "grey"}).setScrollFactor(0);
		
		this.add.image(528.656, 65.55814, "buildingGreen").setInteractive().on('pointerdown', ()=>{toBuild = "green"}).setScrollFactor(0);
		var canDrag = this.matter.world.nextGroup();
		this.matter.add.sprite(100,1500,"building");
		
		var ground = this.matter.add.sprite(361.96622, 996.40955, "ground", null, {isStatic: true});
		ground.setPosition(361.96622+ground.centerOfMass.x, 996.40955+ground.centerOfMass.y);
		
		var highScore = 1000;
		var highScoreText = this.add.text(15, highScore-30, 1000-highScore, {fontSize: '16px', color:'#000'});
		//this.matter.add.softBody(200, 200, 5, 5, 20, 20, false, 10);
		this.matter.add.mouseSpring({ length: 1, stiffness: 0.6, collisionFilter: { group: canDrag } });
		//this.matter.timing.timeScale = 0.2;
		this.input.on('wheel', function(pointer) {
			this.cameras.main.scrollY += pointer.deltaY;
			if(this.cameras.main.scrollY>0) {
				this.cameras.main.scrollY = 0;
			}
		});

		var buildings = [];

		var interval = setInterval(()=>{
			let highest = 0;
			for(const build of buildings) {
				if(1000 - build.y > highest) {
					highest = 1000 - build.y;
				}
				if(build.angle>70 || build.angle<-70) {
					this.cameras.main.scrollY = 0;
					if(!screams.isPlaying) {
						screams.play();
					}
					setTimeout(()=>{
						if(confirm("You Lose! Retry?")) { // either way we retry
							screams.stop();
							this.scene.restart();
						} else {
							screams.stop();
							this.scene.restart();
						}
					}, 2500);
					clearInterval(interval);
					break;
				}
			}
			highScore = Math.floor(1000 - highest);
			highScoreText.text = 1000-highScore;
			highScoreText.y = highScore-45;
			
		}, 30);
		
		this.input.on('pointerdown', function(pointer) {
			if(pointer.y>150) {
				if(toBuild == "grey") {
					var build = this.matter.add.sprite(pointer.x, pointer.y+this.cameras.main.scrollY, "building").setCollisionGroup(canDrag);
				} else if (toBuild == "blue") {
					var build = this.matter.add.sprite(pointer.x, pointer.y+this.cameras.main.scrollY, "buildingBlue").setCollisionGroup(canDrag);
				} else if (toBuild == "green") {
					var build = this.matter.add.sprite(pointer.x, pointer.y+this.cameras.main.scrollY, "buildingGreen").setCollisionGroup(canDrag);
				}

				buildings.push(build);
			}
		}, this)
		
		this._create();
	}

	update() {
		if(moveInDir == "up") {
			this.cameras.main.scrollY -= 5
		} else if(moveInDir == "down") {
			this.cameras.main.scrollY += 5
			if(this.cameras.main.scrollY>0) {
				this.cameras.main.scrollY = 0;
			}
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
