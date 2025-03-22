import TitleScene from "./titleScene.js";
import GameScene from "./gameScene.js";
import End from "./end.js";

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var end = new End();

//* Game scene */
config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    parent: gameDiv,
    dom: {
        createContainer: true,
    },
    autoCenter: Phaser.Scale.CENTER_BOTH,
    //autoFocus: true
};
game = new Phaser.Game(config);

// load scenes
game.scene.add("end", end);
game.scene.add("titleScene", titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start("titleScene");
