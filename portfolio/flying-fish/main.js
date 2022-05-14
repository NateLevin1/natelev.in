
window.addEventListener('load', function() {
	const game = new Phaser.Game({
        title: "Flying Fish",
        width: 750,
        height: 1000,
        type: Phaser.AUTO,
        backgroundColor: "#b3ecff",
        parent: "game-container",
        physics: {
            default: "matter",
            matter:{
                debug: false
            }
        },
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        dom: {
            createContainer: true
        }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
	}

	create() {
		this.scene.start("Scene1");
	}

}
