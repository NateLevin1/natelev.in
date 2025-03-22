
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "Secret Plans",
    "width": 1920,
    "height": 1080,
    "type": Phaser.AUTO,
    "backgroundColor": "#000",
    "parent": "game-container",
    "render": {"pixelArt": false},
    "physics": {"default": "arcade"},
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
