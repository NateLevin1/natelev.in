
// You can write more code here

/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		this.count = 0;
		
	}
	
	_create() {
	
		this.add.image(949.06006, 510.56946, "bg");
		
		this.add.image(2831.5093, 530.8419, "bg");
		
		this.add.image(951.2059, -530.6505, "bg");
		
		this.add.image(2832.5696, -534.04034, "bg");
		
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		
		this.input.setGlobalTopOnly(true);
		
		this.Vignette = this.game.renderer.addPipeline('Vignette', new Vignette(this.game));
  		this.applyPipeline(); 
		
		
		
		this.graphics = this.add.graphics(); // DEBUG DELETE
		
		this.add.image(0, 1073, "bar").setScale(20, 1.9);
		
		
		// START MENU
		var startBar = this.add.group();
		startBar.add(this.add.image(0,800, "bar").setScale(0.6, 3.5).setOrigin(0,0).setVisible(false));
		startBar.add(this.add.image(2,806, "sleep").setOrigin(0,0).setInteractive().on('pointerdown', function () {
			this.sleep();
		}, this)).setVisible(false);
		startBar.add(this.add.image(2,876, "openTerminal").setOrigin(0,0).setInteractive().on('pointerdown', function () {
			this.createWindow(terminal);
			// close menu
			startBar.children.each(function (child) {
				child.setVisible(false);
			});
			
		}, this)).setVisible(false);
		startBar.add(this.add.image(2,946, "openFiles").setOrigin(0,0).setInteractive().on('pointerdown', function () {
			this.createWindow(files);
			// close menu
			startBar.children.each(function (child) {
				child.setVisible(false);
			});
			
		}, this)).setVisible(false);
		
		startBar.children.each(function (child) {
			
		});
		
		var start = this.add.image(30, 1050, "logo").setScale(0.45, 0.45).setInteractive();
		start.on('pointerdown', ()=>{
			startBar.children.each(function (child) {
				child.setVisible(true);
			});
			setTimeout(()=>{
				startBar.children.each(function (child) {
					child.setVisible(false);
				});
			},2500);
		});
		
		var mailIcon = this.add.image(70, 40, "mail").setScale(1.2, 1.2).setInteractive();
		mailIcon.on('pointerdown', function() {
			this.createWindow(mail);
		}, this);
		this.mailNotifications = this.add.image(110, 20, "notification2").setScale(0.4, 0.4);
		this.mailNotificationsText = this.add.text(102, 5, mailNotifs, { fontFamily: 'Arial', fontSize: 28, color: '#ffffff' });
		
		var browserIcon = this.add.image(70, 125, "browser").setScale(0.9, 0.9).setInteractive();
		browserIcon.on('pointerdown', ()=>{
			this.createWindow(browser);
		});
		
		var pdfIcon = this.add.image(70, 295, "pdf").setScale(0.8, 0.8).setInteractive();
		pdfIcon.on('pointerdown', ()=>{
			this.createWindow(pdf);
		});
		
		var terminalIcon = this.add.image(70, 390, "terminalIcon").setScale(0.8, 0.65).setInteractive();
		terminalIcon.on('pointerdown', ()=>{
			this.createWindow(terminal);
		});
		
		// folders
		var folder = this.add.image(70, 210, "folder").setScale(0.8, 0.8).setInteractive();
		folder.on('pointerdown', ()=>{
			this.createWindow(files);
		});
		
		
		// DEBUG DELETE
		this.graphics.fillStyle(0x9be8f2, 0.15);
		
		this.sleepNotification = this.add.image(1670, 890, "done2").setVisible(false);
		
		this.textToSpeechSound = this.sound.add('speech', {loop:true});
		this.beepSound = this.sound.add('mistake', {loop:true});
	}

	update() {
		// square selecting
		setTimeout(()=>{
			this.graphics.clear();
		}, 10);
		if(this.input.activePointer.primaryDown) {
			this.graphics.fillRect(this.input.activePointer.downX, this.input.activePointer.downY, this.input.activePointer.x-this.input.activePointer.downX, this.input.activePointer.y-this.input.activePointer.downY);
		}
		
		
		if(mailNotifs < 1) {
			this.mailNotifications.setVisible(false);
			this.mailNotificationsText.setVisible(false);
		} else {
			if(this.mailNotifications.visible == false) {
				this.mailNotifications.setVisible(true);
				this.mailNotificationsText.setVisible(true);
			}
			this.mailNotificationsText.text = mailNotifs;
			
		}
		
		if(mailNum == 3) {
			mailNum = 4;
			setTimeout(()=>{
				mailNotifs += 1;
				this.sound.play('notification1');
			}, 16000)
		}
		
		if(mailNum == 6) {
			mailNum = 7;
			setTimeout(()=>{
				//show sleep notification
				this.sleepNotification.setVisible(true);
				this.sound.play('notification1');
			}, 14000)
		}
		
		if(mailNum == 8) {
			mailNum = 9;
			mailNotifs += 1;
			this.sound.play('notification1');
		}
		if(mailNum == 13) {
			mailNum = 14;
			mailNotifs += 1;
			this.sound.play('notification1');
		}
		if(mailNum == 16) {
			mailNum = 17;
			mailNotifs += 1;
			this.sound.play('notification1');
		}
		if(mailNum == 19) {
			mailNum = 20;
			setTimeout(()=>{
				alert("You've reached the end of the story for this game. This was originally a game jam game, but I didn't finish it in time. I went on, but eventually got bored of it. I know there isn't very much game here, but I think it is cool how closely we can resemble a computer in Javascript. Thanks for playing, I hope you checkout the other (better) games on my site, natelev.in. If you want to know what the deal with the Bird group was, they were attempting to de-citizenize all immigrant citizens, similar to the citizenship amendment act passed by Indian Pariliament in 2019. If you would like to see how the story would have ended, had I not decided to give up this project, it would have gone as follows. player gets email from birdGroup@noone.gov which reads, “We are watching all that you are doing. Stop now and nobody gets hurt.”\nrobert tells you that he is being held at gunpoint and doesn’t know why\nterminal get diagnostics for recent email\nterminal responds: Spoofed: True; IP address: 33.21.230.19\nplayer replies to roberts (actually brenharts) email saying “I know it’s you Brenhart. what do you have to hide?”\n- [ ] Screen slowly gets darker until the screen suddenly gets bright again, but the computer background is different. Text on background reads: you should know better than to mess with the government. player gets another email from anonymous, this time with a pdf with a picture of a headline which reads “Government raid on The Times news office, known for publishing an insider’s surprising story, 32 in custody.” email says “you don’t want this to happen to you, do you?” in terminal: check hidden data for raid.pdf, terminal responds “username: group-together password: strong” inputs username and password into private ip site and sees overview.pdf. Reading it explains the goals of the bird group, and your screen fades to white slowly until it is fully white.\nA cutscene plays. It is black text on the white screen.\n“you hear footsteps outside your room.”\n\nClick close to continue");
				alert("“I didn’t want it to come to this”, says a voice inside your office.\n“Me neither” you respond.\n\n“Ready to die?” the voice asks.\n“If I click this button, (button appears onscreen) everything I learned will be available for everyone to see.”\n“Oh I wouldn’t do that…”\nif button is clicked now, player gets shot, but wins. if not click, voice says\n“Glad you wanted to help out our cause.”\n“Anything for the government,” you respond.\n\n Sorry if it doesn't make sense at times. This project had many major flaws, including that 90% of the puzzles were just: find the right app, click the button that appears, and games like that aren't fun at all. Now go play one of my other games!");
			}, 2000);
			
		}
		
		
		if(playTTS == true) {
			
			if(!this.textToSpeechSound.isPlaying) {
				this.textToSpeechSound.play();
				this.beepSound.play();
			}
			
		} else if(playTTS == false) {
			if(this.textToSpeechSound.isPlaying) {
				this.textToSpeechSound.stop();
				this.beepSound.stop();
			}
		}
		
	}
	
	createWindow(func) {
		if(apps < 25) {
		this.count += 1;
		var handle = 'window' + this.count;

        var win = this.add.zone(100, 100, func.WIDTH, func.HEIGHT).setInteractive().setOrigin(0);

        var demo = new func(handle, win);

        this.input.setDraggable(win);
		
        win.on('drag', function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
			this.win = win;
            demo.refresh();

        });

		win.on('pointerdown', function () {
            demo.refresh();
			topDepth += 1;
			this.setDepth(topDepth);
        });
		
        this.scene.add(handle, demo, true);
		topDepth += 1;
		win.setDepth(topDepth);
			
		win.win = win;
		demo.refresh();
		
		}
	}
	
	applyPipeline() {
  		this.Vignette.setFloat2('resolution', 1920, 1080);
  		this.Vignette.setFloat1('r',0.2);
  		this.Vignette.setFloat1('b', 0.7);
  		this.Vignette.setFloat1('tx', 0.5);
  		this.Vignette.setFloat1('ty', 0.5);
  		this.Vignette.setFloat1('bright', 2.0);
  		this.Vignette.setFloat1('red', 1.0);
  		this.Vignette.setFloat1('green', 1.0);
  		this.Vignette.setFloat1('blue', 1.0);
  		this.Vignette.setFloat1('bgred', 1.0);
  		this.Vignette.setFloat1('bggreen', 1.0);
  		this.Vignette.setFloat1('bgblue', 1.0);
  		this.cameras.main.setRenderToTexture(this.Vignette);
	}
	
	sleep() {
		sleeping = true;
		if(mailNum == 7) {
			mailNum = 8;
		}
		if(mailNum == 15) {
			mailNum = 16;
		}
		this.sleepNotification.setVisible(false);
		var cover = this.add.image(0,0,'bar').setOrigin(0,0).setScale(20,20);
		
		this.sound.play('sleep2');
		
		setTimeout(()=>{
			
			
			this.timeTextHours = this.add.bitmapText(680, 440, "arialNumbers", "11", 200).setTintFill(0xffffff);
			this.colon = this.add.bitmapText(880, 440, "arialNumbers", ":", 200).setTintFill(0xffffff);
			this.timeTextMinutes = this.add.bitmapText(950, 440, "arialNumbers", "00", 200).setTintFill(0xffffff);
			
			var mins = 0;
			var hours = 11;
			var timeForward = setInterval(()=>{
				mins += 1;
				if(mins > 59) {
					mins = 0;
					hours += 1;
					if(hours > 12) {
						hours = 1;
					}
					this.timeTextHours.text = hours;
				}
				this.timeTextMinutes.text = mins;
			}, 10);
			setTimeout(()=>{
				clearInterval(timeForward);
				this.timeTextHours.text = 7;
				this.timeTextMinutes.text = "00";
				this.sound.play("alarm");
			},5060);
			
		}, 600);
		setTimeout(()=>{
			this.timeTextHours.destroy();
			this.timeTextMinutes.destroy();
			this.colon.destroy();
			cover.destroy();
			sleeping = false;
			this.sound.play('open');
			}, 8500);
	}


	/* END-USER-CODE */
}





// WINDOWS WINDOWS WINDOWS WINDOWS WINDOWS WINDOWS WINDOWS


class files extends Phaser.Scene {
	
	constructor(handle, parent) {
	
		super(handle);
		this.handle = handle;
		this.parent = parent;
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		
		setInterval(()=>{console.log(this.input.topOnly)}, 100);
		
		apps+=1;
		this.cameras.main.setViewport(this.parent.x, this.parent.y, files.WIDTH, files.HEIGHT);
		this.cameras.main.setBackgroundColor("#000000");
		
		this.add.text(files.WIDTH/2-60, 3, 'File Browser', { fontFamily: 'Arial', fontSize: 20, color: '#00cf00' });
		this.close = this.add.image(files.WIDTH-12, 12, "close").setScale(0.1, 0.1).setInteractive();
		this.close.on('pointerdown', function() {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}, this);
		
		this.bg = this.add.image(0, 25, "fileBg").setOrigin(0,0).setScale(20,20);
		
		this.hide = this.add.image(files.WIDTH-35, 12, "hide").setScale(0.1, 0.1).setInteractive();
		this.hide.on('pointerdown', function() {
			this.scene.setVisible(false, this.handle);
		}, this);
		
		var otherScene = this.scene.get('Scene1');
		this.icon = otherScene.add.image(apps*72+30, 1050, "folder").setScale(0.55, 0.55).setInteractive();
		this.icon.on('pointerdown', function() {
			this.scene.setVisible(true, this.handle);
			this.scene.bringToTop();
		}, this)
		
		if(mailNum > 0) {
			this.add.bitmapText(40, 190,'arial', 'Census Commentary.pdf', 25).setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf);}, this);
			this.add.image(175, 128,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf);}, this);
		}
		
		if(mailNum > 4) {
			this.add.bitmapText(344, 190,'arial', 'Bird-notes.pdf', 25).setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf);}, this);
			this.add.image(430, 128,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); }, this);
		}
		
		if(mailNum >= 11) {
			this.add.bitmapText(590, 190,'arial', 'info.pdf', 25).setInteractive().on('pointerdown', function() {pdfReading = "info";otherScene.createWindow(pdf);}, this);
			this.add.image(635, 128,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "info";otherScene.createWindow(pdf);}, this);
		}
		
		if(mailNum >= 12) {
			this.add.bitmapText(750, 190,'arial', 'info-data-check.pdf', 25).setInteractive().on('pointerdown', function() {pdfReading = "info-data-check";otherScene.createWindow(pdf);}, this);
			this.add.image(845, 128,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "info-data-check";otherScene.createWindow(pdf);}, this);
		}
		
		if(mailNum >= 13) {
			this.add.bitmapText(980, 190,'arial', 'birdGroup-Email-Diagnostics.pdf', 25).setInteractive().on('pointerdown', function() {pdfReading = "birdGroup-Email-Diagnostics";otherScene.createWindow(pdf);}, this);
			this.add.image(1130, 128,'pdf').setInteractive().on('pointerdown', function() {if(focused == this.handle) {pdfReading = "birdGroup-Email-Diagnostics";otherScene.createWindow(pdf);}}, this);
		}
		
		
		
	}
	
	update() {
		if(sleeping == true) {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}
		
		if(this.numApps > apps) {
			this.icon.x = apps*72+30;
		}
	}
	
	refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
		focused = this.handle;
    }

	
	

	/* END-USER-CODE */
}
files.HEIGHT = 830;
files.WIDTH = 1620;


class browser extends Phaser.Scene {
	
	constructor(handle, parent) {
	
		super(handle);
		this.handle = handle;
		this.parent = parent;
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		apps+=1;
		this.numApps = apps;
		this.cameras.main.setViewport(this.parent.x, this.parent.y, browser.WIDTH, browser.HEIGHT);
		this.cameras.main.setBackgroundColor("#000000");
		
		this.add.text(browser.WIDTH/2-60, 3, 'Silver', { fontFamily: 'Arial', fontSize: 20, color: '#00cf00' });
		this.close = this.add.image(browser.WIDTH-12, 12, "close").setScale(0.1, 0.1).setInteractive();
		this.close.on('pointerdown', function() {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}, this);
		
		this.bg = this.add.image(0, 25, "fileBg").setOrigin(0,0).setScale(20,20);
		
		this.hide = this.add.image(browser.WIDTH-35, 12, "hide").setScale(0.1, 0.1).setInteractive();
		this.hide.on('pointerdown', function() {
			this.scene.setVisible(false, this.handle);
		}, this);
		
		var otherScene = this.scene.get('Scene1');
		this.icon = otherScene.add.image(apps*72+30, 1050, "browser").setScale(0.55, 0.55).setInteractive();
		this.icon.on('pointerdown', function() {
			this.scene.setVisible(true, this.handle);
			this.scene.bringToTop();
		}, this)
		if(openPage != "") {
			if(openPage == "birdsite") {
				openPage = "";
				this.background = this.add.image(0, 25, 'birdsite').setOrigin(0,0);
				this.add.image(710, 650, 'login').setInteractive().on('pointerdown', function(){
						this.sound.play('mistake');
						this.add.image(0, 25, 'denied').setOrigin(0,0).setDepth(1000);
				}, this);
			} else if(openPage == "birdsiteRoot") {
				openPage = "";
				this.background = this.add.image(0, 25, 'birdsite').setOrigin(0,0);
				var usernameText = this.add.bitmapText(490,395, 'arial', "root", 25);
				var loginButton = this.add.image(710, 650, 'login').setInteractive().on('pointerdown', function(){
						usernameText.destroy();
						loginButton.destroy();
						if(mailNum == 9) {
							this.sound.play('discover');
							mailNum = 10;
						}
						this.add.image(0, 25, 'fileBg').setOrigin(0,0).setScale(20,20);
						
						this.add.bitmapText(720, 490,'arialBold', 'info.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "info";otherScene.createWindow(pdf);}, this);
						this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "info";otherScene.createWindow(pdf);}, this);
				}, this);
			} else if(openPage == "birdsiteRootKey") {
				openPage = "";
				this.background = this.add.image(0, 25, 'birdsite').setOrigin(0,0);
				var usernameText = this.add.bitmapText(490,395, 'arial', "root", 25);
				var passwordText = this.add.bitmapText(490,523, 'arial', "muPqwxHkVe", 25);
				var loginButton = this.add.image(710, 650, 'login').setInteractive().on('pointerdown', function(){
						usernameText.destroy();
						passwordText.destroy();
						loginButton.destroy();
						if(mailNum == 17) {
							mailNotifs -= 1;
							this.sound.play('discover');
							mailNum = 18;
						}
						this.add.image(0, 25, 'fileBg').setOrigin(0,0).setScale(20,20);
						
						this.add.bitmapText(720, 490,'arialBold', 'playme.wav', 30).setInteractive().on('pointerdown', function() {
							if(mailNum > 18) {
								// do nothing
							} else {
								playTTS = true;
							}
							}, this);
						this.add.image(650,500,'mp3').setInteractive().on('pointerdown', function() {
						if(mailNum > 18) {
							// do nothing
						} else {
							playTTS = true;
						}
						}, this);
				}, this);
			}
		} else {
		this.background = this.add.image(0, 25, 'searchBg').setOrigin(0,0);
		this.backButton = this.add.image(40, 60, 'back').setInteractive().on('pointerdown', function(){
			this.background.setTexture('searchBg');
			this.searchBar.setVisible(true);
			this.backButton.setVisible(false);
			this.privateLoginButton.setVisible(false); // hides the login button during mailNum == 5
			this.deleteOnBack.children.each(function(child) {
				child.destroy();
			});
		}, this).setVisible(false).setScale(0.8);
		
		// private birdsite stuff:
		this.privateLoginButton = this.add.image(750, 670, 'privateLogin').setVisible(false).setInteractive().on('pointerdown', function(){
			if(mailNum < 15) { // delete change depending on when it ends
				this.sound.play('mistake');
				this.privateLoginButton.setTexture("failedPrivateLogin");
				setTimeout(()=>{
					this.privateLoginButton.setTexture("privateLogin");
				}, 750)
			}
		}, this);
		
		this.searchBar = this.add.image(browser.WIDTH/2-20, browser.HEIGHT/2, 'search').setInteractive();
		
		this.searchOptionOne = this.add.image(browser.WIDTH/2-20, this.searchBar.y+60, 'searchOption').setScale(0.8,0.8).setInteractive().on('pointerover', function() {this.searchOptionOne.setTexture('searchOptionOver');}, this).on('pointerout', function() {this.searchOptionOne.setTexture('searchOption');}, this).setVisible(false);
		this.searchOptionOneText = this.add.bitmapText(browser.WIDTH/2-320, this.searchBar.y+47,"arialNumbers", "", 30).setVisible(false);
		
		this.searchOptionTwo = this.add.image(browser.WIDTH/2-20, this.searchOptionOne.y+60, 'searchOption').setScale(0.8,0.8).setInteractive().on('pointerover', function() {this.searchOptionTwo.setTexture('searchOptionOver');}, this).on('pointerout', function() {this.searchOptionTwo.setTexture('searchOption');}, this).setVisible(false);
		this.searchOptionTwoText = this.add.bitmapText(browser.WIDTH/2-320, this.searchOptionOne.y+47,"arial", "", 30).setVisible(false);
		
		this.searchOptionThree = this.add.image(browser.WIDTH/2-20, this.searchOptionTwo.y+60, 'searchOption').setScale(0.8,0.8).setInteractive().on('pointerover', function() {this.searchOptionThree.setTexture('searchOptionOver');}, this).on('pointerout', function() {this.searchOptionThree.setTexture('searchOption');}, this).setVisible(false);
		this.searchOptionThreeText = this.add.bitmapText(browser.WIDTH/2-320, this.searchOptionTwo.y+47,"arial", "", 30).setVisible(false);
		
		if(mailNum < 3 && mailNum > 0) { // 1 or 2
			this.searchOptionOneText.text = "What is the Bird group?";
			this.searchOptionTwoText.text = "What is the Urban Happiness Rating?";
			this.searchOptionThreeText.text = "What are government-run sports?";
		}
		if(mailNum == 5) {
			this.searchOptionOneText.text = "ip:33.21.230.19";
			this.searchOptionTwoText.text = "";
			this.searchOptionThreeText.text = "";
		}
		if(mailNum == 12) {
			this.searchOptionOneText.text = "birdGroup at noone.gov";
			this.searchOptionTwoText.text = "noone.gov";
		}
		
		this.deleteOnBack = this.add.group();
		
		this.searchBar.on('pointerdown', function() {
			if(focused == this.handle) {
				
			
			if(mailNum > 0) {
				if(mailNum < 3) {
					this.searchOptionOne.setVisible(true);
					this.searchOptionOneText.setVisible(true);
			
					this.searchOptionTwo.setVisible(true);
					this.searchOptionTwoText.setVisible(true);
			
					this.searchOptionThree.setVisible(true);
					this.searchOptionThreeText.setVisible(true);
				} else if (mailNum > 4) {
					if(mailNum == 5) { // only first option
						this.searchOptionOne.setVisible(true);
						this.searchOptionOneText.setVisible(true);
					} else if (mailNum >5 && mailNum < 12) {
						this.searchOptionOne.setVisible(false);
						this.searchOptionOneText.setVisible(false);
			
						this.searchOptionTwo.setVisible(false);
						this.searchOptionTwoText.setVisible(false);
			
						this.searchOptionThree.setVisible(false);
						this.searchOptionThreeText.setVisible(false);
					} else if(mailNum == 12) {
						this.searchOptionOne.setVisible(true);
						this.searchOptionOneText.setVisible(true);
			
						this.searchOptionTwo.setVisible(true);
						this.searchOptionTwoText.setVisible(true);
					} else if(mailNum == 13 || mailNum == 14){
						this.searchOptionOne.setVisible(false);
						this.searchOptionOneText.setVisible(false);
			
						this.searchOptionTwo.setVisible(false);
						this.searchOptionTwoText.setVisible(false);
			
						this.searchOptionThree.setVisible(false);
						this.searchOptionThreeText.setVisible(false);
					} else {
						this.searchOptionOne.setVisible(true);
						this.searchOptionOneText.setVisible(true);
			
						this.searchOptionTwo.setVisible(true);
						this.searchOptionTwoText.setVisible(true);
			
						this.searchOptionThree.setVisible(true);
						this.searchOptionThreeText.setVisible(true);
					}
					
				}
				
			}
			}
		}, this);
		
		// OPTIONS CLICK
		this.searchOptionOne.on('pointerdown', function() {
			if(mailNum == 1 || mailNum == 2 ) {
				if(mailNum == 1) {
					this.sound.play('discover');
					mailNum = 2;
				}
			
				this.background.setTexture('searchedBg');
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
				/* snippet */this.deleteOnBack.add(this.add.bitmapText(155,205,"arial","The Bird Group is a secretive government organization\nof which the public knows very little about. Our\ninformant tells us that this organization is a threat to\npublic safety. They also told us if the Bird Group\nlearned who was leaking us information, they would\nkill our informant.", 46).setOrigin(0,0));
				/* art. name */this.deleteOnBack.add(this.add.bitmapText(155, 505,"arialBold","Article: The government isn't telling us what they're doing-\nand it's an issue.", 40).setOrigin(0,0));
				/* website */this.deleteOnBack.add(this.add.bitmapText(155, 640,"arial","-TheTimes.org", 40).setOrigin(0,0));
			} else if(mailNum == 5) {
				this.background.setTexture("birdPrivateSite");
				this.privateLoginButton.setVisible(true);
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
			} else if (mailNum == 12) {
				this.searchOptionOne.setVisible(false); // these don't dissapear for some reason even though they should because of the code after this if statement but oh well
				this.searchOptionOneText.setVisible(false);
				this.searchOptionTwo.setVisible(false);
				this.searchOptionTwoText.setVisible(false);
			
				this.background.setTexture('searchedBg');
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
				/* snippet */this.deleteOnBack.add(this.add.bitmapText(155,205,"arial","Blue Birds are an incredibly beautiful and lively species\nthat help brighten up North America's grasslands.\nLuckily for us Blue Bird lovers, these pretty animals\nwon't be gone any time soon, seeing that they're at a\nLow Concern for extinction. ...\nQuestions? Email us at birds (at) animals.org", 46).setOrigin(0,0));
				/* art. name */this.deleteOnBack.add(this.add.bitmapText(155, 515,"arialBold", "Blue Birds, an Incredible Species", 60).setOrigin(0,0));
				/* website */this.deleteOnBack.add(this.add.bitmapText(155, 640,"arial","-animals.org", 40).setOrigin(0,0));
			}
			this.searchOptionOne.setVisible(false);
			this.searchOptionOneText.setVisible(false);
			
			this.searchOptionTwo.setVisible(false);
			this.searchOptionTwoText.setVisible(false);
			
			this.searchOptionThree.setVisible(false);
			this.searchOptionThreeText.setVisible(false);
		}, this);
		
		this.searchOptionTwo.on('pointerdown', function() {
			if(mailNum == 1 || mailNum == 2 ) {
				this.background.setTexture('searchedBg');
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
				/* snippet */this.deleteOnBack.add(this.add.bitmapText(155,205,"arial","The Urban Happiness Rating is the rating all\ncitizens living in urban housing give to the\ngovernment during the Census.", 55).setOrigin(0,0));
				/* art. name */this.deleteOnBack.add(this.add.bitmapText(155, 505,"arialBold","What is the Urban Happiness Rating (UHR)?", 50).setOrigin(0,0));
				/* website */this.deleteOnBack.add(this.add.bitmapText(155, 640,"arial","-census.gov", 40).setOrigin(0,0));
			} else if(mailNum == 12) {
				this.background.setTexture('searchedBg');
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
				/* snippet */this.deleteOnBack.add(this.add.bitmapText(155,205,"arial",'The Domain "noone.gov" is available! There\nis no current website under this domain! Our\ndomain experts are ready to help you buy\nthis domain at the drop of a pin! You can\nmessage us using the textbox at the bottom...', 54).setOrigin(0,0));
				/* art. name */this.deleteOnBack.add(this.add.bitmapText(155, 515,"arialBold","Is noone.gov Taken?", 60).setOrigin(0,0));
				/* website */this.deleteOnBack.add(this.add.bitmapText(155, 640,"arial","-ismydomaintaken.com", 40).setOrigin(0,0));
			}
			
			this.searchOptionOne.setVisible(false);
			this.searchOptionOneText.setVisible(false);
			
			this.searchOptionTwo.setVisible(false);
			this.searchOptionTwoText.setVisible(false);
			
			this.searchOptionThree.setVisible(false);
			this.searchOptionThreeText.setVisible(false);
		}, this);
		
		this.searchOptionThree.on('pointerdown', function() {
			if(mailNum == 1 || mailNum == 2 ) {
				this.background.setTexture('searchedBg');
				this.searchBar.setVisible(false);
				this.backButton.setVisible(true);
				/* snippet */this.deleteOnBack.add(this.add.bitmapText(155,205,"arial","Government-Run Sports are a fun way to\nenjoy your favorite sports without having to\nworry about league closures or change of\nteam ownership!", 55).setOrigin(0,0));
				/* art. name */this.deleteOnBack.add(this.add.bitmapText(155, 505,"arialBold","What are Government-Run Sports?", 60).setOrigin(0,0));
				/* website */this.deleteOnBack.add(this.add.bitmapText(155, 640,"arial","-sports.gov", 40).setOrigin(0,0));
			}
			this.searchOptionOne.setVisible(false);
			this.searchOptionOneText.setVisible(false);
			
			this.searchOptionTwo.setVisible(false);
			this.searchOptionTwoText.setVisible(false);
			
			this.searchOptionThree.setVisible(false);
			this.searchOptionThreeText.setVisible(false);
		}, this);
		} // if regular search end
		
	}
	
	update() {
		if(this.numApps > apps) {
			this.icon.x = apps*72+30;
		}
		
		if(sleeping == true) {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}
	}
	
	refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
		focused = this.handle;
    }


	/* END-USER-CODE */
}
browser.HEIGHT = 900;
browser.WIDTH = 1420;


class mail extends Phaser.Scene {
	
	constructor(handle, parent) {
	
		super(handle);
		this.handle = handle;
		this.parent = parent;
		
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		this.currentMailNotifs = mailNotifs;
		apps+=1;
		this.numApps = apps;
		this.cameras.main.setViewport(this.parent.x, this.parent.y, mail.WIDTH, mail.HEIGHT);
		this.cameras.main.setBackgroundColor("#000000");
		
		this.add.text(mail.WIDTH/2-60, 3, 'Mail', { fontFamily: 'Arial', fontSize: 20, color: '#00cf00' });
		this.close = this.add.image(mail.WIDTH-12, 12, "close").setScale(0.1, 0.1).setInteractive();
		this.close.on('pointerdown', function() {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}, this);
		
		this.bg = this.add.image(0, 25, "mailBg").setOrigin(0,0).setScale(1*(3.84), 1*(3.6));
		
		this.hide = this.add.image(mail.WIDTH-35, 12, "hide").setScale(0.1, 0.1).setInteractive();
		this.hide.on('pointerdown', function() {
			this.scene.setVisible(false, this.handle);
		}, this);
		
		var otherScene = this.scene.get('Scene1');
		this.icon = otherScene.add.image(apps*72+30, 1050, "mail").setScale(0.55, 0.55).setInteractive();
		this.icon.on('pointerdown', function() {
			this.scene.setVisible(true, this.handle);
			this.scene.bringToTop();
		}, this)
		
		
		
		var replyImage = this.add.image(650,600, 'back').setOrigin(0,0).setScale(0.9).setInteractive();
		var replyTxt = this.add.bitmapText(750, 622, 'arial', 'Reply', 25).setOrigin(0,0).setInteractive();
		replyImage.on('pointerdown', function() {
			this.reply();
		}, this);
		replyTxt.on('pointerdown', function() {
			this.reply();
		}, this);
		
		// EMAILS:
		/*1*/this.one = this.add.image(0,25,'bar').setScale(2.2, 3.75).setOrigin(0,0).setInteractive().setAlpha(0.00001).on('pointerdown', function() {
			if(focused == this.handle) {
			if(mailNum == 0 || mailNum == 1 || mailNum == 2 || mailNum == 3) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'We need your help', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "Hello. It's not easy to get a hold of you. I need you to look in to\nsomething that I've found. I know it will intrigue you. Attatched\nis a government-only census commentary, and some things\ndo not look right. You are the best sleuth that's not working for\nthe government. I have cut out the information you don't need.\nPlease investigate what that Bird group is doing.", 30));
					// attachment
					this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Census Commentary.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
					this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
			
			} else if(mailNum < 9 && mailNum > 3) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'John told me you are helping', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might come in handy. Attatched are my\nnotes, which is everything I've learned so far.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Click here to go to their public website.", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsite";
					otherScene.createWindow(browser);
				}, this));
				// attachment
				this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Bird-notes.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
				this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
			} else if(mailNum >= 9 && mailNum <= 13) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Username found for public website?', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "I was able to brute force a username to the Bird's public\nsite. The weird thing is that you don't need a password\nor anything, just a username. The username is 'root'.\nWhen I log in, it shows me a downloadable file. Hopefully\nyou can figure out what it is.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"This is the link to the site", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsiteRoot";
					otherScene.createWindow(browser);
				}, this));
					// no attachment
			} else if(mailNum >= 14 && mailNum <= 16) {
				if(mailNum == 14) {
					mailNum = 15;
				}
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Do not try to hack us.', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "You will be killed.", 30));
				// no attachment
			} else if(mailNum >= 17 && mailNum <= 20) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Access key to website?', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "I found a list of characters on their public website, might\nbe of interest.\nHere is the string:\nmuPqwxHkVe", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Here's the site link", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsiteRootKey";
					otherScene.createWindow(browser);
				}, this));
			}
			}
		}, this);
		
		/*2*/this.two = this.add.image(0, 284,'bar').setScale(2.2, 3.75).setOrigin(0,0).setInteractive().setAlpha(0.00001).on('pointerdown', function() {
			if(focused == this.handle) {
			if(mailNum < 9 && mailNum > 3) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'We need your help', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "Hello. It's not easy to get a hold of you. I need you to look in to\nsomething that I've found. I know it will intrigue you. Attatched\nis a government-only census commentary, and some things\ndo not look right. You are the best sleuth that's not working for\nthe government. I have cut out the information you don't need.\nPlease investigate what that Bird group is doing.", 30));
					// attachment
					this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Census Commentary.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
					this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
			} else if(mailNum >= 9 && mailNum <= 13) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'John told me you are helping', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might come in handy. Attatched are my\nnotes, which is everything I've learned so far.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Click here to go to their public website.", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsite";
					otherScene.createWindow(browser);
				}, this));
					// attachment
					this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Bird-notes.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
					this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
			} else if(mailNum >= 14 && mailNum <= 16) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Username found for public website?', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "I was able to brute force a username to the Bird's public\nsite. The weird thing is that you don't need a password\nor anything, just a username. The username is 'root'.\nWhen I log in, it shows me a downloadable file. Hopefully\nyou can figure out what it is.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"This is the link to the site", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsiteRoot";
					otherScene.createWindow(browser);
				}, this));
					// no attachment
			} else if(mailNum >= 17 && mailNum <= 20) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Do not try to hack us.', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "You will be killed.", 30));
				// no attachment
			}
			}
		}, this);
		
		/*3*/this.three = this.add.image(0, 543,'bar').setScale(2.2, 3.75).setOrigin(0,0).setInteractive().setAlpha(0.00001).on('pointerdown', function() {
			if(focused == this.handle) {
			if(mailNum >= 9 && mailNum <= 13) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'We need your help', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "Hello. It's not easy to get a hold of you. I need you to look in to\nsomething that I've found. I know it will intrigue you. Attatched\nis a government-only census commentary, and some things\ndo not look right. You are the best sleuth that's not working for\nthe government. I have cut out the information you don't need.\nPlease investigate what that Bird group is doing.", 30));
					// attachment
					this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Census Commentary.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
					this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
			} else if(mailNum >= 14 && mailNum <= 16) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'John told me you are helping', 60));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might come in handy. Attatched are my\nnotes, which is everything I've learned so far.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Click here to go to their public website.", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsite";
					otherScene.createWindow(browser);
				}, this));
					// attachment
					this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Bird-notes.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
					this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
			} else if(mailNum >= 17 && mailNum <= 20) {
				this.newText();
				this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Username found for public website?', 48));
				this.emailText.add(this.add.bitmapText(600, 140,'arial', "I was able to brute force a username to the Bird's public\nsite. The weird thing is that you don't need a password\nor anything, just a username. The username is 'root'.\nWhen I log in, it shows me a downloadable file. Hopefully\nyou can figure out what it is.", 30));
				this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"This is the link to the site", 30).setInteractive().on('pointerdown', function() {
					openPage = "birdsiteRoot";
					otherScene.createWindow(browser);
				}, this));
					// no attachment
			}
			}
		}, this);
		
		// left thing
		if(mailNum < 3) {
			this.add.bitmapText(5,30,'arialBold', 'John S', 60);
			this.add.bitmapText(5,100,'arialBold', 'We need your help', 25);
			this.add.bitmapText(5,140,'arial', "Hello. It's not easy to get a hold of you. I need you to\nlook in to something that I've found. I know it will\nintrigue you.", 20);
		} else if(mailNum < 9) {
			// first email
			this.add.bitmapText(5,30,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5,100,'arialBold', 'John told me you are helping', 25);
			this.add.bitmapText(5,140,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might...", 20);
			// second email
			this.add.bitmapText(5, 289,'arialBold', 'John S', 60);
			this.add.bitmapText(5, 359,'arialBold', 'We need your help', 25);
			this.add.bitmapText(5, 399,'arial', "Hello. It's not easy to get a hold of you. I need you to\nlook in to something that I've found. I know it will\nintrigue you.", 20);
		} else if(mailNum >= 9 && mailNum <= 13) {
			// first email
			this.add.bitmapText(5, 30,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5, 100,'arialBold', 'Username found for public website?', 25);
			this.add.bitmapText(5, 140,'arial', "I was able to brute force a username to the Bird's public\nwebsite. The weird thing is that you don't need a password\nor anything, just a username.", 20);
			// second email
			this.add.bitmapText(5, 289,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5, 359,'arialBold', 'John told me you are helping', 25);
			this.add.bitmapText(5, 399,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might...", 20);
			// third email
			this.add.bitmapText(5, 548,'arialBold', 'John S', 60);
			this.add.bitmapText(5, 618,'arialBold', 'We need your help', 25);
			this.add.bitmapText(5, 658,'arial', "Hello. It's not easy to get a hold of you. I need you to\nlook in to something that I've found. I know it will\nintrigue you.", 20);
		} else if(mailNum >= 14 && mailNum <= 16) {
			if(mailNum == 14) {
				mailNotifs -= 1;
				mailNum = 15;
			}
				// first email
			this.add.bitmapText(5, 30,'arialBold', 'Anonymous', 60);
			this.add.bitmapText(5, 100,'arialBold', 'Do not try to hack us.', 25);
			this.add.bitmapText(5, 140,'arial', "You will be killed.", 20);
			// second email
			this.add.bitmapText(5, 289,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5, 359,'arialBold', 'Username found for public website?', 25);
			this.add.bitmapText(5, 399,'arial', "I was able to brute force a username to the Bird's public\nwebsite. The weird thing is that you don't need a password\nor anything, just a username.", 20);
			// third email
			this.add.bitmapText(5, 548,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5, 618,'arialBold', 'John told me you are helping', 25);
			this.add.bitmapText(5, 658,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might...", 20);
		} else if(mailNum >= 17 && mailNum <= 20) {
				// first email
			this.add.bitmapText(5, 30,'arialBold', 'John S', 60);
			this.add.bitmapText(5, 100,'arialBold', 'Access key to website?', 25);
			this.add.bitmapText(5, 140,'arial', "I found a list of characters on their public website, might\nbe of interest.", 20);
			// second email
			this.add.bitmapText(5, 289,'arialBold', 'Anonymous', 60);
			this.add.bitmapText(5, 359,'arialBold', 'Do not try to hack us.', 25);
			this.add.bitmapText(5, 399,'arial', "You will be killed.", 20);
			// third email
			this.add.bitmapText(5, 548,'arialBold', 'Robert D', 60);
			this.add.bitmapText(5, 618,'arialBold', 'Username found for public website?', 25);
			this.add.bitmapText(5, 658,'arial', "I was able to brute force a username to the Bird's public\nwebsite. The weird thing is that you don't need a password\nor anything, just a username.", 20);
		}
		
		//message
		this.emailText = this.add.group();
		if(mailNum < 3) {
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'We need your help', 60));
			this.emailText.add(this.add.bitmapText(600, 140,'arial', "Hello. It's not easy to get a hold of you. I need you to look in to\nsomething that I've found. I know it will intrigue you. Attatched\nis a government-only census commentary, and some things\ndo not look right. You are the best sleuth that's not working for\nthe government. I have cut out the information you don't need.\nPlease investigate what that Bird group is doing.", 30));
			// attachment
			this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Census Commentary.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
			this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "census";otherScene.createWindow(pdf); if(mailNum == 0) {this.sound.play('discover');mailNum = 1; mailNotifs -= 1;}}, this));
		} else if(mailNum < 9) {
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'John told me you are helping', 60));
			this.emailText.add(this.add.bitmapText(600, 140,'arial', "John told me you are helping to figure out what the Bird\ngroup is doing. I was able to figure out their server's\nIP address. It might come in handy. Attatched are my\nnotes, which is everything I've learned so far.", 30));
			this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Click here to go to their public website.", 30).setInteractive().on('pointerdown', function() {
				openPage = "birdsite";
				otherScene.createWindow(browser);
			}, this));
			// attachment
			this.emailText.add(this.add.bitmapText(720, 490,'arialBold', 'Bird-notes.pdf', 30).setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
			this.emailText.add(this.add.image(650,500,'pdf').setInteractive().on('pointerdown', function() {pdfReading = "birdnotes";otherScene.createWindow(pdf); if(mailNum == 4) {this.sound.play('discover');mailNum = 5; mailNotifs -= 1;}}, this));
		} else if(mailNum >= 9 && mailNum <= 13) {
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Username found for public website?', 48));
			this.emailText.add(this.add.bitmapText(600, 140,'arial', "I was able to brute force a username to the Bird's public\nsite. The weird thing is that you don't need a password\nor anything, just a username. The username is 'root'.\nWhen I log in, it shows me a downloadable file. Hopefully\nyou can figure out what it is.", 30));
			this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"This is the link to the site", 30).setInteractive().on('pointerdown', function() {
				openPage = "birdsiteRoot";
				otherScene.createWindow(browser);
			}, this));
			// no attachment
		} else if(mailNum >= 14 && mailNum <= 16) {
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Do not try to hack us.', 48));
			this.emailText.add(this.add.bitmapText(600, 140,'arial', "You will be killed.", 30));
			// no attachment
		} else if(mailNum >= 17 && mailNum <= 20) {
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', 'Access key to website?', 48));
			this.emailText.add(this.add.bitmapText(600, 140,'arial', "I found a list of characters on their public website, might\nbe of interest.\nHere is the string:\nmuPqwxHkVe", 30));
			this.emailText.add(this.add.bitmapText(600, 350, 'arialBold',"Here's the site link", 30).setInteractive().on('pointerdown', function() {
				openPage = "birdsiteRootKey";
				otherScene.createWindow(browser);
			}, this));
			// no attachment
		}
		
		
		// sent thing
		this.sentDialog = this.add.image(1204, 585,'sent').setOrigin(0,0).setVisible(false);
		
	}
	
	update() {
		if(this.numApps > apps) {
			this.icon.x = apps*72+30;
		}
		
		if(sleeping == true) {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}
		
		if(focused != this.handle) {
			this.one.disableInteractive();
			this.two.disableInteractive();
			this.three.disableInteractive();
			
		} else {
			this.one.setInteractive();
			this.two.setInteractive();
			this.three.setInteractive();
		}
	}
	
	refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
		this.cameras.main.setBackgroundColor("#000000");
		focused = this.handle;
    }

	reply() {
		this.newText();
		if(mailNum == 0 || mailNum == 1 || mailNum == 3 || mailNum == 4 || mailNum == 6 || mailNum == 7 || mailNum == 8 || mailNum == 9 || mailNum == 10 || mailNum == 11 || mailNum == 12 || mailNum == 13 || mailNum == 14 || mailNum == 15 || mailNum == 16 || mailNum == 17) { // if it's one or zero
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', "I don't know enough to\nreply yet.", 60));
		}
		if(mailNum == 2) {
			mailNum = 3;
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', "Re: We need your help", 60));
			
			this.time.addEvent({
    			delay: 90,                // ms
    			callback: ()=>{this.sound.play('key' + Phaser.Math.Between(1,4));},
    			callbackScope: this,
    			repeat: 45
			});
			
			var currentText = this.add.bitmapText(600, 140,'arial', "I did some quick searching and found that the", 30);
			
			this.emailText.add(currentText);
			setTimeout(()=>{
				currentText.text += "\nBlue Group is a secret government division. I\n"
				setTimeout(()=>{
					currentText.text += "couldn't find much else about it though.";
					setTimeout(()=>{
						this.sentDialog.setVisible(true);
						setTimeout(()=>{
							this.sentDialog.setVisible(false);
						},900);
					}, 800);
					}, 1800);
			}, 1800);
			
		} else if(mailNum == 5) {
			mailNum = 6;
			this.emailText.add(this.add.bitmapText(600, 40,'arialBold', "Re: John told me you are helping", 50));
			
			this.time.addEvent({
    			delay: 90,                // ms
    			callback: ()=>{this.sound.play('key' + Phaser.Math.Between(1,4));},
    			callbackScope: this,
    			repeat: 20
			});
			
			var currentText = this.add.bitmapText(600, 140,'arial', "Thanks for the info.", 30);
			
			this.emailText.add(currentText);
			setTimeout(()=>{
				currentText.text += " I'm sure it will come in handy."
					setTimeout(()=>{
						this.sentDialog.setVisible(true);
						setTimeout(()=>{
							this.sentDialog.setVisible(false);
						},900);
					}, 800);
			}, 700);
			
			
			// sleep notification
			
		}
	}
	
	newText() {
		this.emailText.children.each(function(child) {
			child.destroy();
		});
	}


	/* END-USER-CODE */
}
mail.HEIGHT = 680;
mail.WIDTH = 1460;


class pdf extends Phaser.Scene {
	
	constructor(handle, parent) {
	
		super(handle);
		this.handle = handle;
		this.parent = parent;
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		apps+=1;
		this.numApps = apps;
		this.cameras.main.setViewport(this.parent.x, this.parent.y, pdf.WIDTH, pdf.HEIGHT);
		this.cameras.main.setBackgroundColor("#000000");
		this.add.image(0,0,'bar').setOrigin(0,0).setDepth(99).setScrollFactor(0).setScale(3,0.4);
		this.add.text(pdf.WIDTH/2-60, 3, 'PDF Reader', { fontFamily: 'Arial', fontSize: 20, color: '#00cf00' }).setDepth(100).setScrollFactor(0);
		this.close = this.add.image(pdf.WIDTH-12, 12, "close").setScale(0.1, 0.1).setInteractive().setDepth(100).setScrollFactor(0);
		this.close.on('pointerdown', function() {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}, this);
		
		this.bg = this.add.image(0, 25, "fileBg").setOrigin(0,0).setScale(20,20);
		
		this.hide = this.add.image(pdf.WIDTH-35, 12, "hide").setScale(0.1, 0.1).setInteractive().setDepth(100).setScrollFactor(0);
		this.hide.on('pointerdown', function() {
			this.scene.setVisible(false, this.handle);
		}, this);
		
		var otherScene = this.scene.get('Scene1');
		this.icon = otherScene.add.image(apps*72+30, 1050, "pdf").setScale(0.55, 0.55).setInteractive();
		this.icon.on('pointerdown', function() {
			this.scene.setVisible(true, this.handle);
			this.scene.bringToTop();
		}, this)
		
		this.maxScrollY = 825;
		
		//pdfReading = "birdnotes";
		if(pdfReading == "census") {
			var census = this.add.image(0,25, 'censusCommentary').setOrigin(0,0);
			this.scrollMultiplier = 1.37;
		}
		if(pdfReading == "birdnotes") {
			var birdNotes = this.add.image(0,25, 'birdNotes').setOrigin(0,0);
			this.scrollMultiplier = 0.04;
		} if (pdfReading == "info") {
			if(mailNum == 10) {
				mailNum = 11;
			}
			var birdNotes = this.add.image(0,25, 'info').setOrigin(0,0).setScale(0.95,1);
			this.scrollMultiplier = 0.04;
		} if (pdfReading == "info-data-check") {
			var infoDataCheck = this.add.image(0,25, 'info-data-check').setOrigin(0,0);
			this.scrollMultiplier = 0.04;
		} if (pdfReading == "birdGroup-Email-Diagnostics") {
			var birdGroupEmail = this.add.image(0,25, 'birdGroup-Email-Diagnostics').setOrigin(0,0);
			this.scrollMultiplier = 0.04;
		}
		
		if(pdfReading) {
			this.scrollBarPressed = false;
		this.scrollBar = this.add.image(pdf.WIDTH-14, 25, 'scrollBar').setOrigin(0,0).setInteractive().setScrollFactor(0);
		
		this.input.on('wheel', function(pointer, over, dx, dy, dz, event) {
			if(pointer.x < pdf.WIDTH+this.parent.x && pointer.x > this.parent.x && pointer.y < pdf.HEIGHT+this.parent.y && pointer.y > this.parent.y ) {
				this.scrollBar.y += dy;
			
				if(this.scrollBar.y<0) {
					this.scrollBar.y=0;
				}
				if(this.scrollBar.y>pdf.HEIGHT-200) {
					this.scrollBar.y=pdf.HEIGHT-200;
				}
				
				
				this.cameras.main.scrollY = this.scrollBar.y*this.scrollMultiplier;
				
			}
			
		}, this);
		
		this.scrollBar.on('pointerdown', function() {
			this.scrollBarPressed = true;
		}, this);
		
		this.input.on('pointerup', function() {
			this.scrollBarPressed = false;
		}, this);
		} else {
			this.add.bitmapText(125, pdf.HEIGHT/2, "arial", "You don't have any PDFs open.", 25)
		}
		

		
		
	}
	
	update() {
		if(this.numApps > apps) {
			this.icon.x = apps*72+30;
		}
		if(pdfReading) {
		if(this.input.activePointer.isDown) {
			//console.log(this.scrollBarPressed);
			if(this.scrollBarPressed) {
				this.scrollBar.y = this.input.activePointer.y-this.parent.y-60;
				if(this.scrollBar.y<0) {
					this.scrollBar.y=0;
				}
				if(this.scrollBar.y>pdf.HEIGHT-200) {
					this.scrollBar.y=pdf.HEIGHT-200;
				}
				
				this.cameras.main.scrollY = this.scrollBar.y*this.scrollMultiplier;;
				
				
				//console.log(this.input.activePointer.y);
			}
		}
		}
		
		if(sleeping == true) {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}
		
		if(focused != this.handle) {
			this.scrollBar.disableInteractive();
		} else {
			this.scrollBar.setInteractive();
			
		}
	}
	
	refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
		focused = this.handle;
    }


	/* END-USER-CODE */
}
pdf.HEIGHT = 800;
pdf.WIDTH = 600;




class terminal extends Phaser.Scene {
	
	constructor(handle, parent) {
	
		super(handle);
		this.handle = handle;
		this.parent = parent;
		
	}
	
	_create() {
	
		
	}
	
	/* START-USER-CODE */

	create() {
		this._create();
		
		apps+=1;
		this.cameras.main.setViewport(this.parent.x, this.parent.y, terminal.WIDTH, terminal.HEIGHT);
		this.cameras.main.setBackgroundColor("#000000");
		
		this.add.text(terminal.WIDTH/2-60, 3, 'Terminal', { fontFamily: 'Arial', fontSize: 20, color: '#00cf00' }).setScrollFactor(0);
		this.close = this.add.image(terminal.WIDTH-12, 12, "close").setScale(0.1, 0.1).setInteractive().setScrollFactor(0);
		this.close.on('pointerdown', function() {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}, this);
		
		this.bg = this.add.image(0, 25, "fileBg").setOrigin(0,0).setScale(20,20).setTintFill(0x000000).setScrollFactor(0);
		
		this.hide = this.add.image(terminal.WIDTH-35, 12, "hide").setScale(0.1, 0.1).setInteractive().setScrollFactor(0);
		this.hide.on('pointerdown', function() {
			this.scene.setVisible(false, this.handle);
		}, this);
		
		var otherScene = this.scene.get('Scene1');
		this.icon = otherScene.add.image(apps*72+30, 1050, "terminalIcon").setScale(0.55, 0.5).setInteractive();
		this.icon.on('pointerdown', function() {
			this.scene.setVisible(true, this.handle);
			this.scene.bringToTop();
		}, this);
		
		this.add.bitmapText(5, 30,"arialBold","Administrator: $Desktop ", 25).setTintFill(0x00cc44);
		this.cursor = this.add.image(320, 30, "bar").setScale(0.06,0.4).setOrigin(0,0).setTintFill(0x888888).setAlpha(0.5);
		
		this.typedText = this.add.bitmapText(320, 33, "console", "",25).setOrigin(0,0).setTintFill(0xffffff);
		if(mailNum < 11) {
			this.typedText.text = "The terminal can't be used right\nnow.";
			this.cursor.setPosition(380,56);
		} else if(mailNum == 11){
			var option1BG = this.add.image(310, 58, "searchOption").setScale(0.55,0.49).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
			option1BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option1BG.setTexture("searchOption");
			}).on('pointerdown', function() {
				this.optionOne.destroy();
				option1BG.destroy();
				this.typedText.text = "check hidden data on info.pdf";
				setTimeout(()=>{
					this.typedText.text += "\nChecking...";
					setTimeout(()=>{
						this.typedText.text += "\n1 Hidden String Found:";
						setTimeout(()=>{
							this.typedText.text += '\n"birdGroup@noone.gov"';
							setTimeout(()=>{
								this.typedText.text += '\ndone. Transcript created at\ninfo-data-check.pdf';
								mailNum = 12;
							}, 400);
						}, 200);
					}, 2500);
				}, 500);
			}, this);
			this.optionOne = this.add.bitmapText(320, 66, "console", "check hidden data on info.pdf",25).setOrigin(0,0).setTintFill(0xffffff);
			
			
			
		} else if(mailNum == 12) {
			var option1BG = this.add.image(310, 58, "searchOption").setScale(0.58,0.49).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
			option1BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option1BG.setTexture("searchOption");
			}).on('pointerdown', function() {
				this.optionOne.destroy();
				option1BG.destroy();
				this.typedText.text = "diagnostics birdGroup@noone.gov";
				setTimeout(()=>{
					this.typedText.text += "\nRunning diagnostics for email\nbirdGroup@noone.gov...";
					setTimeout(()=>{
						this.typedText.text += "\n\nEstimated Time Remaing: 15 secs\n\n[------------------]";
						setTimeout(()=>{
							this.typedText.text = "diagnostics birdGroup@noone.gov\nRunning diagnostics for email\nbirdGroup@noone.gov...\n\nEstimated Time Remaing: 10 secs\n\n[dddddd------------]";
							setTimeout(()=>{
								this.typedText.text = "diagnostics birdGroup@noone.gov\nRunning diagnostics for email\nbirdGroup@noone.gov...\n\nEstimated Time Remaing: 5 secs\n\n[dddddddddddd------]";
								setTimeout(()=>{
									this.typedText.text = "diagnostics birdGroup@noone.gov\nRunning diagnostics for email\nbirdGroup@noone.gov...\n\nEstimated Time Remaing: 0 secs\n\n[dddddddddddddddddd]";
									setTimeout(()=>{
										this.typedText.text += "\n\nDiagnostics complete\n\nRegistrant: C. Brenhart;\n\nSpoofed: False;";
										setTimeout(()=>{
											this.typedText.text += '\n\ndone. Transcript created at\nbirdGroup-Email-Diagnostics.pdf';
											mailNum = 13;
											this.cursor.setPosition(320, 435);
										}, 400);
									}, 200);
								}, 3000);
							}, 3000);
						}, 3000);
					}, 800);
				}, 500);
				
			}, this);
			this.optionOne = this.add.bitmapText(320, 66, "console", "diagnostics birdGroup@noone.gov",25).setOrigin(0,0).setTintFill(0xffffff);
		} else if(mailNum >= 13 && mailNum <= 17) { 
			this.typedText.text = "The terminal can't be used right\nnow.";
			this.cursor.setPosition(380,56);
		} else if(mailNum == 18){
			var option1BG = this.add.image(310, 58, "searchOption").setScale(0.58,0.49).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
			option1BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option1BG.setTexture("searchOption");
			}).on('pointerdown', function() {
				playTTS = false;
				this.optionOne.destroy();
				option1BG.destroy();
				this.typedText.text = "Audio stopped.";
				if(mailNum == 18) {
					mailNum = 19;
				}
				
				this.cursor.setPosition(530, 30);
			}, this);
			this.optionOne = this.add.bitmapText(320, 66, "console", "stop audio",25).setOrigin(0,0).setTintFill(0xffffff);
		} else {
			var option1BG = this.add.image(310, 60, "searchOption").setScale(0.3,0.45).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
			option1BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option1BG.setTexture("searchOption");
			});
			this.optionOne = this.add.bitmapText(320, 66, "console", "option 1>",25).setOrigin(0,0).setTintFill(0xffffff);
		
			var option2BG = this.add.image(310, 93, "searchOption").setScale(0.3,0.45).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
				option2BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option2BG.setTexture("searchOption");
			});
			this.optionTwo = this.add.bitmapText(320, 99, "console", "option 2>",25).setOrigin(0,0).setTintFill(0xffffff);
		
			var option3BG = this.add.image(310, 125, "searchOption").setScale(0.3,0.45).setOrigin(0,0).setTint(0xaaaaaa).setInteractive().on('pointerover', function() {
				option3BG.setTexture("searchOptionOver");
			}).on('pointerout', function () {
				option3BG.setTexture("searchOption");
			});
			this.optionThree = this.add.bitmapText(320, 132, "console", "option 3>",25).setOrigin(0,0).setTintFill(0xffffff);
		}
		
		
	}
	
	update() {
		if(sleeping == true) {
			this.icon.destroy();
			apps-=1;
			this.scene.remove(this.handle);
			this.parent.win.destroy();
		}
		
		if(this.numApps > apps) {
			this.icon.x = apps*72+30;
		}
	}
	
	refresh ()
    {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);
        this.scene.bringToTop();
		focused = this.handle;
    }

	
	

	/* END-USER-CODE */
}
terminal.HEIGHT = 650;
terminal.WIDTH = 830;