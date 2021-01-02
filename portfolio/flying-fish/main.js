
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "Springer",
    "width": 750,
    "height": 1000,
    "type": Phaser.AUTO,
    "backgroundColor": "#b3ecff",
    "parent": "game-container",
    "physics": {"default": "matter", matter:{debug: false}},
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
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
