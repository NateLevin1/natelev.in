class Checkout extends Phaser.Scene {

	constructor() {
		super({key:'checkout'});
	}
	// No Preload; load in other files
	create() {
	    this.cameras.main.setBackgroundColor(0x000000);
	    this.cameras.main.setViewport(32, 32, 836, 636);
	    // Defaults
	    var close = this.add.text(18, -12, 'X', {fontSize: '130px', fill: '#fff'}).setInteractive();
	    close.on('pointerdown', ()=>{
	        killAll();
	        this.scene.resume('gameScene');
	        this.scene.sleep('checkout'); // Sleeps the menu (Not remove because remove removes instance)
	    });
	    this.add.image(418, 318, "checkoutBG");
	    
	    var price = this.add.text(450, 260, clothesShoppingCartTotal, {fontSize: '80px', fill: '#000', align: 'center' });
	    if(checkoutLocation == 'clothes') {
	        price.setText(clothesShoppingCartTotal);
	    } else if (checkoutLocation == 'chinese') {
	        price.setText(chineseShoppingCartTotal);
	    }     
	   
		var payBtn = this.add.image(579,527, 'pay').setInteractive();
		payBtn.on('pointerdown', () => {
		    if(checkoutLocation == 'clothes') { // CLOTHES
		        if(clothesShoppingCartTotal <= playerMoney) {
		            playerMoney -= clothesShoppingCartTotal;
		            moneyText.setText(playerMoney);
	                clothesShoppingCartTotal = 0;
	                thingsInCart = false;
	                killAll();
	                this.scene.resume('gameScene');
	                this.scene.sleep('checkout'); // Sleeps the menu (Not remove because remove removes instance)
		        } else {
		            alert("You don't have enough money to buy these products! To leave, you'll have to go into debt. Might I suggest a Predatory Loan™?");
		        }
		    } else if (checkoutLocation == 'chinese') { // CHINESE
		        if(chineseShoppingCartTotal <= playerMoney) {
		            playerMoney -= chineseShoppingCartTotal;
		            moneyText.setText(playerMoney);
	                chineseShoppingCartTotal = 0;
	                thingsInCart = false;
	                killAll();
	                this.scene.resume('gameScene');
	                this.scene.sleep('checkout'); // Sleeps the menu (Not remove because remove removes instance)
		        } else {
		            alert("You don't have enough money to buy these products! To leave, you'll have to go into debt. Might I suggest a Predatory Loan™?");
		        }
		    }
		});
		
		
		
		var predatoryBtn = this.add.image(153,533, 'buyPredatory').setInteractive();
		predatoryBtn.on('pointerdown', ()=> {
		    if(confirm("Are you sure you want to buy a Predatory Loan™? It will be worth $1000.")) {
		        predatoryLoanAmount += 1000;
		        playerMoney += 1000;
		        moneyText.setText(playerMoney);
		    }
		});
		
		function killAll() {
		    close.destroy();
		    price.destroy();
		    payBtn.destroy();
		}
		
	    
	}
	
	// No update; just use event listeners
}
export default Checkout;