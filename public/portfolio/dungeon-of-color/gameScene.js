class GameScene extends Phaser.Scene {

	constructor() {
		super({key : 'gameScene'});
	}

	init() {
        
	}

	preload() {
	    // LOADING SCREEN
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
            if(value>0.50) {
                progressBar.fillStyle(0x00ff00, 1);
            } else {
                progressBar.fillStyle(0xffffff, 1);
            }
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
        
        
	    // Joystick
        //this.load.plugin('rexVirtualJoystick', 'rexvirtualjoystickplugin.min.js', true);
        var url;
        url = 'rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);

	    // Dungeon
		/*this.load.image('city1', 'assets/city/png/city1.png');
		this.load.image('city2', 'assets/city/png/city2.png');*/
		
	
		
		
		
		// UI
		/*this.load.image('music', 'assets/ui/music.png');
		this.load.image('next', 'assets/ui/next.png');
		this.load.image('previous', 'assets/ui/previous.png');
		this.load.image('missions', 'assets/ui/wrench.png');
		this.load.image('missionsW', 'assets/ui/wrenchW.png');*/
		
		/*this.load.spritesheet('guns', 
            'assets/g-spritesheet.png',
            { frameWidth: 96, frameHeight: 64 });
        this.load.spritesheet('targetImg', 
            'assets/targetspritesheet.png',
            { frameWidth: 64, frameHeight: 64 });*/
            
            // Audio
            //this.load.audio('shoot', 'audio/gunshot.wav');
	}

	create() {
	    
	    var chests = this.physics.add.group();
	    var healthChests = this.physics.add.group();
	    var lifeStealChest = this.physics.add.image(1111, -5041, 'chest').setScale(0.1).setDepth(100).setAngle(90);
	    var lifeSteal = false;
	    
	    
	    redEnemies = this.physics.add.group();
        redEnemies.create(-1130, -915,'redEye');
        redEnemies.create(-710, -915,'redEye');
        redEnemies.create(503, -3859,'redEye');
        redEnemies.create(682, -3433,'red2');
        redEnemies.create(423, -3224,'red2');
        redEnemies.children.each(function (child) {
            child.setScale(1);
            child.setDepth(8);
        }, this);
            setInterval(()=>{
                redEnemies.children.each(function (child) {
                    if(Phaser.Math.Distance.Between(child.x, child.y, player.x, player.y) < 500) {
                        child.rotation = Phaser.Math.Angle.Between( child.x, child.x, player.x, player.y)-300;
                        this.physics.moveToObject(child, player, 125);
                    } else {
                        child.body.reset(child.x, child.y);
                    }
                }, this);
            }, 500);
            
        blueEnemies = this.physics.add.group();
        blueEnemies.create(650, -3355, 'blue1');
        blueEnemies.create(450, -3555, 'blue2');
        blueEnemies.create(560, -3455, 'blue1');
        blueEnemies.create(560, -3655, 'blue2');
        blueEnemies.children.each(function (child) {
            child.setScale(1.25);
            child.setDepth(8);
        }, this);
            setInterval(()=>{
                blueEnemies.children.each(function (child) {
                    if(Phaser.Math.Distance.Between(child.x, child.y, player.x, player.y) < 500) {
                        child.rotation = Phaser.Math.Angle.Between( child.x, child.x, player.x, player.y)-300;
                        this.physics.moveToObject(child, player, 175);
                    } else {
                        child.body.reset(child.x, child.y);
                    }
                }, this);
            }, 1000);
	    
	    chests.create(-470, -446, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    chests.create(679, -1616, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    chests.create(262, -4391, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    chests.create(-950, -5491, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    healthChests.create(-500, -2415, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    healthChests.create(-209, -4391, 'chest').setScale(0.1).setAngle(-90).setDepth(100);
	    
	    walls = this.physics.add.group();
	    this.add.image(0, 0, 'room1');
	    walls.create(-255,253, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-255,-255, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(255,-255, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-255,-255, '160x').setOrigin(0,0).setImmovable(true);
	    walls.create(95,-255, '160x').setOrigin(0,0).setImmovable(true);
	    // MAP GENERATION
	    this.add.image(-225, -450, 'room2Y');
	    walls.create(-353,-640, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-610,-260, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-610,-643, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(160,-643, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(-610,-640, '64x').setOrigin(0,0).setImmovable(true);
	    this.add.image(-800, -900, 'room4W');
	    walls.create(-1310,-1155, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(-354,-1155, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(-1055,-1155, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-1310,-1155, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-290,-1155, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-1310,-648, '768x').setOrigin(0,0).setImmovable(true);
	    // right path
	    if(Phaser.Math.Between(1, 2) == 2) {
	        this.add.image(-223, -1345, 'room2B').setFlipX(true);
	        blueEnemies.create(-488, -1370, 'blue1');
            blueEnemies.create(-44, -1370, 'blue2');
            redEnemies.create(-200, -1481,'red2');
	    } else {
	        this.add.image(-223, -1345, 'room2W').setFlipX(true);
	        blueEnemies.create(-44, -1370, 'blue2');
	    }
	    
	    walls.create(-605,-1535, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-350,-1155, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-605,-1539, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(97,-1535, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(161,-1539, '384y').setOrigin(0,0).setImmovable(true);
	    // left path
	    if(Phaser.Math.Between(1, 2) == 2) {
	        this.add.image(-800, -1410, 'corridor');
	    } else {
	        this.add.image(-800, -1410, 'corridorY');
	        if(Phaser.Math.Between(1, 2) == 2) {
	            chests.create(-1150, -1415, 'chest').setScale(0.1).setDepth(100);
	        } else {
	            healthChests.create(-1150, -1415, 'chest').setScale(0.1).setDepth(100);
	        }
	    }
	    
	    walls.create(-1310,-1668, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-1010,-1539, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(-1310,-1664, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-800,-1664, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-1010,-1540, '512x').setOrigin(0,0).setImmovable(true);
	    
	    this.add.image(250, -2050, 'bigBossRoom');
	    walls.create(-259,-2310, '645y').setOrigin(0,0).setImmovable(true);
	    walls.create(95,-1540, '668x').setOrigin(0,0).setImmovable(true);
	    walls.create(-259,-2565, '64y').setOrigin(0,0).setImmovable(true);
	    walls.create(757,-2565, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(757,-2053, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-259,-2563, '768x').setOrigin(0,0).setImmovable(true);
	    walls.create(693,-2565, '64x').setOrigin(0,0).setImmovable(true);
	    // Left
	    this.add.image(-520, -2400, 'room5');
	    walls.create(-266,-2656, '160y').setOrigin(0,0).setImmovable(true);
	    walls.create(-774,-2654, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-774,-2654, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-774,-2148, '512x').setOrigin(0,0).setImmovable(true);
	    // right
	    this.add.image(552, -2820, 'room6');
	    walls.create(346,-3075, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(346,-3075, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(600,-3075, '160x').setOrigin(0,0).setImmovable(true);
	    walls.create(757,-3075, '512y').setOrigin(0,0).setImmovable(true);
	    this.add.image(552, -3329, 'room6').setFlipX(true);
	    walls.create(346,-3585, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(694,-3585, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(346,-3585, '160x').setOrigin(0,0).setImmovable(true);
	    walls.create(757,-3585, '512y').setOrigin(0,0).setImmovable(true);
	    this.add.image(552, -3840, 'room6');
	    walls.create(346,-4097, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(346,-4097, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(600,-4097, '160x').setOrigin(0,0).setImmovable(true);
	    walls.create(757,-4097, '512y').setOrigin(0,0).setImmovable(true);
	    this.add.image(152, -4350, 'room4Y');
	    walls.create(-361,-4604, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(600,-4604, '64x').setOrigin(0,0).setImmovable(true);
	    walls.create(-103,-4604, '512x').setOrigin(0,0).setImmovable(true);
	    walls.create(-361,-4604, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(660,-4604, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(-360,-4095, '768x').setOrigin(0,0).setImmovable(true);
	    this.add.image(-552, -5115, 'bigBlueBossRoom');
	    walls.create(-1061,-5626, '1024x').setOrigin(0,0).setImmovable(true);
	    walls.create(-1061,-5626, '1024y').setOrigin(0,0).setImmovable(true);
	    walls.create(-44,-5628, '1024y').setOrigin(0,0).setImmovable(true);
	    walls.create(-1063,-4606, '768x').setOrigin(0,0).setImmovable(true);
	    this.add.image(344, -5117, 'corridorArena').setOrigin(0,0);
	    walls.create(346,-5116, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(650,-4989, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(346,-5116, '1024x').setOrigin(0,0).setImmovable(true);
	    walls.create(650,-4989, '768x').setOrigin(0,0).setImmovable(true);
	    this.add.image(1337, -7030, 'arena').setOrigin(0,0).setDepth(0);
	    walls.create(1337,-7030, '1024y').setOrigin(0,0).setImmovable(true);
	    walls.create(1337,-6006, '512y').setOrigin(0,0).setImmovable(true);
	    walls.create(1337,-5500, '384y').setOrigin(0,0).setImmovable(true);
	    walls.create(1337,-7030, '1024x').setOrigin(0,0).setImmovable(true);
	    walls.create(2361,-7030, '1024x').setOrigin(0,0).setImmovable(true);
	    walls.create(3380,-7030, '1024y').setOrigin(0,0).setImmovable(true);
	    walls.create(3380,-6006, '1024y').setOrigin(0,0).setImmovable(true);
	    walls.create(1337,-4986, '1024x').setOrigin(0,0).setImmovable(true);
	    walls.create(2361,-4986, '1024x').setOrigin(0,0).setImmovable(true);
	    
	    
            
            
            
        
        
        player = this.physics.add.sprite(0, 0, 'player').setDrag(500,500).setDepth(9).setScale(1.1);
        var playerHealthBar = this.add.graphics();
        playerHealthBar.clear();
	    playerHealthBar.fillStyle(0x00ff00, 1);
        playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
        //sword = this.physics.add.sprite(0, 0, 'sword').setScale(1.5);
        bow = this.physics.add.sprite(0, 0, 'bow').setDepth(9).setScale(1.1);
        swordY = this.physics.add.sprite(0, 0, 'swordY').setDepth(9).setScale(1).setVisible(false);
        swordX = this.physics.add.sprite(0, 0, 'swordX').setDepth(9).setScale(1).setVisible(false);
        openSword = "";
        
        var arenaStart = false;
        var randSpawn = 0;
        var pickUpArrows = this.physics.add.group();
        // ARENA:
        setInterval(()=>{
        if(player.x>1337 && player.y<4986) {
            if(arenaStart === false) {
            // spawn enemies
                arenaStart = true;
                setInterval(()=>{
                    randSpawn = Phaser.Math.Between(1, 4);
                    if(randSpawn == 1) {
                        var newEnemy = redEnemies.create(Phaser.Math.Between(1400, 3300), Phaser.Math.Between(-7030, -4990),'redEye');
                    } else if(randSpawn == 2) {
                        var newEnemy = redEnemies.create(Phaser.Math.Between(1400, 3300), Phaser.Math.Between(-7030, -4990),'red2');
                    } else if(randSpawn == 3) {
                        var newEnemy = blueEnemies.create(Phaser.Math.Between(1400, 3300), Phaser.Math.Between(-7030, -4990),'blue1');
                    } else if(randSpawn == 4) {
                        var newEnemy = blueEnemies.create(Phaser.Math.Between(1400, 3300), Phaser.Math.Between(-7030, -4990),'blue2');
                    }
                    if(Phaser.Math.Between(1, 10)== 1) {
                        pickUpArrows.create(Phaser.Math.Between(1400, 3300), Phaser.Math.Between(-7030, -4990), 'arrow').angle = Phaser.Math.Between(0, 359);
                    }
                    setTimeout(()=>{newEnemy.destroy()}, 23000);
                    if(Phaser.Math.Between(1, 50) == 1) {
                        if(Phaser.Math.Between(1, 2) == 2) {
                            // spawn red boss
                            if(redBoss.body.enable) {
                                if(blueBossHealth == 10) {
                                    redBossHealth = 10;
                                    redBoss.setVisible(true);
                                    redBoss.x = player.x + 300;
                                    redBoss.y = player.y - 300;
                                    redBossHealthText.setVisible(true);
                                    redBoss.setDepth(97);
                                    redBossHealthText.text = redBossHealth;
                                }
                            } else {
                                redBoss.body.enable = true;
                                redBossHealth = 10;
                                redBoss.x = player.x + 300;
                                redBoss.y = player.y - 300;
                                redBossHealthText.setVisible(true);
                                redBoss.setVisible(true);
                                redBoss.setDepth(97);
                                redBossHealthText.text = redBossHealth;
                            }
                        } else {
                            //spawn blue boss
                            if(blueBoss.body.enable) {
                                if(blueBossHealth == 15) {
                                    blueBossHealth = 15;
                                    blueBoss.x = player.x + 300;
                                    blueBoss.y = player.y - 300;
                                    blueBossHealthText.setVisible(true);
                                    blueBoss.setDepth(97);
                                    blueBoss.setVisible(true);
                                    blueBossHealthText.text = blueBossHealth;
                                }
                            } else {
                                blueBoss.body.enable = true;
                                blueBossHealth = 15;
                                blueBoss.x = player.x + 300;
                                blueBoss.y = player.y - 300;
                                blueBossHealthText.setVisible(true);
                                blueBoss.setDepth(97);
                                blueBoss.setVisible(true);
                                blueBossHealthText.text = blueBossHealth;
                            }
                        }
                    }
                }, 600);
            }
        }
        }, 500);
        
        
        // RED BOSS
        var redBoss = this.physics.add.sprite(300, -2088, 'redBoss').setScale(2).setDrag(500,500).setDepth(10);
        var redBossHealth = 10;
        var redBossHealthText = this.add.text(300, -2218, redBossHealth, {fontSize: '30px', fill: '#000', fontFamily: '"Arial"'});
        var purplePaint = this.physics.add.group();
        setInterval(()=>{
            this.physics.moveToObject(redBoss, player, 600);
        },1500);
        setInterval(()=>{
            if(redBossHealth <= 0) {
                redBossHealthText.setVisible(false);
            }
            redBossHealthText.x = redBoss.x-15;
            redBossHealthText.y = redBoss.y-130;
        }, 10);
        setInterval(()=>{
            if(redBoss.body.enable) {
                    if(Phaser.Math.Distance.Between(redBoss.x, redBoss.y, player.x, player.y) < 500) {
                        addPurplePaint(redBoss, 3000);
                        redBoss.rotation = Phaser.Math.Angle.Between( redBoss.x, redBoss.x, player.x, player.y)-300;
                        addPurplePaint(redBoss, 3000);
                        
                    } else {
                        redBoss.body.reset(redBoss.x, redBoss.y);
                    }
            }
            }, 500);
            
            
        // BLUE BOSS
        var blueBoss = this.physics.add.sprite(-738, -5424, 'blueBoss').setScale(3).setDrag(500,500).setDepth(10);
        var blueBossHealth = 15;
        var blueBossHealthText = this.add.text(300, -2218, blueBossHealth, {fontSize: '30px', fill: '#fff', fontFamily: '"Arial"'});
        setInterval(()=>{
            if(blueBoss.body.enable) {
                if(Phaser.Math.Distance.Between(blueBoss.x, blueBoss.y, player.x, player.y) < 1000) {
                this.physics.moveToObject(blueBoss, player, 900);
                setTimeout(()=>{
                    addPurplePaint(blueBoss, 10000);
                    addPurplePaint(blueBoss, 10000);
                    addPurplePaint(blueBoss, 10000);
                    addPurplePaint(blueBoss, 10000);
                    addPurplePaint(blueBoss, 10000);
                    addPurplePaint(blueBoss, 10000);
                }, 1000);
            }
            } else {
                blueBoss.body.reset(blueBoss.x, blueBoss.y);
            }
            
        },3000);
        setInterval(()=>{
            if(blueBossHealth <= 0) {
                blueBossHealthText.setVisible(false);
            }
            blueBossHealthText.x = blueBoss.x-20;
            blueBossHealthText.y = blueBoss.y-180;
        }, 10);
            
            
            
        // DOORS:
        var redDoorBottom = walls.create(0, -1532, 'door1').setImmovable(true).setVisible(false);
        redDoorBottom.body.enable = false;
        
        var redDoorBottomLeft = walls.create(-258, -1600, 'door2').setImmovable(true).setVisible(false);
        redDoorBottomLeft.body.enable = false;
        
        var redDoorTopRight = walls.create(600, -2565, 'door1').setImmovable(true);
        var redDoorTopLeft = walls.create(-260, -2400, 'door3').setImmovable(true);
        
        var redDoorBlueBoss = walls.create(-201, -4605, 'door1').setImmovable(true).setVisible(false);
        redDoorBlueBoss.body.enable = false;
        
        // PAINT
        var targetPaint = "red";
        var redPaint = this.physics.add.group();
        var bluePaint = this.physics.add.group();
        var placePaint = "";
        var amountRedPaint = 0;
        var amountBluePaint = 0;
        this.anims.create({
            key: 'redPaintPlace',
            frames: this.anims.generateFrameNumbers('redPaintSpritesheet', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'bluePaintPlace',
            frames: this.anims.generateFrameNumbers('bluePaintSpritesheet', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'purplePaintPlace',
            frames: this.anims.generateFrameNumbers('purplePaintSpritesheet', { start: 0, end: 8 }),
            frameRate: 15,
            repeat: 0
        });
        this.anims.create({
            key: 'purplePaintRemove',
            frames: this.anims.generateFrameNumbers('purplePaintSpritesheet', { start: 8, end: 0 }),
            frameRate: 15,
            repeat: 0
        });
        
        this.input.keyboard.on('keydown-' + 'E', function (event) { 
            if(targetPaint == "red") {
                placePaint = "red";
            }
            if(targetPaint == "blue") {
                placePaint = "blue";
            }
            
        });
        this.input.keyboard.on('keyup-' + 'E', function (event) { 
            placePaint = "";
        });
        var selector = this.add.image(660,630, 'selector').setOrigin(0,0).setScrollFactor(0).setScale(1).setDepth(100);
        this.input.keyboard.on('keyup-' + 'R', function (event) { 
            if(targetPaint == "red") {
                targetPaint = "blue";
                selector.y = 581;
            } else if(targetPaint == "blue") {
                targetPaint = "red";
                selector.y = 630;
            }
        });
        this.input.keyboard.on('keydown-' + 'SPACE', function (event) { 
            openSword = "open";
        });
        this.input.keyboard.on('keyup-' + 'SPACE', function (event) { 
            openSword = "";
        });
        setInterval(()=>{
            if(placePaint == "red") {
                if(amountRedPaint > 0) {
	                redPaint.create(player.x,player.y).anims.play('redPaintPlace').setImmovable(true);
	                amountRedPaint-=0.05;
	                redPaintBar.clear();
	                redPaintBar.fillStyle(0xff0000, 1);
                    redPaintBar.fillRect(550, 620, 100 * amountRedPaint, 30).setScrollFactor(0).setDepth(100);
                }
	        } else if(placePaint == "blue") {
	            if(amountBluePaint > 0) {
	                bluePaint.create(player.x,player.y).anims.play('bluePaintPlace').setImmovable(true);
	                amountBluePaint-=0.05;
	                bluePaintBar.clear();
	                bluePaintBar.fillStyle(0x0000ff, 1);
                    bluePaintBar.fillRect(550, 570, 100 * amountBluePaint, 30).setScrollFactor(0).setDepth(100);
	            }
	        }
        }, 100);
        
        
        var redPaintBar = this.add.graphics();
        redPaintBar.fillStyle(0xff0000, 1);
        var bluePaintBar = this.add.graphics();
        bluePaintBar.fillStyle(0x0000ff, 1);
        
        // MENU ITEMS           MENU ITEMS          MENU ITEMS          MENU ITEMS          MENU ITEMS
        var arrowsBox = this.add.graphics();
        arrowsBox.fillStyle(0x000000, 0.8);
        arrowsBox.fillRect(450, 680, 80, 35).setScrollFactor(0).setDepth(100);
        numArrowsText = this.add.text(500, 690, numArrows, {fontSize: '20px', fill: '#fff', fontFamily: '"Arial"'}).setScrollFactor(0).setOrigin(0,0).setDepth(100);
        this.add.image(450,697, 'arrow').setOrigin(0,0).setScrollFactor(0).setScale(0.6).setRotation(-45).setDepth(100);
        var arrowPop = this.add.image(470,2, 'popupArrows').setScale(0.75).setDepth(1000).setScrollFactor(0).setOrigin(0,0).setVisible(false);
        var healthPop = this.add.image(470,2, 'popupHealth').setScale(0.75).setDepth(1000).setScrollFactor(0).setOrigin(0,0).setVisible(false);
        var lifePop = this.add.image(470,2, 'popupLife').setScale(0.75).setDepth(1000).setScrollFactor(0).setOrigin(0,0).setVisible(false);
        
        damageOverlay = this.add.image(0,0,'damageOverlay').setOrigin(0,0).setScrollFactor(0).setDepth(1001).setVisible(false);
        
        attackable = true;
        this.time.addEvent({ delay: 1500, callback: allowAttack, callbackScope: this, loop: true });
        arrows = this.physics.add.group();
    
        var joystick = this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 120,
                y: 620,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0x888888),
                thumb: this.add.circle(0, 0, 40, 0xcccccc),
        });
        if (this.sys.game.device.os.desktop){
                joystick.toggleVisible(); // DELETE
        }
        
        
        // Cursor
        joysticks = joystick.createCursorKeys();
        arrowKeys = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        e:Phaser.Input.Keyboard.KeyCodes.E
        });
        
        pointer = game.input.activePointer;
        
        // CAMERA
        cam = this.cameras.main;
        //cam.setBounds(0, 0, 900, 700);
        cam.startFollow(player, true);
        cam.setZoom(1);
        cam.backgroundColor.setTo(170,170,170);
        
        // Collision
        //this.physics.add.overlap(sword, redEnemies, killEnemy, null, this);
        this.physics.add.overlap(arrows, redEnemies, killEnemy, null, this);
        this.physics.add.overlap(arrows, blueEnemies, killEnemy, null, this);
        
        this.physics.add.overlap(swordX, redEnemies, killEnemySword, null, this);
        this.physics.add.overlap(swordY, redEnemies, killEnemySword, null, this);
        this.physics.add.overlap(swordX, blueEnemies, killEnemySword, null, this);
        this.physics.add.overlap(swordY, blueEnemies, killEnemySword, null, this);
        
        this.physics.add.overlap(player, chests, openChest, null, this);
        this.physics.add.overlap(player, healthChests, openHealthChest, null, this);
        this.physics.add.overlap(arrows, redBoss, hitRedBoss, null, this);
        this.physics.add.overlap(arrows, blueBoss, hitBlueBoss, null, this);
        
        this.physics.add.overlap(player, purplePaint, function() {
            playerHealth -= 0.001;
            playerHealthBar.clear();
	        playerHealthBar.fillStyle(0x00ff00, 1);
            playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            damageOverlay.setVisible(true);
            setTimeout(()=>{damageOverlay.setVisible(false);}, 100);
        }, null, this);
        this.physics.add.overlap(player, redEnemies, function() {
            playerHealth -= 0.005;
            playerHealthBar.clear();
	        playerHealthBar.fillStyle(0x00ff00, 1);
            playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            damageOverlay.setVisible(true);
            setTimeout(()=>{damageOverlay.setVisible(false);}, 100);
        }, null, this);
        this.physics.add.overlap(player, blueEnemies, function() {
            playerHealth -= 0.006;
            playerHealthBar.clear();
	        playerHealthBar.fillStyle(0x00ff00, 1);
            playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            damageOverlay.setVisible(true);
            setTimeout(()=>{damageOverlay.setVisible(false);}, 100);
        }, null, this);
        this.physics.add.overlap(player, blueBoss, function() {
            playerHealth -= 0.001;
            playerHealthBar.clear();
	        playerHealthBar.fillStyle(0x00ff00, 1);
            playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            damageOverlay.setVisible(true);
            setTimeout(()=>{damageOverlay.setVisible(false);}, 100);
        }, null, this);
        this.physics.add.overlap(player, lifeStealChest, function() {
            lifeStealChest.destroy();
            lifeSteal = true;
            lifePop.setVisible(true);
            setTimeout(()=>{lifePop.setVisible(false);}, 3000);
        }, null, this);
        this.physics.add.overlap(player, pickUpArrows, function(player, pickArrow) {
            pickArrow.destroy();
            numArrows += 3;
            numArrowsText.text = numArrows;
        }, null, this);
        this.physics.add.collider(walls, player);
        this.physics.add.collider(walls, redEnemies);
        this.physics.add.collider(walls, blueEnemies);
        this.physics.add.collider(walls, redBoss);
        this.physics.add.collider(bluePaint, redBoss);
        this.physics.add.collider(blueEnemies, redPaint);
        this.physics.add.collider(walls, blueBoss);
        this.physics.add.collider(redPaint, blueBoss);
        this.physics.add.collider(bluePaint, redEnemies);
        
        // KILL COUNTER
        var killCount = this.add.text(600, 10, kills, {fontSize: '30px', fill: '#000', fontFamily: '"Arial"'}).setScrollFactor(0);
        
        function allowAttack() {
            attackable = true;
        }
        function killEnemy(killer, enemy) {
            kills += 1;
            killCount.text = kills;
            enemy.destroy();
            killer.destroy();
            if(lifeSteal) {
                playerHealth += 0.1;
                if(playerHealth > 1) {
                    playerHealth = 1;
                }
                playerHealthBar.clear();
	            playerHealthBar.fillStyle(0x00ff00, 1);
                playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            }
        }
        function killEnemySword(killer, enemy) {
            kills += 1;
            killCount.text = kills;
            enemy.destroy();
            if(lifeSteal) {
                playerHealth += 0.1;
                if(playerHealth > 1) {
                    playerHealth = 1;
                }
                playerHealthBar.clear();
	            playerHealthBar.fillStyle(0x00ff00, 1);
                playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
            }
        }
        function openChest(player, chest) {
            chest.destroy();
            arrowPop.setVisible(true);
            numArrows += 12;
            numArrowsText.text = numArrows;
            setTimeout(()=>{arrowPop.setVisible(false);}, 1000);
        }
        function openHealthChest(player, chest) {
            chest.destroy();
            if(Phaser.Math.Between(1, 1) == 1){
                healthPop.setVisible(true);
                playerHealth += 0.5;
                if(playerHealth>1) {
                    playerHealth = 1;
                }
                playerHealthBar.clear();
	            playerHealthBar.fillStyle(0x00ff00, 1);
                playerHealthBar.fillRect(550, 680, 100 * playerHealth, 30).setScrollFactor(0).setDepth(100);
                setTimeout(()=>{healthPop.setVisible(false);}, 1000);
            }
        }
        function hitRedBoss(boss, killer) {
            if(!redDoorBottomLeft.body.enable) { // summon doors 
                redDoorBottomLeft.body.enable = true;
                redDoorBottom.body.enable = true;
                redDoorBottomLeft.visible = true;
                redDoorBottom.visible = true;
            }
            redBossHealth-=1;
            redBossHealthText.text = redBossHealth;
            killer.destroy();
            if(redBossHealth === 0) {
                kills += 1;
                killCount.text = kills;
                boss.disableBody(true, true);
                amountRedPaint=1;
	            redPaintBar.clear();
	            redPaintBar.fillStyle(0xff0000, 1);
                redPaintBar.fillRect(550, 620, 100 * amountRedPaint, 30).setScrollFactor(0).setDepth(1000);
                if(redDoorBottomLeft.body.enable) {
                    redDoorBottomLeft.body.enable = false;
                    redDoorBottom.body.enable = false;
                    redDoorBottomLeft.visible = false;
                    redDoorBottom.visible = false;
                }
                if(redDoorTopLeft.body.enable) {
                    redDoorTopLeft.body.enable = false;
                    redDoorTopRight.body.enable = false;
                    redDoorTopLeft.visible = false;
                    redDoorTopRight.visible = false;
                }
            }
        }
        
        
        function hitBlueBoss(boss, killer) {
            if(!redDoorBlueBoss.body.enable) { // summon doors 
                redDoorBlueBoss.body.enable = true;
                redDoorBlueBoss.visible = true;
            }
            blueBossHealth-=1;
            blueBossHealthText.text = blueBossHealth;
            killer.destroy();
            if(blueBossHealth === 0) {
                kills += 1;
                killCount.text = kills;
                boss.disableBody(true, true);
                amountBluePaint=1;
	            bluePaintBar.clear();
	            bluePaintBar.fillStyle(0x0000ff, 1);
                bluePaintBar.fillRect(550, 570, 100 * amountBluePaint, 30).setScrollFactor(0).setDepth(1000);
                if(redDoorBlueBoss.body.enable) {
                    redDoorBlueBoss.body.enable = false;
                    redDoorBlueBoss.visible = false;
                }
            }
        }
        
        
        function addPurplePaint(placer, time) {
            var purp = purplePaint.create(placer.x, placer.y).anims.play('purplePaintPlace').setDepth(0);
            var purp2 = purplePaint.create(placer.x+Phaser.Math.Between(-100, 100), placer.y+Phaser.Math.Between(-100, 100)).anims.play('purplePaintPlace').setDepth(0);
            var purp3 = purplePaint.create(placer.x-Phaser.Math.Between(-100, 100), placer.y-Phaser.Math.Between(-100, 100)).anims.play('purplePaintPlace').setDepth(0);
            setTimeout(()=>{
                purp.anims.play('purplePaintRemove');
                purp2.anims.play('purplePaintRemove');
                purp3.anims.play('purplePaintRemove');
                setTimeout(()=>{
                    purp.destroy();
                    purp2.destroy();
                    purp3.destroy();
                }, 300);
            }, time);
        }
        
        target = new Phaser.Math.Vector2();
        
    }

	update() {
	    
	    
	    bow.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
	    
	    if(pointer.isDown) {
	        // if on mobile
	        if (this.sys.game.device.os.desktop){
            
	        
	        if(attackable) {
	            if(numArrows > 0) {
	                numArrows -= 1;
	                numArrowsText.text = numArrows;
	                attackable = false;
	                target.x = pointer.x + this.cameras.main.scrollX;
                    target.y = pointer.y + this.cameras.main.scrollY;
                    var arrow = arrows.create(player.x, player.y, 'arrow').setDepth(98);
                    if (arrow) {
                        arrow.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)-300;
                        //this.sound.play('shoot');
                        this.physics.moveTo(arrow, target.x, target.y, 800);
                        this.physics.add.overlap(arrow, walls, () => { arrow.destroy(); });
                        this.time.delayedCall(4000, () => { arrow.destroy();});
                    }
	            }
	        }
	    } else {
	        if(attackable) {
	            if(pointer.x>240 || pointer.y<500) {
	                if(numArrows > 0) {
	                    numArrows -= 1;
	                    numArrowsText.text = numArrows;
	                    attackable = false;
	                    target.x = pointer.x + this.cameras.main.scrollX;
                        target.y = pointer.y + this.cameras.main.scrollY;
                        var arrow = arrows.create(player.x, player.y, 'arrow').setDepth(98);
                        if (arrow) {
                            arrow.rotation = Phaser.Math.Angle.Between(player.x, player.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)-300;
                            //this.sound.play('shoot');
                            this.physics.moveTo(arrow, target.x, target.y, 800);
                            this.physics.add.overlap(arrow, walls, () => { arrow.destroy(); });
                            this.time.delayedCall(4000, () => { arrow.destroy();});
                        }
	                }
	            }
	        }
	    }
	    }
	    
	    
	    if(openSword === "") {
	        swordX.visible = false;
            swordY.visible = false;
            swordX.body.enable = false;
            swordY.body.enable = true;
	    }
	    // Movement
        if (cursors.left.isDown || joysticks.left.isDown || arrowKeys.left.isDown)
        {
                player.setVelocityX(-250);
                bow.x = player.x;
                bow.y = player.y;
                if(openSword == "open") {
                    swordX.x = player.x-55
                    swordX.y = player.y;
                    swordX.setFlipX(true);
                    swordX.visible = true;
                    swordY.visible = false;
                    swordX.body.enable = true;
                    swordY.body.enable = false;
                }
        }
        else if (cursors.right.isDown || joysticks.right.isDown || arrowKeys.right.isDown)
        {
                player.setVelocityX(250);
                bow.x = player.x;
                bow.y = player.y;
                if(openSword == "open") {
                    swordX.x = player.x+55;
                    swordX.y = player.y;
                    swordX.setFlipX(false);
                    swordX.visible = true;
                    swordY.visible = false;
                    swordX.body.enable = true;
                    swordY.body.enable = false;
                }
        }
        else if (cursors.up.isDown || joysticks.up.isDown || arrowKeys.up.isDown)
        {
                player.setVelocityY(-250);
                bow.x = player.x;
                bow.y = player.y;
                if(openSword == "open") {
                    swordY.x = player.x;
                    swordY.y = player.y-80;
                    swordY.setFlipY(false);
                    swordX.visible = false;
                    swordY.visible = true;
                    swordX.body.enable = false;
                    swordY.body.enable = true;
                }
        } else if (cursors.down.isDown || joysticks.down.isDown || arrowKeys.down.isDown)
        {
                player.setVelocityY(250);
                bow.x = player.x;
                bow.y = player.y;
                if(openSword == "open") {
                    swordY.x = player.x;
                    swordY.y = player.y+80;
                    swordY.setFlipY(true);
                    swordX.visible = false;
                    swordY.visible = true;
                    swordX.body.enable = false;
                    swordY.body.enable = true;
                }
        }
        else
        {
            bow.x = player.x;
            bow.y = player.y;
        }
        
        if(playerHealth<0) {
            playerHealth = 1;
            numArrows = 5;
            this.scene.switch('end');
        }
        
        // End Movement
        
        
        // Sword
        
    
	}


	end() {
		
	}
	


}

export default GameScene;