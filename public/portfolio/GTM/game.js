import TitleScene from "./titleScene.js";
import GameScene from "./gameScene.js";
import MissionScene from "./missionScene.js";
import BuyGun from "./buy/buyGun.js";
import BuyClothes from "./buy/buyClothes.js";
import Checkout from "./buy/checkout.js";

// Our game scene
var gameScene = new GameScene();
var titleScene = new TitleScene();
var missionScene = new MissionScene();
var buyGun = new BuyGun();
var buyClothes = new BuyClothes();
var checkout = new Checkout();

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
    autoCenter: Phaser.Scale.CENTER_BOTH,
    //autoFocus: true
};
game = new Phaser.Game(config);

// load scenes
game.scene.add("titleScene", titleScene);
game.scene.add("game", gameScene);
game.scene.add("missionScene", missionScene);
game.scene.add("buyGun", buyGun);
game.scene.add("buyClothes", buyClothes);
game.scene.add("checkout", checkout);

// start title
game.scene.start("titleScene");
