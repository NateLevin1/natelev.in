
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super('Scene1');
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */
	create() {
		// tilemap
		const map = this.make.tilemap({ key: 'tiledTest' });
		const tileset = map.addTilesetImage('tiles', 'tiles');
		const platforms = map.createStaticLayer('Background', tileset, 0, 30);
		graphics = this.add.graphics();
		var line = new Phaser.Curves.Line([ 100, 140, 300, 140 ]);
		
		var numOfJuicedOranges = 0;
		var numOfOranges = 0;
		var glasses = 0;
		var gameSpeed = 2000;
		if (this.sys.game.device.os.desktop){
            this.add.text(10, 10, "Juicer 1.1 Desktop\nClick to throw an orange. Try to get the oranges in the box. Move with\nthe arrow keys or A and D. Rack up 8 glasses to win!", {fontSize: '11px', fill: '#fff', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);
		}
		else{
          	this.add.text(10, 10, "Juicer 1.1 Mobile\nClick to throw an orange. Try to get the oranges\nin the box. Rack up 8 glasses to win!", {fontSize: '15px', fill: '#fff', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);
			gameSpeed = parseInt(localStorage.getItem('mode')) || 1500;
			var challengeMode = this.add.text(10, 420, "Enable Challenge Mode", {fontSize: '15px', fill: '#fff', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100).setInteractive().on('pointerdown', function() {
				if(challengeMode.text == 'Enable Challenge Mode') {
					if(glasses > 0) {
						if(confirm("Are you sure you want to enable challenge mode? You will lose all progress.")){
							challengeMode.text = 'Disable Challenge Mode'
							gameSpeed=2000;
							localStorage.setItem('mode', "2000");
							location.reload();
						}
					} else {
						challengeMode.text = 'Disable Challenge Mode'
						gameSpeed=2000;
						localStorage.setItem('mode', "2000");
						location.reload();
					}
				} else if(challengeMode.text == 'Disable Challenge Mode') {
					if(glasses > 0) {
						if(confirm("Are you sure you want to disable challenge mode? You will lose all progress.")){
							challengeMode.text = 'Enable Challenge Mode'
							gameSpeed=1500;
							localStorage.setItem('mode', "1500");
							location.reload();
						}
					} else {
						challengeMode.text = 'Enable Challenge Mode'
						gameSpeed=1500;
						localStorage.setItem('mode', "1500");
						location.reload();
					}
				}
			});
			
			if(localStorage.getItem('mode') == "2000") {
					challengeMode.text = 'Disable Challenge Mode'
			}
		}
		
		var juiceText = this.add.text(188, 400, ((numOfJuicedOranges/6)*100).toFixed(0) + "%", {fontSize: '20px', fill: '#fff', fontFamily: '"Arial"'}).setOrigin(0,0).setDepth(100);
		
		path = this.add.path();
		
		path.add(line);
		
		follower = { t: 0, vec: new Phaser.Math.Vector2() };
		this.tweens.add({
        	targets: follower,
        	t: 1,
        	ease: 'Linear',
        	duration: gameSpeed,
        	yoyo: true,
        	repeat: -1
    	});

		var juicer = box = this.physics.add.sprite(200,100,'juicer').setScale(0.25);
		
		box = this.physics.add.sprite(200,140,'box').setScale(0.25);
		
		player = this.physics.add.sprite(200,350,'player').setScale(0.5).setDepth(1000).setDrag(500,500);
		
		var oranges = this.physics.add.group();
		previewOrange=this.physics.add.sprite(200,350, 'orange').setScale(0.1).setVisible(false).setDepth(1);
		var newOrange = true;
		random = 1;
		if(gameSpeed >=2000) {
		setInterval(()=>{
			newOrange = true;
			random = Phaser.Math.Between(1,2);
			
			previewOrange.x = player.x+10;
			if(random == 1) {
				previewOrange.x = player.x+10;	
			} else {
				previewOrange.x = player.x-10;	
			}
			previewOrange.setVisible(true);
			
		}, 700);
		} else {
			setInterval(()=>{
			newOrange = true;
			random = Phaser.Math.Between(1,2);
			
			previewOrange.x = player.x+10;
			if(random == 1) {
				previewOrange.x = player.x+10;	
			} else {
				previewOrange.x = player.x-10;	
			}
			previewOrange.setVisible(true);
			
		}, 280);
		}
		
		
		this.input.on('pointerdown', function() {
			sendOrange();
		});
		
		this.physics.add.overlap(oranges, box, orangeBox, null, this);
		this.physics.add.overlap(juicer, box, juice, null, this);
		
		this._create();
		
		function orangeBox(box, hitter){
			hitter.destroy();
			numOfOranges += 1;
		}
		
		function juice() {
			numOfJuicedOranges += numOfOranges;
			numOfOranges = 0;
			juiceText.text = ((numOfJuicedOranges/6)*100).toFixed(0) + "%";
			if(numOfJuicedOranges >= 6) {
				glasses += 1;
				if(glasses > 4) {
					this.physics.add.sprite(360, (glasses-4)*70+50,'juice');
					if(glasses >= 8) {
						alert("You Win! Now go do something useful with your life.")
					}
				} else {
					this.physics.add.sprite(30, glasses*70+50,'juice');
				}
				
				juicer.setTexture('juicer')
				numOfJuicedOranges = 0;
				juiceText.text = ((numOfJuicedOranges/6)*100).toFixed(0) + "%";
			} else if(numOfJuicedOranges >= 4) {
				juicer.setTexture('juicer4')
			} else if(numOfJuicedOranges >= 2) {
				juicer.setTexture('juicer2')
			}
		}
		
		arrowKeys = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        e:Phaser.Input.Keyboard.KeyCodes.E
        });

		this.input.keyboard.on('keydown-' + 'SPACE', function () { 
            sendOrange();
        });
		
		function sendOrange() {
			if(newOrange == true) {
				newOrange = false;
				previewOrange.setVisible(false);
				if(random == 1) {
					var recentOrange = oranges.create(player.x+10,350,'orange').setScale(0.10);
				} else {
					var recentOrange = oranges.create(player.x-10,350,'orange').setScale(0.10);
				}
				if(gameSpeed >= 2000) {
					recentOrange.setVelocityY(-300);
				} else {
					recentOrange.setVelocityY(-450);
				}
				
			}
		}
		
	}

	update() {
		path.draw(graphics);
		path.getPoint(follower.t, follower.vec);
		box.x = follower.vec.x;
		box.y = follower.vec.y;
		
		// Movement
		if(player.x>130) {
        if (cursors.left.isDown /*|| joysticks.left.isDown */|| arrowKeys.left.isDown)
        {
                player.setVelocityX(-150);
        }
		}
		if(player.x<270) {
        if (cursors.right.isDown /*|| joysticks.right.isDown */|| arrowKeys.right.isDown)
        {
                player.setVelocityX(150);
        }
		}

		if(random == 1) {
			previewOrange.x = player.x+10;	
		} else {
			previewOrange.x = player.x-10;	
		}
		
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
