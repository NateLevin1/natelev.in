class MissionScene extends Phaser.Scene {

	constructor() {
		super({key:'missionScene'});
	}
	// No Preload; load in other files
	create() {
	    this.cameras.main.setBackgroundColor(0x000000);
	    this.cameras.main.setViewport(32, 32, 836, 636);
	    
	    var close = this.add.text(18, -12, 'X', {fontSize: '130px', fill: '#fff'}).setInteractive();
	    close.on('pointerdown', ()=>{
	        this.scene.resume('gameScene');
	        this.scene.sleep('missionScene'); // Sleeps the menu (Not remove because remove removes instance)
	    });
	    
	    this.add.image(418, 318, "missionBG");
	    // INFO TEXT:
	    var info = this.add.text(20, 130, 'Info', {fontSize: '20px', fill: '#000', align: 'center' });
	    var desc = this.add.text(10, 350, 'Desc', {fontSize: '24px', fill: '#000', align: 'center' });
	    
	    if(mission === 0) {
	        showKiller();
	    } else if(mission == 1) {
	        showVisitApartment();
	    } else if(mission == 2) {
	        showBuyGun();
	    }
	    
	    // MISSIONS:
	    var killer = this.add.text(530, 125, 'Killer!', {fontSize: '24px', fill: '#000'}).setInteractive();
	    killer.on('pointerdown', showKiller);
	    
	    var visitApt = this.add.text(450, 175, 'Visit Your Apartment', {fontSize: '24px', fill: '#000'}).setInteractive();
	    visitApt.on('pointerdown', showVisitApartment);
	    
	    var buyGun = this.add.text(515, 225, 'Buy a Gun', {fontSize: '24px', fill: '#000'}).setInteractive();
	    buyGun.on('pointerdown', showBuyGun);
	    
	    function showKiller() {
	        mission = 0;
	        missionText.setText(missions[mission]);
	        info.setText("Killer!");
	        desc.setText("Kill any person.\n Warning: Your stars\nwill increase and\nthe police will\ngo after you!");
	    }
	    function showVisitApartment() {
	        mission = 1;
	        missionText.setText(missions[mission]);
	        info.setText("Visit Your Apartment!");
	        desc.setText("Go to your\napartment. It is\nlocated upstairs in \nthe Rich People Flats\nbuilding.");
	    }
	    function showBuyGun() {
	        mission = 2;
	        missionText.setText(missions[mission]);
	        info.setText("Buy a Gun!");
	        desc.setText("Go to the Clothes\nN Stuff shop and\nbuy a new gun.");
	    }
	}
	
	// No update; just use event listeners
}
export default MissionScene;