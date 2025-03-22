class TitleScene extends Phaser.Scene {

	constructor() {
		super({key:'titleScene'});
	}

	preload() {
		this.load.image('main', 'assets/main.png');
		this.load.image('open', 'assets/opened.png');
		this.load.image('write', 'assets/write.png');
		this.load.image('holder', 'assets/holder.png');
		this.load.image('info', 'assets/info.png');
		this.load.image('log', 'assets/log.png');
		this.load.image('ladder', 'assets/ladder.png');
		this.load.image('plug', 'assets/plug.png');
		this.load.image('switch', 'assets/switch.png');
		this.load.image('os', 'assets/os.png');
		this.load.image('cross', 'assets/cross.png');
		
		// GAMESCENE:
		this.load.image('playerImg', 'assets/player.png');
		this.load.image('bg', 'assets/bg.png');
		this.load.image('talkbox', 'assets/talkbox.png');
		this.load.image('chest', 'assets/chest.png');
		this.load.image('tree', 'assets/tree.png');
		this.load.image('hole', 'assets/hole.png');
		this.load.image('bLadder', 'assets/bLadder.png');
		this.load.image('underground', 'assets/underground.png');
		this.load.image('dark', 'assets/dark.png');
		this.load.image('outlet', 'assets/outlet.png');
		
		this.load.audio('gong', 'sound/gong.mp3');
		
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
		var bg = this.add.sprite(450, 350, 'main');
		var op = this.add.sprite(450, 350, 'open').setVisible(false);
		var started = false;
		var editable = false;
		var typed = 0;
		var written = false;
		section = 0;
		var newText = "";
		var words;
		var beforeInfo = "";
        this.input.on('pointerdown', () => {
            if(started === false) {
                started = true;
                this.scene.launch('gameScene');
                start();
            }
        });
        
        var write = this.add.sprite(605,300,'write').setScale(0.5).setInteractive().setVisible(false);
        write.on('pointerdown', ()=>{
            if(section == 1) {
                checkYesNo();
            } else if (section == 2) {
                checkDo();
            } else if (section == 3) {
                checkDo();
            } else if (section == 4) {
                checkDo();
            } else if (section == 5) {
                checkDo();
            }
        });
        text = this.add.text(250,50, '', { fontSize: 18, color: '#000000' }).setVisible(false);
        var info = this.add.image(520,300,'info').setScale(0.5).setInteractive().setVisible(false);
        info.on('pointerdown', ()=>{
            editable = false;
            beforeInfo = text.text;
            cross.clear(true,true);
            text.text = "I\n\t\tmove\n\t\t\t\tright\n\t\t\t\tleft\n\t\tinspect (object)\n\t\tpick up (object)\n\t\tmake (object)\n\t\tplace (object)";
            if(section == 4) {
                text.text+="\n\nHint: Use an outlet starter to turn\non lights.";
            }
            
            setTimeout(function () {
                editable = true;
                text.text = beforeInfo;
            }, 3000);
        });
        
        // ADD EDITABILITY
        var shift = this.input.keyboard.addKey('SHIFT');
        this.input.keyboard.on('keydown-' + 'BACKSPACE', function (event) { if(editable){text.text = text.text.slice(0, -1); typed-=1; updateText(); }});
        this.input.keyboard.on('keydown-' + 'Q', function (event) { if(editable){if(shift.isDown){text.text += 'Q'} else {text.text += 'q'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'W', function (event) { if(editable){if(shift.isDown){text.text += 'W'} else {text.text += 'w'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'E', function (event) { if(editable){if(shift.isDown){text.text += 'E'} else {text.text += 'e'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'R', function (event) { if(editable){if(shift.isDown){text.text += 'R'} else {text.text += 'r'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'T', function (event) { if(editable){if(shift.isDown){text.text += 'T'} else {text.text += 't'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'Y', function (event) { if(editable){if(shift.isDown){text.text += 'Y'} else {text.text += 'y'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'U', function (event) { if(editable){if(shift.isDown){text.text += 'U'} else {text.text += 'u'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'I', function (event) { if(editable){if(shift.isDown){text.text += 'I'} else {text.text += 'i'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'O', function (event) { if(editable){if(shift.isDown){text.text += 'O'} else {text.text += 'o'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'P', function (event) { if(editable){if(shift.isDown){text.text += 'P'} else {text.text += 'p'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'A', function (event) { if(editable){if(shift.isDown){text.text += 'A'} else {text.text += 'a'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'S', function (event) { if(editable){if(shift.isDown){text.text += 'S'} else {text.text += 's'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'D', function (event) { if(editable){if(shift.isDown){text.text += 'D'} else {text.text += 'd'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'F', function (event) { if(editable){if(shift.isDown){text.text += 'F'} else {text.text += 'f'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'G', function (event) { if(editable){if(shift.isDown){text.text += 'G'} else {text.text += 'g'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'H', function (event) { if(editable){if(shift.isDown){text.text += 'H'} else {text.text += 'h'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'J', function (event) { if(editable){if(shift.isDown){text.text += 'J'} else {text.text += 'j'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'K', function (event) { if(editable){if(shift.isDown){text.text += 'K'} else {text.text += 'k'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'L', function (event) { if(editable){if(shift.isDown){text.text += 'L'} else {text.text += 'l'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'Z', function (event) { if(editable){if(shift.isDown){text.text += 'Z'} else {text.text += 'z'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'X', function (event) { if(editable){if(shift.isDown){text.text += 'X'} else {text.text += 'x'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'C', function (event) { if(editable){if(shift.isDown){text.text += 'C'} else {text.text += 'c'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'V', function (event) { if(editable){if(shift.isDown){text.text += 'V'} else {text.text += 'v'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'B', function (event) { if(editable){if(shift.isDown){text.text += 'B'} else {text.text += 'b'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'N', function (event) { if(editable){if(shift.isDown){text.text += 'N'} else {text.text += 'n'}} updateText(); });
        this.input.keyboard.on('keydown-' + 'M', function (event) { if(editable){if(shift.isDown){text.text += 'M'} else {text.text += 'm'}} updateText(); });
        
        this.input.keyboard.on('keydown-' + 'SPACE', function (event) { if(editable){text.text += ' '} updateText(); });
        this.input.keyboard.on('keydown-' + 'COMMA', function (event) { if(editable){text.text += ','} updateText(); });
        this.input.keyboard.on('keydown-' + 'PERIOD', function (event) { if(editable){text.text += '.'} updateText(); });
        this.input.keyboard.on('keydown-' + 'QUOTES', function (event) { if(editable){if(shift.isDown){text.text += '"'} else {text.text += "'"}} updateText(); });
        this.input.keyboard.on('keydown-' + 'FORWARD_SLASH', function (event) { if(editable){if(shift.isDown){text.text += '?'} else {text.text += "/"}} updateText(); });
        this.input.keyboard.on('keydown-' + 'ONE', function (event) { if(editable){if(shift.isDown){text.text += '!'} updateText(); }});
        
        // PICK UP ABLES:
        var holder = this.add.image(96,360,'holder').setVisible(false);
        var body = this.add.image(70,320,'chest').setVisible(false);
        var log = this.add.image(116,320,'log').setScale(0.25).setVisible(false);
        var ladder = this.add.image(70,360,'ladder').setVisible(false);
        var plug = this.add.image(116,360,'plug').setVisible(false);
        var switchI = this.add.image(70,400,'switch').setVisible(false);
        var os = this.add.image(116,400,'os').setVisible(false);
        
        cross = this.physics.add.group();
        
        async function start() {
	        op.setVisible(true);
	        text.setVisible(true);
	        write.setVisible(true);
	        bg.destroy();
	        // start
	        text.text = 'Soul is alone.';
	        await twoSeconds();
	        text.text += ' He does not know why.';
	        await oneSeconds();
	        text.text += '\nHe copes with this through his diary.';
	        await twoSeconds();
	        text.text += '\nHe knows nothing of his past self,\nand wishes to unravel what happened to\nhim.';
	        await fourSeconds();
	        text.text = '';
	        await twoSeconds();
	        text.text += '"Will you help me?" I ask.';
	        await oneSeconds();
	        text.text += '\n(Type to respond. Use quotes to\ntalk and click Write when done.)\n';
	        oldText = text.text;
	        editable = true;
	        section = 1;
	    }
	    
	    function checkYesNo() {
	        newText = text.text.replace(oldText, '');
	        talk(newText.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")); // said
	        if (newText.includes('yes')||newText.includes('Yes')||newText.includes('sure')||newText.includes('Sure')&&newText.includes('"')) {
	            checkNewPage();
	            text.text ="";
	            // page turn effect
	            text.text += "Thank you so much! Ok, let's get started.\n\nI've figured out that you can make me\ndo things with sentences in the form of\nnoun verb adverb/object. Try moving me\nright with 'I move right.'\n\n";
	            oldText = text.text;
	            editable = true;
	            typed = 0;
	            section = 2;
	        } else if (newText.includes('no')||newText.includes('No')&&newText.includes('"')) {
	            checkNewPage();
	            text.text += "\nOh. I guess I'll never know my\ntrue story.\n\nTHE END.";
	            section = 0;
	            editable = false;
	        } else if(!newText.includes('"')){
	            checkNewPage();
	            text.text += "\nHint: Add quotes.\n";
	            typed = 0;
	            oldText = text.text;
	        } else {
	            checkNewPage();
	            text.text+= "\nThe diary doesn't understand what\nyou wrote. Try a simple yes or no.\n";
	            typed = 0;
	            oldText = text.text;
	        }
	    }
	    
	    function checkNewPage() {
	        if(text.height>220) {
	            text.text = "";
	            cross.clear(true,true);
	            // play page turn sfx
	        }
	    }
	    
	    function updateText() {
	        typed +=1;
	        if(typed>35) {
	            typed = 0;
	            text.text += '\n';
	        }
	        
	    }
	    
	    async function checkDo() {
	       
	       newText = text.text.replace(oldText, '');
	       words = newText.split(' ');
	       checkNewPage();
	       
	       // cross out
	       if(!newText.includes('"')){
	           if(!(words[0] == "I" || words[0] == "i")) {
	                cross.create(470, text.height - 50+90, 'cross');
	           }
	       }
	       
	       
	       if(newText.includes('"')) {
	           talk(newText.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")); // said
	           
	       }
	       
	       // find noun
	       if(words[0] == "I" || words[0] == "i" ) { // I I I I I
	            // find verb
	            if(words[1] == "Move" || words[1] == "move" ) { // movement
	                // find adverb
	                if(words[2] == "Right." || words[2] == "right." || words[2] == "Right" || words[2] == "right") {
	                    playerDir = "right";
	                    await oneSeconds();
	                    playerDir = "";
	                    if(section == 2) {
	                        text.text += '\n"Fun!" I say.';
	                        talk("Fun!");
	                        await twoSeconds();
	                        text.text = '';
	                        cross.clear(true,true);
	                        text.text += "Now, try to figure out what happened\nin Soul's past life. Remember:\nNoun, Verb, Adverb/Object. Additionally, as\nin a book, use quotations to talk out\nloud. If you are stuck, click the help\nbutton. The reigns are yours!\n";
	                        section = 3;
	                        info.setVisible(true);
	                    }
	                } else if(words[2] == "Left." || words[2] == "left." || words[2] == "Left" || words[2] == "left") {
	                    playerDir = "left";
	                    await oneSeconds();
	                    playerDir = "";
	                } else {
	                    cross.create(470, text.height - 50+90, 'cross');
	                }
	            } else if (words[1] == "Inspect" || words[1] == "inspect" ) { //inspection
	                if(words[2] == "Body." || words[2] == "body." || words[2] == "Body" || words[2] == "body"|| words[2] == "the body." || words[2] == "the body") {
	                    if(text.height>180) {
	                        text.text = "";
	                        cross.clear(true,true);
	                        // play page turn sfx
	                    }
	                    text.text+="\nThe body looks...";
	                    await twoSeconds();
	                    text.text+='fairly new. All the bones\nare cracked though. I can pick it\nup with "I pick up body.\n';
	                } else if(words[2] == "Tree." || words[2] == "tree." || words[2] == "Tree" || words[2] == "tree"|| words[2] == "the tree." || words[2] == "the tree") {
	                    checkNewPage();
	                    text.text+="\nI can pick up this tree for logs.\n";
	                } else if(words[2] == "Plug." || words[2] == "plug." || words[2] == "Plug" || words[2] == "plug"|| words[2] == "the plug." || words[2] == "the plug") {
	                    if(text.height>180) {
	                            text.text = "";
	                            cross.clear(true,true);
	                        // play page turn sfx
	                        }
	                    text.text+="\nI can combine this with a switch to\nmake an outlet starter.\n";
	                } else if(words[2] == "Switch." || words[2] == "switch." || words[2] == "Switch" || words[2] == "switch"|| words[2] == "the switch." || words[2] == "the switch") {
	                    if(text.height>180) {
	                            text.text = "";
	                            cross.clear(true,true);
	                        // play page turn sfx
	                        }
	                    text.text+="\nI can combine this with an plug\nto make a working outlet starter.\n";
	                } else if(words[2] == "outlet." || words[2] == "Outlet." || words[2] == "Outlet" || words[2] == "outlet"|| words[2] == "the outlet." || words[2] == "the outlet") {
	                    if(text.height>200) {
	                            text.text = "";
	                            cross.clear(true,true);
	                        // play page turn sfx
	                        }
	                    text.text+="\nAn outlet which I can plug\nthings in to.\n";
	                } else {
	                    cross.create(470, text.height - 50+90, 'cross');
	                }
	            } else if (words[1] == "pick" && words[2] == "up" ) { // pick up
	                if(words[3] == "Body." || words[3] == "body." || words[3] == "Body" || words[3] == "body"|| words[3] == "the body." || words[3] == "the body") {
	                    pickUpItem('body');
	                } else if(words[3] == "Tree." || words[3] == "tree." || words[3] == "Tree" || words[3] == "tree"|| words[3] == "the tree." || words[3] == "the tree") {
	                    pickUpItem('tree');
	                } else if(words[3] == "Plug." || words[3] == "plug." || words[3] == "Plug" || words[3] == "plug"|| words[3] == "the plug." || words[3] == "the plug") {
	                    pickUpItem('plug');
	                    section = 4;
	                } else if(words[3] == "switch." || words[3] == "Switch." || words[3] == "Switch" || words[3] == "switch"|| words[3] == "the switch." || words[3] == "the switch") {
	                    pickUpItem('switch');
	                    section = 4;
	                } else if(words[3] == "outlet." || words[3] == "Outlet." || words[3] == "Outlet" || words[3] == "outlet"|| words[3] == "the outlet." || words[3] == "the outlet") {
	                    checkNewPage();
	                    section = 4;
	                    text.text+="\nI can't get it out of the wall.\n";
	                } else {
	                    cross.create(470, text.height - 50+90, 'cross');
	                }
	            } else if (words[1] == "make" || words[1] == "Make" ) { // crafting
	                if(words[2] == "Ladder." || words[2] == "ladder." || words[2] == "Ladder" || words[2] == "ladder"|| words[2] == "a ladder." || words[2] == "a ladder" || words[2] == "the ladder." || words[2] == "the ladder") {
	                    if(log.visible === true && body.visible === true) {
	                        log.setVisible(false);
	                        body.setVisible(false);
	                        checkNewPage();
	                        text.text += "\nI made a makeshift ladder. Place it with\n\"I place ladder\"\n";
	                        ladder.setVisible(true);
	                    } else {
	                        checkNewPage();
	                        text.text += "\nI need a log and body to make a ladder.\n";
	                    }
	                } else if(words[2] == "outlet" && (words[3] == "starter." || words[3] == "starter")) {
	                    if(plug.visible === true && switchI.visible === true) {
	                        plug.setVisible(false);
	                        switchI.setVisible(false);
	                        checkNewPage();
	                        text.text += "\nI made an outlet starter.\n";
	                        os.setVisible(true);
	                    } else {
	                        if(text.height>180) {
	                            text.text = "";
	                            cross.clear(true,true);
	                        // play page turn sfx
	                        }
	                        text.text += "\nI need a plug and switch to\nmake an outlet starter.\n";
	                    }
	                }
	            } else if (words[1] == "place" || words[1] == "Place" ) { // crafting
	            //console.log(words[2] == "outlet" && (words[3] == "starter." || words[3] == "starter"));
	            //console.log(words[2]);
	            //console.log(words[3]);
	                if(words[2] == "Ladder." || words[2] == "ladder." || words[2] == "Ladder" || words[2] == "ladder"|| words[2] == "a ladder." || words[2] == "a ladder" || words[2] == "the ladder." || words[2] == "the ladder") {
	                    if(ladder.visible === true) {
	                        if(text.height>200) {
	                            text.text = "";
	                            cross.clear(true,true);
	                        // play page turn sfx
	                        }
	                        text.text += "\nI place a makeshift ladder and climb down.\n";
	                        bLadder.setVisible(true);
	                        ladder.setVisible(false);
	                        player.x = bLadder.x;
	                    } else {
	                        checkNewPage();
	                        text.text += "\nYou do not have a ladder.\n";
	                    }
	                } else if(words[2] == "outlet" && (words[3] == "starter." || words[3] == "starter")) {
	                    if(os.visible === true) {
	                        if(text.height>200) {
	                            text.text = "";
	                            cross.clear(true,true);
	                            
	                        // play page turn sfx
	                        }
	                        text.text += "\nI placed an outlet starter and\nturned it on.\n";
	                        section = 5;
	                        gameOS.setVisible(true);
	                        os.setVisible(false);
	                        player.x = gameOS.x-75;
	                        dark.setVisible(false);
	                    } else {
	                        checkNewPage();
	                        text.text += "\nYou do not have an outlet starter.\n";
	                    }
	                } else {
	                    cross.create(470, text.height - 50+90, 'cross');
	                }
	            }
	       }
	       
	       
	       text.text += "\n";
	       typed = 0;
	       oldText = text.text;
	       
	    }
	    
	    
	    
        function pickUpItem(str) {
            if(holder.visible === false) {
                holder.visible = true;
            }
            
            if(str=='body') {
                body.setVisible(true);
                gameBody.destroy();
            } else if (str == 'tree') {
                checkNewPage();
	            text.text+= "\nI was able to pick up 1 log.\n";
                log.setVisible(true);
                tree.destroy();
            } else if (str == 'plug') {
                plug.setVisible(true);
                gamePlug.destroy();
            } else if (str == 'switch') {
                switchI.setVisible(true);
                gameSwitch.destroy();
            }
        }  
	}

}

export default TitleScene;