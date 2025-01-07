class BuyGun extends Phaser.Scene {

	constructor() {
		super({key:'buyGun'});
	}
	// No Preload; load in other files
	create() {
	    this.cameras.main.setBackgroundColor(0x000000);
	    this.cameras.main.setViewport(32, 32, 836, 636);
	    var chosenNewGun = chosenGun;
	    var toAdd = 0;
	    // Defaults
	    var close = this.add.text(18, -12, 'X', {fontSize: '130px', fill: '#fff'}).setInteractive();
	    close.on('pointerdown', ()=>{
	        killAll();
	        this.scene.resume('gameScene');
	        this.scene.sleep('buyGun'); // Sleeps the menu (Not remove because remove removes instance)
	    });
	    this.add.image(418, 318, "buyGunBG");
	    var info = this.add.text(50, 132, 'Name', {fontSize: '20px', fill: '#000', align: 'center' });
	    var desc = this.add.text(60, 350, 'Description', {fontSize: '24px', fill: '#000', align: 'center' });
	    var img = this.add.image(140, 240, 'guns').setScale(1.4);
	    var pickUpBtn = this.add.sprite(158, 521, "pickUp").setInteractive();
	    var allText = this.add.group();
	    
	    
	    
	    pickUpBtn.on('pointerdown', () => { // PICK UP BUTTON
	        if(toAdd !== 0) {
	        if(mission == 2) {
	            missionComplete(2, this);
	        }
	        clothesShoppingCartTotal += toAdd;
	        if(!thingsInCart) {
	            thingsInCart = true;
	        }
	        chosenGun = chosenNewGun;
	        gun.setTexture('guns', chosenGun);
	        // CHANGE GUN PROPERTIES:
	        if(toAdd == 200) {
	            gunDelay = 400;
	            gunDamage = 12;
	        } else if(toAdd == 400) {
	            gunDelay = 225;
	            gunDamage = 6;
	        } else if(toAdd == 1500) {
	            gunDelay = 400;
	            gunDamage = 15;
	        } else if(toAdd == 10000) {
	            gunDelay = 100;
	            gunDamage = 1;
	        } else if(toAdd == 8000) {
	            gunDelay = 1000;
	            gunDamage = 6;
	        //} else if(toAdd == 10) {
	            //gunDelay = 200;
	            //gunDamage = 5;
	        } else if(toAdd == 20000) {
	            gunDelay = 2000;
	            gunDamage = 19;
	        }
	        killAll();
	        this.scene.resume('gameScene');
	        this.scene.sleep('buyGun'); // Sleeps the menu (Not remove because remove removes instance)
	        } else {
	            alert("No Buyable Item Is Selected!");
	        }
	    });
	    
	    
	    
	    
	    // GUNS
	    var six = this.add.image(400,160, 'guns').setTexture('guns', 1).setInteractive();
	    allText.add(this.add.text(368, 200, '$200', {fontSize: '24px', fill: '#000', align:'center'}));
	    six.on('pointerdown', () => {
	        info.setText("Six Shooter");
	        desc.setText("Speed: 600\nDamage: 12\n$200"); // one in eight chance (20-12=8)
	        img.setTexture('guns', 1);
	        chosenNewGun = 1;
	        toAdd = 200;
	    });
	    
	    var uzi = this.add.image(512,160, 'guns').setTexture('guns', 2).setInteractive();
	    allText.add(this.add.text(480, 200, '$400', {fontSize: '24px', fill: '#000', align:'center'}));
	    uzi.on('pointerdown', () => {
	        info.setText("Uzi");
	        desc.setText("Speed: 775\nDamage: 6\n$400"); // one in fourteen chance
	        img.setTexture('guns', 2);
	        chosenNewGun = 2;
	        toAdd = 400;
	    });
	    
	    var handgun = this.add.image(630,160, 'guns').setTexture('guns', 4).setInteractive();
	    allText.add(this.add.text(592, 200, '$1500', {fontSize: '24px', fill: '#000', align:'center'}));
	    handgun.on('pointerdown', () => {
	        info.setText("Handgun");
	        desc.setText("Speed: 600\nDamage: 15\n$1500"); // one in six
	        img.setTexture('guns', 4);
	        chosenNewGun = 4;
	        toAdd = 1500;
	    });
	    
	    var tommy = this.add.image(750,160, 'guns').setTexture('guns', 5).setInteractive();
	    allText.add(this.add.text(704, 200, '$10,000', {fontSize: '24px', fill: '#000', align:'center'}));
	    tommy.on('pointerdown', () => {
	        info.setText("Tommy Gun");
	        desc.setText("Speed: 900\nDamage: 1\n$10,000");// one in 40
	        img.setTexture('guns', 5);
	        chosenNewGun = 5;
	        toAdd = 10000;
	    });
	    
	    var shotgun = this.add.image(400,272, 'guns').setTexture('guns', 9).setInteractive();
	    allText.add(this.add.text(368, 312, '$8000', {fontSize: '24px', fill: '#000', align:'center'}));
	    shotgun.on('pointerdown', () => {
	        info.setText("Shotgun");
	        desc.setText("Speed: 50\nDamage: 5\n$8000\nBonus:\nBurst Shot");
	        img.setTexture('guns', 9);
	        chosenNewGun = 9;
	        toAdd = 8000;
	    });
	    
	    var ak = this.add.image(512,272, 'guns').setTexture('guns', 10).setInteractive();
	    allText.add(this.add.text(490, 312, 'OOS', {fontSize: '24px', fill: '#000', align:'center'}));
	    ak.on('pointerdown', () => {
	        info.setText("AK-47");
	        desc.setText("Speed: 800\nDamage: 5\nOut Of Stock");
	        img.setTexture('guns', 10);
	        toAdd = 0;
	    });
	    
	    var sniper = this.add.image(644,272, 'guns').setTexture('guns', 11).setInteractive();
	    allText.add(this.add.text(592, 312, '$20,000', {fontSize: '24px', fill: '#000', align:'center'}));
	    sniper.on('pointerdown', () => {
	        info.setText("Sniper");
	        desc.setText("Speed: 0\nDamage: MAX\n$20,000");
	        img.setTexture('guns', 11);
	        chosenNewGun = 11;
	        toAdd = 20000;
	    });
	    
	    function killAll() {
		    close.destroy();
		    info.destroy();
		    desc.destroy();
		    img.destroy();
		    pickUpBtn.destroy();
		    
		    six.destroy();
		    uzi.destroy();
		    handgun.destroy();
		    tommy.destroy();
		    shotgun.destroy();
		    ak.destroy();
		    sniper.destroy();
		    
		    allText.children.each(function(child){
		        child.destroy();
		    });
		    allText.destroy();
		}
	}
	
	// No update; just use event listeners
	/*
	400, 512, 624, 736 = img x
	368, 480, 592, 704 = text x
	+112 in x
	gunDelay = 200
	speed = 1000-ms
	damage = 20 - randomChanceTop
	
	handgun.on('pointerdown', () => {
	        info.setText("");
	        desc.seText("");
	        img.setTexture('guns', 1);
	});
	*/
}
export default BuyGun;