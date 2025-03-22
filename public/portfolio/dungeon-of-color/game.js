import TitleScene from "./titleScene.js";
import GameScene from "./gameScene.js";
import End from "./end.js";
import Instructions from "./instructions.js";

// Game scene variables
var gameScene = new GameScene();
var titleScene = new TitleScene();
var end = new End();
var instructions = new Instructions();

//* Game scene */
config = {
    type: Phaser.AUTO,
    width: 685,
    height: 730,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    autoCenter: Phaser.Scale.CENTER_BOTH,
    //autoFocus: true
};
game = new Phaser.Game(config);

// load scenes
game.scene.add("titleScene", titleScene);
game.scene.add("game", gameScene);
game.scene.add("end", end);
game.scene.add("instructions", instructions);

// start title
game.scene.start("titleScene");
