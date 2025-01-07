class BuyClothes extends Phaser.Scene {

	constructor() {
		super({key:'buyClothes'});
	}
	// No Preload; load in other files
	create() {
	    this.cameras.main.setBackgroundColor(0x000000);
	    this.cameras.main.setViewport(32, 32, 836, 636);
	    var toAdd = 0;
	    // Defaults
	    var close = this.add.text(18, -12, 'X', {fontSize: '130px', fill: '#fff'}).setInteractive();
	    close.on('pointerdown', ()=>{
	        killAll();
	        this.scene.resume('gameScene');
	        this.scene.sleep('buyClothes'); // Sleeps the menu (Not remove because remove removes instance)
	    });
	    this.add.image(418, 318, "buyClothesBG");
	    var info = this.add.text(50, 132, 'Name', {fontSize: '20px', fill: '#000', align: 'center' });
	    var img = this.add.image(155, 320, 'wallY').setScale(3);
	    var pickUpBtn = this.add.sprite(158, 521, "pickUp").setInteractive();
	    var allText = this.add.group();
	    
	    
	    
	    pickUpBtn.on('pointerdown', () => { // PICK UP BUTTON
	        if(toAdd !== 0) {
	            clothesShoppingCartTotal += toAdd;
	            if(!thingsInCart) {
	                thingsInCart = true;
	            }
	            // CHANGE CLOTHES:
	            if(toAdd == 200) {
	                player.setTexture('playerImg');
	            } else if(toAdd == 1000) {
	                player.setTexture('policeKnockoffShirt');
	            } else if(toAdd == 100) {
	                player.setTexture('citizenImg1');
	            } else if(toAdd == 2000) {
	                player.setTexture('playerImgCamo');
	            } else if(toAdd == 500) {
	                player.setTexture('playerImgRed');
	            } else if(toAdd == 400) {
	                player.setTexture('playerImgGreen');
	            }
	            killAll();
	            this.scene.resume('gameScene');
	            this.scene.sleep('buyClothes'); // Sleeps the menu (Not remove because remove removes instance)
	        } else {
	            alert("No Buyable Item Is Selected!");
	        }
	    });
	    
	   
	    // CLOTHES
	    var reg = this.add.image(400,160, 'playerImg').setInteractive();
	    allText.add(this.add.text(368, 200, '$200', {fontSize: '24px', fill: '#000', align:'center'}));
	    reg.on('pointerdown', () => {
	        info.setText("Default Outfit");
	        img.setTexture('playerImg');
	        toAdd = 200;
	    });
	    
	    var po = this.add.image(512,160, 'policeKnockoffShirt').setInteractive();
	    allText.add(this.add.text(480, 200, '$1000', {fontSize: '24px', fill: '#000', align:'center'}));
	    po.on('pointerdown', () => {
	        info.setText("Police Costume");
	        img.setTexture('policeKnockoffShirt');
	        toAdd = 1000;
	    });
	    
	    var citClothes = this.add.image(624,160, 'citizenImg1').setInteractive();
	    allText.add(this.add.text(592, 200, '$100', {fontSize: '24px', fill: '#000', align:'center'}));
	    citClothes.on('pointerdown', () => {
	        info.setText("Layperson Clothing");
	        img.setTexture('citizenImg1');
	        toAdd = 100;
	    });
	    
	    var camo = this.add.image(740,160, 'playerImgCamo').setInteractive();
	    allText.add(this.add.text(704, 200, '$2000', {fontSize: '24px', fill: '#000', align:'center'}));
	    camo.on('pointerdown', () => {
	        info.setText("Camo Suit");
	        img.setTexture('playerImgCamo');
	        toAdd = 2000;
	    });
	    
	    var red = this.add.image(400,272, 'playerImgRed').setInteractive();
	    allText.add(this.add.text(368, 312, '$500', {fontSize: '24px', fill: '#000', align:'center'}));
	    red.on('pointerdown', () => {
	        info.setText("Blood-Marked");
	        img.setTexture('playerImgRed');
	        toAdd = 500;
	    });
	    
	    var green = this.add.image(512,272, 'playerImgGreen').setInteractive();
	    allText.add(this.add.text(480, 312, '$400', {fontSize: '24px', fill: '#000', align:'center'}));
	    green.on('pointerdown', () => {
	        info.setText("Green Shirt");
	        img.setTexture('playerImgGreen');
	        toAdd = 400;
	    });
	    
	    /*var sniper = this.add.image(644,272, 'guns').setInteractive();
	    this.add.text(592, 312, '$20,000', {fontSize: '24px', fill: '#000', align:'center'});
	    sniper.on('pointerdown', () => {
	        info.setText("Sniper");
	        img.setTexture('guns', 11);
	        toAdd = 20000;
	    });*/
	    
	    function killAll() {
		    close.destroy();
		    info.destroy();
		    img.destroy();
		    pickUpBtn.destroy();
		    
		    reg.destroy();
		    po.destroy();
		    citClothes.destroy();
		    camo.destroy();
		    red.destroy();
		    green.destroy();
		    
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
	*/
}
export default BuyClothes;