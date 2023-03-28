class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "gameScene" });
    }

    init() {}

    preload() {
        // LOADING SCREEN
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        // Text
        var loadingText = this.make.text({
            x: 450,
            y: 250,
            text: "Loading...",
            style: {
                font: "40px monospace",
                fill: "#ffffff",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: 430,
            y: 295,
            text: "0%",
            style: {
                font: "18px monospace",
                fill: "#ffffff",
            },
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: 430,
            y: 395,
            text: "",
            style: {
                font: "18px monospace",
                fill: "#ffffff",
            },
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on("progress", function (value) {
            progressBar.clear();
            if (value > 0.5) {
                progressBar.fillStyle(0x00ff00, 1);
            } else {
                progressBar.fillStyle(0xffffff, 1);
            }
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + "%");
        });

        this.load.on("fileprogress", function (file) {
            assetText.setText("Loading asset: " + file.src);
        });

        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // Joystick
        //this.load.plugin('rexVirtualJoystick', 'rexvirtualjoystickplugin.min.js', true);
        var url;
        url = "./rexvirtualjoystickplugin.min.js";
        this.load.plugin("rexvirtualjoystickplugin", url, true);

        // City
        this.load.image("city1", "assets/city/png/city1.png");
        this.load.image("city2", "assets/city/png/city2.png");
        this.load.image("city3", "assets/city/png/city3.png");
        this.load.image("city4", "assets/city/png/city4.png");
        this.load.image("city5", "assets/city/png/city5.png");
        this.load.image("city6", "assets/city/png/city6.png");
        this.load.image("city7", "assets/city/png/city7.png");
        this.load.image("city8", "assets/city/png/city8.png");
        // Invisible walls
        this.load.image("wallY", "assets/wallY.png");
        this.load.image("wallX", "assets/wallX.png");
        // End City
        this.load.image("playerImg", "assets/player.png");
        this.load.image("citizenImg1", "assets/citizen.png");
        this.load.image("bloodImg", "assets/blood.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("carImg", "assets/car1.png");
        this.load.image("fencing", "assets/fencing.png");
        this.load.image("brickfencing", "assets/brickfencing.png");
        this.load.image("policeRoom", "assets/policeRoom.png");
        this.load.image(
            "policeDesk1",
            "assets/buildingMaterials/police/policeDesk/policeDesk1.png"
        );
        this.load.image(
            "policeDesk2",
            "assets/buildingMaterials/police/policeDesk/policeDesk2.png"
        );
        this.load.image(
            "policeDesk3",
            "assets/buildingMaterials/police/policeDesk/policeDesk3.png"
        );
        this.load.image("policeman", "assets/policeman.png");
        this.load.image("starFilled", "assets/starFilled.png");
        this.load.image("starUnfilled", "assets/starUnfilled.png");
        this.load.image("money", "assets/money.png");
        this.load.image("info", "assets/infoBlock.png");
        this.load.image("policeCar", "assets/policeCar.png");
        this.load.image("eBtn", "assets/eBtn.png");
        this.load.image(
            "apartmentFloorOne",
            "assets/buildingMaterials/apartment/apartmentBackground.png"
        );
        this.load.image(
            "chairYellow",
            "assets/buildingMaterials/apartment/chair.png"
        );
        this.load.image(
            "chairRed",
            "assets/buildingMaterials/apartment/chairRed.png"
        );
        this.load.image(
            "chairBlue",
            "assets/buildingMaterials/apartment/chairBlue.png"
        );
        this.load.image(
            "apartmentStairs",
            "assets/buildingMaterials/apartment/stairs.png"
        );
        this.load.image("bed", "assets/buildingMaterials/apartment/bed.png");
        this.load.image("desk", "assets/buildingMaterials/apartment/desk.png");
        this.load.image(
            "computerDesk",
            "assets/buildingMaterials/apartment/computerDesk.png"
        );
        this.load.image(
            "clothesStuffBG",
            "assets/buildingMaterials/clothes/clothesStuffBG.png"
        );
        this.load.image(
            "gunRack",
            "assets/buildingMaterials/clothes/gunRack.png"
        );
        this.load.image(
            "cashierDesk",
            "assets/buildingMaterials/clothes/cashierDesk.png"
        );
        this.load.image(
            "regStand",
            "assets/buildingMaterials/clothes/default.png"
        );
        this.load.image(
            "citStand",
            "assets/buildingMaterials/clothes/citizenStand.png"
        );
        this.load.image(
            "poStand",
            "assets/buildingMaterials/clothes/policeKnockoff.png"
        );
        this.load.image(
            "poKnockoffShirt",
            "assets/buildingMaterials/clothes/policeKnockoffShirt.png"
        );
        this.load.image(
            "playerImgCamo",
            "assets/buildingMaterials/clothes/camo.png"
        );
        this.load.image(
            "playerImgRed",
            "assets/buildingMaterials/clothes/red.png"
        );
        this.load.image(
            "playerImgGreen",
            "assets/buildingMaterials/clothes/green.png"
        );
        this.load.image(
            "greenStand",
            "assets/buildingMaterials/clothes/greenStand.png"
        );
        this.load.image(
            "redStand",
            "assets/buildingMaterials/clothes/redStand.png"
        );
        this.load.image(
            "camoStand",
            "assets/buildingMaterials/clothes/camoStand.png"
        );
        this.load.image("chineseRestRoom", "assets/chineseRestRoom.png");
        // UI
        this.load.image("music", "assets/ui/music.png");
        this.load.image("next", "assets/ui/next.png");
        this.load.image("previous", "assets/ui/previous.png");
        this.load.image("missions", "assets/ui/wrench.png");
        this.load.image("missionsW", "assets/ui/wrenchW.png");
        // Missions
        this.load.image("killerM", "assets/missions/killer.png");
        this.load.image("gunBuyM", "assets/missions/buyAGun.png");
        this.load.image("buyFoodM", "assets/missions/buyFood.png");
        this.load.image("visitAptM", "assets/missions/visitApt.png");

        this.load.spritesheet("guns", "assets/g-spritesheet.png", {
            frameWidth: 96,
            frameHeight: 64,
        });
        this.load.spritesheet("targetImg", "assets/targetspritesheet.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.audio("shoot", "audio/gunshot.mp3");
        this.load.audio("cash", "audio/cash.mp3");
        this.load.audio("honk", "audio/horn.mp3");
    }

    create() {
        this.add.image(1032, -330, "city1");
        this.add.image(3080, -330, "city2");
        this.add.image(5128, -330, "city3");
        this.add.image(7176, -330, "city4");
        this.add.image(7176, 1718, "city5");
        this.add.image(5128, 1718, "city6");
        this.add.image(7176, 3766, "city7");
        this.add.image(7176, 5814, "city8");

        player = this.physics.add.sprite(160, 600, "playerImg").setDepth(100);

        //player.setCollideWorldBounds(true);
        // MENU ITEMS           MENU ITEMS          MENU ITEMS          MENU ITEMS          MENU ITEMS
        star1 = this.add
            .image(-8, 2, "starUnfilled")
            .setScale(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
        star2 = this.add
            .image(56, 2, "starUnfilled")
            .setScale(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
        star3 = this.add
            .image(120, 2, "starUnfilled")
            .setScale(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
        star4 = this.add
            .image(184, 2, "starUnfilled")
            .setScale(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
        star5 = this.add
            .image(248, 2, "starUnfilled")
            .setScale(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
        this.time.addEvent({
            delay: Phaser.Math.Between(10000, 25000),
            callback: () => {
                stars -= 1;
                if (stars < 0) {
                    stars = 0;
                }
                if (playerHealth <= 140) {
                    playerHealth += 20;
                    healthText.setText(playerHealth);
                }
            },
            loop: true,
        });

        this.add
            .image(0, 64, "money")
            .setScrollFactor(0)
            .setScale(0.6)
            .setDepth(1000);
        moneyText = this.make.text({
            x: 50,
            y: 50,
            text: playerMoney,
            style: {
                font: "32px arial",
                fill: "#008022",
            },
        });
        moneyText.setOrigin(0, 0);
        moneyText.setScrollFactor(0);
        moneyText.setDepth(1000);

        var healthText = this.make.text({
            x: -28,
            y: 96,
            text: playerHealth,
            style: {
                font: "32px arial",
                fill: "#c40000",
            },
        });
        healthText.setOrigin(0, 0);
        healthText.setScrollFactor(0);
        healthText.setDepth(1000);

        this.add
            .image(652, 2, "missions")
            .setScale(1.3)
            .setDepth(1000)
            .setScrollFactor(0);
        missionText = this.make
            .text({
                x: 700,
                y: -8,
                text: missions[mission],
                style: {
                    font: "24px arial",
                    fill: "#000000",
                },
            })
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(1000);

        // Missions
        banner = this.add
            .image(796, 20, "killerM")
            .setScale(0.6)
            .setDepth(1000)
            .setScrollFactor(0);
        banner.alpha = 0;

        // MUSIC!
        var runningThroughTheCity = this.sound.add("runningthroughthecity");
        var dirtyMusic = this.sound.add("dirty");
        runningThroughTheCity.play();
        // Lower UI
        var musicLoc = 2;
        this.add
            .image(-16, 700, "music")
            .setScale(1.3)
            .setDepth(1000)
            .setScrollFactor(0);
        var prev = this.add
            .image(32, 700, "previous")
            .setScale(1.2)
            .setDepth(1000)
            .setScrollFactor(0)
            .setInteractive();
        var next = this.add
            .image(80, 700, "next")
            .setScale(1.2)
            .setDepth(1000)
            .setScrollFactor(0)
            .setInteractive();
        prev.on("pointerdown", () => {
            musicLoc -= 1;
            if (musicLoc < 1) {
                musicLoc = 2; // Max
            }
            dirtyMusic.stop();
            runningThroughTheCity.stop();
            if (musicLoc == 1) {
                dirtyMusic.play();
            } else if (musicLoc == 2) {
                runningThroughTheCity.play();
            }
        });

        next.on("pointerdown", () => {
            musicLoc += 1;
            if (musicLoc > 2) {
                musicLoc = 1; // Min
            }
            dirtyMusic.stop();
            runningThroughTheCity.stop();
            if (musicLoc == 1) {
                dirtyMusic.play();
            } else if (musicLoc == 2) {
                runningThroughTheCity.play();
            }
        });

        var missionsBtn = this.add
            .image(128, 700, "missionsW")
            .setInteractive()
            .setScale(1.3)
            .setDepth(1000)
            .setScrollFactor(0);

        missionsBtn.on("pointerdown", () => {
            this.scene.pause().launch("missionScene");
        });

        // CITIZENS
        citizens = this.physics.add.group();

        // House
        for (var c = 0; c < Phaser.Math.Between(1, 2); c++) {
            var cit = citizens
                .create(
                    Phaser.Math.Between(4880, 5940),
                    Phaser.Math.Between(-1296, -988),
                    "citizenImg1"
                )
                .setDrag(500, 500);
        }
        citizens.children.each(function (citizen) {
            this.time.addEvent({
                delay: Phaser.Math.Between(1000, 3000),
                callback: () => {
                    citizen.setVelocityX(Phaser.Math.Between(-3, 3) * 125);
                    citizen.setVelocityY(Phaser.Math.Between(-3, 3) * 125);
                },
                callbackScope: this,
                loop: true,
            });
        }, this);

        bullets = this.physics.add.group();

        // STATIC
        staticG = this.physics.add.staticGroup();
        var targetG = this.physics.add.staticGroup();
        target = targetG
            .create(820, 250, "targetImg")
            .setScale(3.5)
            .refreshBody();
        target.setTexture("targetImg", 0);
        targetHealth = 15;

        // Invis walls
        // House:
        for (var i = 0; i <= 37; i++) {
            staticG.create(4810, -740 + -i * 16, "wallY");
            staticG.create(6091, -740 + -i * 16, "wallY");
        }
        for (i = 0; i <= 79; i++) {
            staticG.create(4820 + i * 16, -1342, "wallX");
        }
        for (i = 0; i <= 67; i++) {
            staticG.create(5005 + i * 16, -725, "wallX");
        }
        staticG.create(4821, -725, "wallX");
        staticG.create(4821 + 16, -725, "wallX");
        staticG.create(4821 + 32, -725, "wallX");

        // Police Station:
        for (i = 0; i <= 55; i++) {
            staticG.create(6813, -135 + -i * 16, "wallY");
        }
        for (i = 0; i <= 87; i++) {
            staticG.create(8195, 370 + -i * 16, "wallY");
        }
        for (i = 0; i <= 55; i++) {
            staticG.create(7642, -130 + -i * 16, "wallY");
        }
        for (i = 0; i <= 55; i++) {
            staticG.create(6998 + i * 16, -125, "wallX");
        }
        for (i = 0; i <= 3; i++) {
            staticG.create(6823 + i * 16, -125, "wallX");
        }
        for (i = 0; i <= 80; i++) {
            staticG.create(6823 + i * 16, -1028, "wallX");
        }
        // Invis City:
        // Invis Apartment
        for (i = 0; i <= 99; i++) {
            staticG.create(7318 - i * 16, 2764, "wallX");
        }
        for (i = 0; i <= 99; i++) {
            staticG.create(7318 - i * 16, 3145, "wallX");
        }
        for (i = 0; i <= 23; i++) {
            staticG.create(5725, 3138 + -i * 16, "wallY");
        }
        staticG.create(7325, 3137, "wallY");
        staticG.create(7325, 3121, "wallY");
        staticG.create(7325, 3105, "wallY");
        staticG.create(7325, 3090, "wallY");
        staticG.create(7325, 3074, "wallY");
        staticG.create(7325, 3058, "wallY");
        staticG.create(7325, 3042, "wallY");
        // Invis Shop:
        for (i = 0; i <= 79; i++) {
            staticG.create(7316 - i * 16, 3230, "wallX");
        }
        for (i = 0; i <= 67; i++) {
            staticG.create(7120 - i * 16, 3868, "wallX");
        }
        for (i = 0; i <= 5; i++) {
            staticG.create(7316 - i * 16, 3868, "wallX");
        }
        for (i = 0; i <= 39; i++) {
            staticG.create(6042, 3860 + -i * 16, "wallY");
        }
        for (i = 0; i <= 29; i++) {
            staticG.create(7320, 3707 + -i * 16, "wallY");
        }
        staticG.create(7320, 3860, "wallY");
        staticG.create(7320, 3846, "wallY");

        // INVIS Chinese Restaurant:
        for (i = 0; i <= 10; i++) {
            staticG.create(7316 - i * 16, 4555, "wallX");
        }
        for (i = 0; i <= 10; i++) {
            staticG.create(6858 - i * 16, 4555, "wallX");
        }
        for (i = 0; i <= 39; i++) {
            // part *bucks
            staticG.create(7314 - i * 16, 5324, "wallX");
        }
        for (i = 0; i <= 72; i++) {
            // part *bucks
            staticG.create(7322, 4563 + i * 16, "wallY");
        }
        for (i = 0; i <= 40; i++) {
            staticG.create(6682, 4563 + i * 16, "wallY");
        }

        // INVIS *Bucks
        for (i = 0; i <= 39; i++) {
            // *bucks
            staticG.create(6682, 5328 + i * 16, "wallY");
        }

        // Fencing:
        for (var fenceNum = 0; fenceNum <= 12; fenceNum++) {
            staticG.create(fenceNum * 64 + 100, 675, "fencing");
        }

        for (var fenceUpNum = 1; fenceUpNum <= 4; fenceUpNum++) {
            staticG.create(875, 675 - fenceUpNum * 64, "fencing").angle = 90;
        }

        // Bricks:

        for (var brickUpNum = 0; brickUpNum <= 11; brickUpNum++) {
            staticG.create(
                46,
                700 - brickUpNum * 64,
                "brickfencing"
            ).angle = 90;
        }

        for (var brickRightNum = 0; brickRightNum <= 10; brickRightNum++) {
            staticG.create(brickRightNum * 64, 130, "brickfencing");
        }

        staticG.create(646, 73, "brickfencing").angle = 90;
        staticG.create(646, 10, "brickfencing").angle = 90;

        car = this.physics.add
            .sprite(300, 420, "carImg")
            .setScale(1.5)
            .setDrag(1000, 1000)
            .setDepth(101);
        inCar = false;
        carAcceleration = 420;

        gun = this.physics.add.sprite(player.x, player.y, "guns").setDepth(102); // 170, 270 DELETE
        gun.setTexture("guns", chosenGun);
        gunDelay = 200;
        gunDamage = 5;

        //bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });//this.physics.add.sprite(300, 270, 'bullet').setScale(2).setVisible(false);

        xVelocity = 0;
        yVelocity = 0;
        gunPicked = false;
        var shotTimer = this.time.addEvent({
            delay: gunDelay,
            callback: allowShoot,
            callbackScope: this,
            loop: true,
        });
        shootable = true;
        var time = 0;

        // POLICE ROOM
        policeRoom = this.add.group();
        policeRoom.add(this.add.image(7228, -575, "policeRoom"));
        policeRoom.add(
            staticG
                .create(7100, -500, "policeDesk1")
                .setScale(1.5)
                .refreshBody()
        );
        policeRoom.add(
            staticG
                .create(6908, -590, "policeDesk2")
                .setScale(1.5)
                .refreshBody()
        );
        policeRoom.add(
            staticG
                .create(7292, -590, "policeDesk3")
                .setScale(1.5)
                .refreshBody()
        );
        policeRoom.setAlpha(0);
        policeRoom.add(staticG.create(7070, -600, "policeman"));

        //this.time.addEvent({ delay: 7000, callback: () => {policeInfoBlock = true}, loop: true });
        // POLICE
        var police = this.physics.add.group();
        var poBullets = this.physics.add.group();

        // Police Place
        for (var p = 0; p < Phaser.Math.Between(6, 12); p++) {
            police
                .create(
                    Phaser.Math.Between(6900, 7600),
                    Phaser.Math.Between(-1000, 98),
                    "policeman"
                )
                .setDrag(500, 500);
        }
        // Gun Shop
        police.create(7365, 3656, "policeman").setDrag(500, 500).setDepth(20);
        police.create(6793, 3774, "policeman").setDrag(500, 500).setDepth(20);
        police.create(6099, 3520, "policeman").setDrag(500, 500).setDepth(20);
        police.create(7234, 3332, "policeman").setDrag(500, 500).setDepth(20);
        police.children.each(function (policemen) {
            this.time.addEvent({
                delay: Phaser.Math.Between(1000, 3000),
                callback: () => {
                    if (policemen.body.enable) {
                        if (stars <= 2) {
                            policemen.setVelocityX(
                                Phaser.Math.Between(-3, 3) * 125
                            );
                            policemen.setVelocityY(
                                Phaser.Math.Between(-3, 3) * 125
                            );
                        } else if (stars >= 3 && stars < 4) {
                            var poBullet = poBullets.create(
                                policemen.x,
                                policemen.y,
                                "bullet"
                            );
                            this.physics.add.overlap(poBullet, staticG, () => {
                                poBullet.destroy();
                            });
                            this.physics.add.overlap(poBullet, player, () => {
                                poBullet.destroy();
                            });
                            if (poBullet) {
                                this.physics.moveToObject(poBullet, gun, 800);
                            }
                        } else if (stars >= 4) {
                            var poBullet = poBullets.create(
                                policemen.x,
                                policemen.y,
                                "bullet"
                            );
                            this.physics.add.overlap(poBullet, staticG, () => {
                                poBullet.destroy();
                            });
                            this.physics.add.overlap(poBullet, player, () => {
                                poBullet.destroy();
                            });
                            if (poBullet) {
                                this.physics.moveToObject(poBullet, gun, 800);
                            }
                            this.physics.moveToObject(policemen, player, 400);
                        }
                    }
                },
                callbackScope: this,
                loop: true,
            });

            this.time.addEvent({
                delay: 60,
                callback: () => {
                    if (
                        policemen.x > 6823 &&
                        policemen.x < 7878 &&
                        policemen.y > -1015 &&
                        policemen.y < -135
                    ) {
                        if (
                            gun.x > 6823 &&
                            gun.x < 7878 &&
                            gun.y > -1015 &&
                            gun.y < -135
                        ) {
                            policemen.setAlpha(0.99);
                        } else {
                            policemen.setAlpha(0);
                        }
                    } else if (policeRoom.alpha !== 0) {
                        policemen.setAlpha(0.99);
                    }
                },
                callbackScope: this,
                loop: true,
            });
        }, this);

        // RESPAWN POLICE & PAY LOANS

        this.time.addEvent({
            delay: 20000,
            callback: () => {
                if (predatoryLoanAmount > 0) {
                    predatoryLoanAmount -= 500;
                    playerMoney -= 675;
                    moneyText.setText(playerMoney);
                }

                if (playerMoney < 0) {
                    if (stars <= 4) {
                        stars += 2;
                    }
                    if (stars > 5) {
                        stars = 5;
                    }
                }
            },
            loop: true,
        });

        var policeAlive;
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                // RESPAWNS POLICE
                policeAlive = 0;
                police.children.each(function (policemen) {
                    if (policemen.body.enable) {
                        policeAlive += 1;
                    }
                });
                if (policeAlive <= 4) {
                    for (p = 0; p < Phaser.Math.Between(6, 12); p++) {
                        police
                            .create(
                                Phaser.Math.Between(6900, 7600),
                                Phaser.Math.Between(-1000, 98),
                                "policeman"
                            )
                            .setDrag(500, 500);
                    }

                    police.children.each(function (policemen) {
                        this.time.addEvent({
                            delay: Phaser.Math.Between(1000, 3000),
                            callback: () => {
                                if (policemen.body.enable) {
                                    if (stars <= 2) {
                                        policemen.setVelocityX(
                                            Phaser.Math.Between(-3, 3) * 125
                                        );
                                        policemen.setVelocityY(
                                            Phaser.Math.Between(-3, 3) * 125
                                        );
                                    } else if (stars >= 3 && stars < 4) {
                                        var poBullet = poBullets.create(
                                            policemen.x,
                                            policemen.y,
                                            "bullet"
                                        );
                                        this.physics.add.overlap(
                                            poBullet,
                                            staticG,
                                            () => {
                                                poBullet.destroy();
                                            }
                                        );
                                        this.physics.add.overlap(
                                            poBullet,
                                            player,
                                            () => {
                                                poBullet.destroy();
                                            }
                                        );
                                        if (poBullet) {
                                            this.physics.moveToObject(
                                                poBullet,
                                                gun,
                                                800
                                            );
                                        }
                                    } else if (stars >= 4) {
                                        var poBullet = poBullets.create(
                                            policemen.x,
                                            policemen.y,
                                            "bullet"
                                        );
                                        this.physics.add.overlap(
                                            poBullet,
                                            staticG,
                                            () => {
                                                poBullet.destroy();
                                            }
                                        );
                                        this.physics.add.overlap(
                                            poBullet,
                                            player,
                                            () => {
                                                poBullet.destroy();
                                            }
                                        );
                                        if (poBullet) {
                                            this.physics.moveToObject(
                                                poBullet,
                                                gun,
                                                800
                                            );
                                        }
                                        this.physics.moveToObject(
                                            policemen,
                                            player,
                                            400
                                        );
                                    }
                                }
                            },
                            callbackScope: this,
                            loop: true,
                        });

                        this.time.addEvent({
                            delay: 60,
                            callback: () => {
                                if (
                                    policemen.x > 6823 &&
                                    policemen.x < 7878 &&
                                    policemen.y > -1015 &&
                                    policemen.y < -135
                                ) {
                                    if (
                                        gun.x > 6823 &&
                                        gun.x < 7878 &&
                                        gun.y > -1015 &&
                                        gun.y < -135
                                    ) {
                                        policemen.setAlpha(0.99);
                                    } else {
                                        policemen.setAlpha(0);
                                    }
                                } else if (policeRoom.alpha !== 0) {
                                    policemen.setAlpha(0.99);
                                }
                            },
                            callbackScope: this,
                            loop: true,
                        });
                    }, this);
                }
            },
            loop: true,
        });

        var policeInfoBlockUsable = true;
        var policeHelp = false;
        infoG = this.physics.add.group();
        infoG.create(7070, -420, "info");

        // POLICE BRICKS ZONE
        var poCars = this.physics.add.group();
        poCars.add(this.physics.add.sprite(7772, 48, "policeCar")); // Police Car
        poCars.add(this.physics.add.sprite(4673, 2413, "carImg")); // Car
        //this.physics.add.collider(poCars, player);
        poCars.children.each(function (poCar) {
            poCar.setScale(1.5).setDrag(1000, 1000);
            poCar.setDepth(99);
        });
        this.time.addEvent({
            delay: 4000,
            callback: () => {
                policeInfoBlockUsable = true;
            },
            loop: true,
        });

        this.physics.add.overlap(infoG, player, () => {
            if (policeInfoBlockUsable === true) {
                policeInfoBlockUsable = false;
                if (policeHelp === false) {
                    policeHelp = true;
                    helpText.setText(
                        "Thanks for stopping by\nthe police office. Here's 100$\nfor the trouble!"
                    );
                    helpText.x = 7120;
                    helpText.y = -700;
                    playerMoney += 100;
                    moneyText.setText(playerMoney);
                    policeInfoBlockUsable = false;
                } else {
                    if (Phaser.Math.Between(1, 5) == 1) {
                        helpText.setText(
                            "This computer doesn't\nactually work!"
                        );

                        policeInfoBlockUsable = false;
                    } else if (Phaser.Math.Between(1, 5) == 2) {
                        helpText.setText("Help yourself to some M&Ms!");
                    } else if (Phaser.Math.Between(1, 5) == 3) {
                        helpText.setText(
                            "Need some blank paper?\nThe Police Office is here\nfor you!"
                        );
                    } else if (Phaser.Math.Between(1, 5) == 4) {
                        helpText.setText(
                            "The flag to the left is\nactually just lying down\non the ground."
                        );
                    } else if (Phaser.Math.Between(1, 5) == 5) {
                        helpText.setText("Hey! Don't point that gun\nat me!");
                    }
                    helpText.x = 7120;
                    helpText.y = -700;
                    policeInfoBlockUsable = false;
                }
            }
        });

        // APARTMENTS:
        apartment = this.physics.add.image(6525, 2953, "apartmentFloorOne");
        apartmentStairs = this.physics.add
            .sprite(5830, 2850, "apartmentStairs")
            .setDepth(10);
        apartmentColliders1 = this.physics.add.group();
        apartmentColliders2 = this.physics.add.group();

        chair = apartmentColliders1
            .create(6600, 2953, "chairYellow")
            .setAngle(90)
            .setScale(0.4)
            .setImmovable();
        apartmentColliders1
            .create(6400, 2900, "chairRed")
            .setScale(0.4)
            .setImmovable();
        apartmentColliders1
            .create(6200, 2953, "chairBlue")
            .setAngle(-90)
            .setScale(0.4)
            .setImmovable();
        apartmentColliders2
            .create(7219, 3071, "desk")
            .setDrag(1000)
            .setScale(1.5)
            .setAngle(180)
            .setImmovable();
        apartmentColliders2
            .create(6553, 2845, "computerDesk")
            .setDrag(1000)
            .setScale(1.5)
            .setImmovable();
        apartmentColliders2
            .create(7156, 2857, "bed")
            .setScale(0.5)
            .setImmovable();

        // CLOTHES N STUFF SHOP:
        clothesStuff = this.physics.add.image(6679, 3548, "clothesStuffBG");
        clothesGroup = this.physics.add.group();
        var buyableClothes = this.physics.add.group();
        var gunRack = clothesGroup
            .create(6313, 3350, "gunRack")
            .setScale(2)
            .setImmovable();
        var clothesCheckout = clothesGroup
            .create(6327, 3770, "cashierDesk")
            .setScale(1.5)
            .setImmovable()
            .setAngle(180);
        buyableClothes.add(clothesGroup.create(6840, 3350, "regStand"));
        buyableClothes.add(clothesGroup.create(6968, 3350, "poStand"));
        buyableClothes.add(clothesGroup.create(7096, 3350, "citStand"));
        // line 2
        buyableClothes.add(clothesGroup.create(6840, 3478, "greenStand"));
        buyableClothes.add(clothesGroup.create(6968, 3478, "redStand"));
        buyableClothes.add(clothesGroup.create(7096, 3478, "camoStand"));

        buyableClothes.children.each(function (stand) {
            stand.setImmovable();
        }, this);

        // CHINESE RESTAURANT

        chineseRoom = this.add.image(7000, 4940, "chineseRestRoom");
        chineseRoomG = this.physics.add.group();
        var chineseCheckout = chineseRoomG
            .create(7075, 5225, "cashierDesk")
            .setScale(1.5)
            .setImmovable()
            .setAngle(180);

        // MONEY            MONEY           MONEY           MONEY      MONEY
        var money = this.physics.add.group();
        money.create(6020, -1047, "money").setScale(0.8);
        money.create(4773, 1064, "money").setScale(0.8);

        // Text
        helpText = this.add
            .text(96, 200, "Run over a gun\nto pick it up.", {
                fontSize: "20px",
                fill: "#000",
            })
            .setDepth(200);

        var joystick = (this.joyStick = this.plugins
            .get("rexvirtualjoystickplugin")
            .add(this, {
                x: 130,
                y: 580,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0x888888),
                thumb: this.add.circle(0, 0, 40, 0xcccccc),
                // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
                // forceMin: 16,
                // enable: true
            }));
        if (this.sys.game.device.os.desktop) {
            joystick.toggleVisible();
        }
        var ePress = this.physics.add
            .image(800, 550, "eBtn")
            .setInteractive()
            .setDepth(1000)
            .setScrollFactor(0);
        ePress.on("pointerdown", () => {
            // DELETE
            for (p = 0; p < 40; p++) {
                police
                    .create(
                        Phaser.Math.Between(6900, 7600),
                        Phaser.Math.Between(-1000, 98),
                        "policeman"
                    )
                    .setDrag(500, 500);
            }
        });

        // Cursor
        joysticks = joystick.createCursorKeys();
        arrows = this.input.keyboard.createCursorKeys();
        cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            e: Phaser.Input.Keyboard.KeyCodes.E,
        });

        pointer = game.input.activePointer;

        // CAMERA
        cam = this.cameras.main;
        //cam.setBounds(0, 0, 900, 700);
        cam.startFollow(player, true);
        cam.setZoom(0.9);
        cam.backgroundColor.setTo(107, 198, 0);

        // Collision
        this.physics.add.overlap(gun, player, pickUpGun, null, this);
        this.physics.add.overlap(money, player, pickUpMoney, null, this);
        this.physics.add.overlap(player, car, touchingCar);
        this.physics.add.collider(car, player);
        this.physics.add.collider(staticG, player);
        this.physics.add.collider(targetG, player);
        this.physics.add.collider(apartmentColliders1, player);
        this.physics.add.collider(apartmentColliders1, car);
        this.physics.add.collider(apartmentColliders2, player);
        this.physics.add.collider(clothesGroup, car);
        this.physics.add.collider(clothesGroup, player);
        this.physics.add.collider(chineseRoomG, player);

        // Citizens
        this.physics.add.collider(citizens, player);
        this.physics.add.collider(citizens, car);
        this.physics.add.collider(citizens, staticG);
        this.physics.add.collider(citizens, citizens);
        this.physics.add.overlap(citizens, bullets, hurtCit, null, this);
        this.physics.add.overlap(bullets, citizens, kill, null, this);
        // Police
        this.physics.add.collider(police, player);
        this.physics.add.collider(police, car);
        this.physics.add.collider(police, staticG);
        this.physics.add.collider(police, citizens);
        this.physics.add.collider(police, police);
        this.physics.add.collider(apartmentColliders1, police);
        this.physics.add.overlap(police, bullets, hurtCit, null, this);
        this.physics.add.overlap(bullets, police, kill, null, this);
        this.physics.add.collider(clothesGroup, police);
        this.physics.add.collider(chineseRoomG, police);
        // Police Car
        this.physics.add.collider(poCars, poCars);
        this.physics.add.collider(police, poCars);
        this.physics.add.collider(citizens, poCars);
        this.physics.add.collider(poCars, player);
        this.physics.add.overlap(gun, poCars, touchingNewCar, null, this);
        this.physics.add.collider(poCars, staticG);
        this.physics.add.collider(poCars, targetG);
        this.physics.add.collider(car, poCars);
        this.physics.add.collider(apartmentColliders1, poCars);
        this.physics.add.collider(chineseRoomG, poCars);

        this.physics.add.overlap(poBullets, gun, killPlayer);
        this.physics.add.overlap(poBullets, staticG, kill, null, this);

        this.physics.add.collider(staticG, car);
        this.physics.add.collider(targetG, car);

        this.physics.add.collider(apartmentColliders1, staticG);
        this.physics.add.collider(apartmentColliders1, apartmentColliders1);
        this.physics.add.collider(apartmentColliders2, staticG);
        this.physics.add.collider(apartmentColliders2, apartmentColliders2);
        this.physics.add.overlap(apartmentStairs, player, () => {
            if (apartmentFloor === 0) {
                apartmentFloor = 1;
            } else if (apartmentFloor == 1) {
                apartmentFloor = 0;
            }
        });

        // Buy Things:
        this.physics.add.overlap(gunRack, gun, () => {
            gun.x = 6186;
            gun.y = 3500;
            player.x = gun.x;
            player.y = gun.y;
            xVelocity = 0;
            yVelocity = 0;

            this.scene.pause().launch("buyGun");
        });

        this.physics.add.overlap(buyableClothes, gun, () => {
            gun.x = 6963;
            gun.y = 3584;
            player.x = gun.x;
            player.y = gun.y;
            xVelocity = 0;
            yVelocity = 0;

            this.scene.pause().launch("buyClothes");
        });

        this.physics.add.overlap(clothesCheckout, gun, () => {
            gun.x = 6373;
            gun.y = 3623;
            player.x = gun.x;
            player.y = gun.y;
            xVelocity = 0;
            yVelocity = 0;
            checkoutLocation = "clothes";
            this.scene.pause().launch("checkout");
        });

        this.physics.add.overlap(chineseCheckout, gun, () => {
            gun.x = 7132;
            gun.y = 5069;
            player.x = gun.x;
            player.y = gun.y;
            xVelocity = 0;
            yVelocity = 0;
            checkoutLocation = "chinese";
            this.scene.pause().launch("checkout");
        });

        // Functions:

        // Keypress: e
        this.input.keyboard.on("keydown-E", ePressed);
        function ePressed() {
            if (inCar === true) {
                inCar = false;
                player.enableBody(true, true);

                if (car.angle != 180 && car.angle !== 0) {
                    if (car.angle == 90) {
                        car.angle = 0;
                    } else if (car.angle == -90) {
                        car.angle = 180;
                    }
                }

                if (car.angle === 0) {
                    player.x = car.x - 100;
                    player.y = car.y - 80;
                } else {
                    player.x = car.x + 100;
                    player.y = car.y + 80;
                }

                player.setVisible(true);
                cam.stopFollow();
                cam.startFollow(player, true);
            }
        }

        function pickUpGun(player, gun) {
            if (gunPicked === false) {
                gunPicked = true;
                helpText.setText(
                    "Use Left Click To\nShoot The Yellow Box\nBlocking Your Exit!"
                );
                helpText.x = 300;
                helpText.y = 190;
            }
        }
        function pickUpMoney(player, mula) {
            playerMoney += 500;
            moneyText.setText(playerMoney);
            mula.destroy();
            this.sound.play("cash");
        }
        function allowShoot() {
            shootable = true;
            shotTimer.delay = gunDelay;
        }
        function touchingCar() {
            if (cursors.e.isDown) {
                inCar = true;
                player.disableBody(true, true);
                cam.stopFollow();
                cam.startFollow(car, true);
            }
        }

        function touchingNewCar(collider, carToEntry) {
            if (cursors.e.isDown) {
                //console.log("e down");
                //inCar = true;
                inNewCar = true;
                player.x = carToEntry.x;
                player.y = carToEntry.y;
                player.disableBody(true, true);
                cam.stopFollow();
                cam.startFollow(carToEntry, true);
                gun.x = carToEntry.x;
                gun.y = carToEntry.y;

                helpText.setText("Hijacking...");
                this.sound.play("honk");
                helpText.x = carToEntry.x;
                helpText.y = carToEntry.y;

                this.time.delayedCall(1000, () => {
                    gun.x = carToEntry.x;
                    gun.y = carToEntry.y;
                    helpText.setText("\n");

                    var newCarTimer = this.time.addEvent({
                        delay: 16.6, // ms
                        callback: () => {
                            //console.log("inCar");
                            if (
                                cursors.left.isDown ||
                                joysticks.left.isDown ||
                                arrows.left.isDown
                            ) {
                                carToEntry.setVelocityX(-420);
                                carToEntry.angle = -90;
                            } else if (
                                cursors.right.isDown ||
                                joysticks.right.isDown ||
                                arrows.right.isDown
                            ) {
                                carToEntry.setVelocityX(420);
                                carToEntry.angle = 90;
                            } else if (
                                cursors.up.isDown ||
                                joysticks.up.isDown ||
                                arrows.up.isDown
                            ) {
                                carToEntry.setVelocityY(-420);
                                carToEntry.angle = 0;
                            } else if (
                                cursors.down.isDown ||
                                joysticks.down.isDown ||
                                arrows.down.isDown
                            ) {
                                carToEntry.setVelocityY(420);
                                carToEntry.angle = 180;
                            }
                            if (cursors.e.isDown) {
                                inNewCar = false;
                                //console.log("e down + in car");
                                if (
                                    carToEntry.angle != 180 &&
                                    carToEntry.angle !== 0
                                ) {
                                    if (carToEntry.angle == 90) {
                                        carToEntry.angle = 0;
                                    } else if (carToEntry.angle == -90) {
                                        carToEntry.angle = 180;
                                    }
                                }

                                if (car.angle === 0) {
                                    gun.x = carToEntry.x - 150;
                                    gun.y = carToEntry.y - 80;
                                } else {
                                    gun.x = carToEntry.x + 150;
                                    gun.y = carToEntry.y + 80;
                                }
                                player.enableBody(true, true);
                                player.setVisible(true);
                                cam.stopFollow();
                                cam.startFollow(player, true);
                                newCarTimer.remove();
                                player.x = gun.x;
                                player.y = gun.y;
                            }

                            this.physics.moveToObject(gun, carToEntry, 500);
                        },

                        loop: true,
                    });
                });
            }
        }

        function hurtCit(citizen) {
            // STARS
            if (stars <= 4.5) {
                stars += 0.5;
            }
            if (stars > 5) {
                stars = 5;
            }

            // PARTICLES
            var manager = this.add.particles("bloodImg");
            var blood = manager.createEmitter({ scale: { start: 1, end: 0 } });
            blood.setPosition(citizen.x, citizen.y);
            blood.setSpeed(200);
            blood.setLifespan(400);
            blood.setBlendMode(Phaser.BlendModes.SUBTRACT);

            this.time.delayedCall(400, function () {
                manager.destroy();
            });

            if (Phaser.Math.Between(1, 20 - gunDamage) == 1) {
                citizen.disableBody(true, true);
                manager.destroy();
                playerMoney += Phaser.Math.Between(1100, 2300);
                moneyText.setText(playerMoney);
                if (mission === 0) {
                    // killer
                    missionComplete(0, this);
                }
            }
        }

        function killPlayer() {
            playerHealth -= 5;
            healthText.setText(playerHealth);
            if (playerHealth <= 0) {
                alert("Wasted!");
            }
        }

        /*function policeInfo() {
	        console.log("over");
	        if(policeInfoBlockUsable == true) {
	            
	            
	            if(policeHelp === false) {
	                policeHelp = true;
	                helpText.setText("Thanks for stopping by\nthe police office. Here's 100$\nfor the trouble!");
	                helpText.x = 7000;
	                helpText.y = -700;
	                playerMoney+=100;
	                moneyText.setText(playerMoney);
	                policeInfoBlockUsable = false;
	            } else {
	                if(Phaser.Math.Between(1,5) == 1) {
	                    helpText.setText("This computer doesn't\nactually work!");
	                    helpText.x = 7163;
	                    helpText.y = -688;
	                    policeInfoBlockUsable = false;
	                } else if (Phaser.Math.Between(1,5) == 2) {
	                    helpText.setText("Help yourself to some M&Ms!");
	                    helpText.x = 7163;
	                    helpText.y = -688;
	                    policeInfoBlockUsable = false;
	                }
	            }
	            
	        } else {
	            console.log("ran over but not true:");
	            console.log(policeInfoBlockUsable);
	        }
	    }*/
    }

    update() {
        // STARS
        if (stars >= 0 && stars < 1) {
            star1.setTexture("starUnfilled");
            star2.setTexture("starUnfilled");
            star3.setTexture("starUnfilled");
            star4.setTexture("starUnfilled");
            star5.setTexture("starUnfilled");
        } else if (stars >= 1 && stars < 2) {
            star1.setTexture("starFilled");
            star2.setTexture("starUnfilled");
            star3.setTexture("starUnfilled");
            star4.setTexture("starUnfilled");
            star5.setTexture("starUnfilled");
        } else if (stars >= 2 && stars < 3) {
            star1.setTexture("starFilled");
            star2.setTexture("starFilled");
            star3.setTexture("starUnfilled");
            star4.setTexture("starUnfilled");
            star5.setTexture("starUnfilled");
        } else if (stars >= 3 && stars < 4) {
            star1.setTexture("starFilled");
            star2.setTexture("starFilled");
            star3.setTexture("starFilled");
            star4.setTexture("starUnfilled");
            star5.setTexture("starUnfilled");
        } else if (stars >= 4 && stars < 5) {
            star1.setTexture("starFilled");
            star2.setTexture("starFilled");
            star3.setTexture("starFilled");
            star4.setTexture("starFilled");
            star5.setTexture("starUnfilled");
        } else if (stars >= 5) {
            star1.setTexture("starFilled");
            star2.setTexture("starFilled");
            star3.setTexture("starFilled");
            star4.setTexture("starFilled");
            star5.setTexture("starFilled");
        } else if (stars > 5) {
            stars = 5;
        } else {
            alert("An error has ocurred. Sorry!");
        }
        // Movement
        if (
            cursors.left.isDown ||
            joysticks.left.isDown ||
            arrows.left.isDown
        ) {
            if (inCar === false) {
                if (xVelocity >= -280) {
                    xVelocity += -35;
                } else {
                    xVelocity = -280;
                }
                yVelocity = 0;
                player.angle = 0;
            } else {
                car.angle = -90;
                car.setVelocityX(-carAcceleration);
            }
        } else if (
            cursors.right.isDown ||
            joysticks.right.isDown ||
            arrows.right.isDown
        ) {
            if (inCar === false) {
                if (xVelocity <= 280) {
                    xVelocity += 35;
                } else {
                    xVelocity = 280;
                }
                yVelocity = 0;
                player.angle = 180;
            } else {
                car.angle = 90;
                car.setVelocityX(carAcceleration);
            }
        } else if (
            cursors.up.isDown ||
            joysticks.up.isDown ||
            arrows.up.isDown
        ) {
            if (inCar === false) {
                if (yVelocity >= -280) {
                    yVelocity += -35;
                } else {
                    yVelocity = -280;
                }
                xVelocity = 0;
                player.angle = 90;
            } else {
                car.angle = 0;
                car.setVelocityY(-carAcceleration);
            }
        } else if (
            cursors.down.isDown ||
            joysticks.down.isDown ||
            arrows.down.isDown
        ) {
            if (inCar === false) {
                if (yVelocity >= 280) {
                    yVelocity += -35;
                } else {
                    yVelocity = 280;
                }
                xVelocity = 0;
                player.angle = 270;
                if (gunPicked === true) {
                    gun.angle = 90;
                }
            } else {
                car.angle = 180;
                car.setVelocityY(carAcceleration);
            }
        } else {
            //player.setVelocityX(0);
            //player.setVelocityY(0);
            if (xVelocity >= 20) {
                xVelocity -= 20;
            } else if (xVelocity <= -20) {
                xVelocity += 20;
            } else {
                xVelocity = 0;
            }

            if (yVelocity >= 20) {
                yVelocity -= 20;
            } else if (yVelocity <= -20) {
                yVelocity += 20;
            } else {
                yVelocity = 0;
            }
        }

        player.setVelocityX(xVelocity);
        player.setVelocityY(yVelocity);

        if (inCar === true && inNewCar === false) {
            if (gunPicked === true) {
                this.physics.moveToObject(gun, car, 500);
            }
        }

        // End Movement

        // Gun
        if (gunPicked === true) {
            if (inCar === false && inNewCar === false) {
                this.physics.moveToObject(gun, player, 400);
            }
            if (
                pointer.x + cam.scrollX > player.x &&
                pointer.y + cam.scrollY < 100 + player.y &&
                pointer.y + cam.scrollY > player.y - 100
            ) {
                gun.angle = 0;
            } else if (
                pointer.x + cam.scrollX < player.y &&
                pointer.y + cam.scrollY < 100 + player.y &&
                pointer.y + cam.scrollY > player.y - 100
            ) {
                gun.angle = 180;
            } else if (
                pointer.x + cam.scrollX > player.x &&
                pointer.y + cam.scrollY > player.y + cam.scrollY
            ) {
                gun.angle = 45;
            } else if (
                pointer.x + cam.scrollX > player.x &&
                pointer.y + cam.scrollY < player.y
            ) {
                gun.angle = 325;
            } else if (
                pointer.x + cam.scrollX < player.x &&
                pointer.y + cam.scrollY > player.y
            ) {
                gun.angle = 135;
            } else if (
                pointer.x + cam.scrollX < player.x &&
                pointer.y + cam.scrollY < player.y
            ) {
                gun.angle = -135;
            }

            if (pointer.isDown) {
                if (shootable) {
                    if (this.sys.game.device.os.desktop) {
                        if (chosenGun == 9) {
                            // shotgun
                            var bullet = bullets.create(gun.x, gun.y, "bullet");
                            var bullet2 = bullets.create(
                                gun.x,
                                gun.y,
                                "bullet"
                            );
                            var bullet3 = bullets.create(
                                gun.x,
                                gun.y,
                                "bullet"
                            );
                            var bullet4 = bullets.create(
                                gun.x,
                                gun.y,
                                "bullet"
                            );
                            var bullet5 = bullets.create(
                                gun.x,
                                gun.y,
                                "bullet"
                            );
                            if (
                                bullet &&
                                bullet2 &&
                                bullet3 &&
                                bullet4 &&
                                bullet5
                            ) {
                                this.sound.play("shoot");
                                this.physics.moveTo(
                                    bullet,
                                    pointer.x + cam.scrollX,
                                    pointer.y + cam.scrollY,
                                    800
                                ); // 1
                                this.physics.moveTo(
                                    bullet2,
                                    pointer.x + cam.scrollX - 20,
                                    pointer.y + cam.scrollY + 20,
                                    800
                                ); // 2
                                this.physics.moveTo(
                                    bullet3,
                                    pointer.x + cam.scrollX - 20,
                                    pointer.y + cam.scrollY - 20,
                                    800
                                ); // 3
                                this.physics.moveTo(
                                    bullet4,
                                    pointer.x + cam.scrollX + 20,
                                    pointer.y + cam.scrollY - 20,
                                    800
                                ); // 4
                                this.physics.moveTo(
                                    bullet5,
                                    pointer.x + cam.scrollX + 20,
                                    pointer.y + cam.scrollY + 20,
                                    800
                                ); // 5

                                this.physics.add.overlap(
                                    bullet,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                ); // 1
                                this.physics.add.overlap(
                                    bullet2,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                ); // 2
                                this.physics.add.overlap(
                                    bullet3,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                ); // 3
                                this.physics.add.overlap(
                                    bullet4,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                ); // 4
                                this.physics.add.overlap(
                                    bullet5,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                ); // 5
                            }
                        } else {
                            var bullet = bullets.create(gun.x, gun.y, "bullet");
                            if (bullet) {
                                this.sound.play("shoot");
                                this.physics.moveTo(
                                    bullet,
                                    pointer.x + cam.scrollX,
                                    pointer.y + cam.scrollY,
                                    800
                                );
                                this.physics.add.overlap(
                                    bullet,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                );
                                this.time.delayedCall(25000, () => {
                                    bullet.destroy();
                                });
                                console.log(gun.x);
                                console.log(gun.y);
                                this.physics.add.overlap(bullet, target, () => {
                                    bullet.destroy();
                                    targetHealth -= 1;
                                    if (targetHealth > 10) {
                                        target.setTexture("targetImg", 0);
                                    } else if (
                                        targetHealth < 11 &&
                                        targetHealth > 6
                                    ) {
                                        target.setTexture("targetImg", 1);
                                    } else if (
                                        targetHealth < 6 &&
                                        targetHealth > 0
                                    ) {
                                        target.setTexture("targetImg", 2);
                                    } else {
                                        target.destroy();
                                        helpText.setText(
                                            "Now, run into the\ncar while holding\n'e' to drive away safely."
                                        );
                                        helpText.x = 500;
                                        helpText.y = 400;
                                    }
                                });
                            }
                        }
                    } else {
                        if (pointer.x > 300 || pointer.y < 400) {
                            var bullet = bullets.create(gun.x, gun.y, "bullet");
                            if (bullet) {
                                this.sound.play("shoot");
                                this.physics.moveTo(
                                    bullet,
                                    pointer.x + cam.scrollX,
                                    pointer.y + cam.scrollY,
                                    800
                                );
                                this.time.delayedCall(25000, () => {
                                    bullet.destroy();
                                });
                                this.physics.add.overlap(
                                    bullet,
                                    staticG,
                                    () => {
                                        bullet.destroy();
                                    }
                                );
                                this.physics.add.overlap(bullet, target, () => {
                                    bullet.destroy();
                                    targetHealth -= 1;
                                    if (targetHealth > 10) {
                                        target.setTexture("targetImg", 0);
                                    } else if (
                                        targetHealth < 11 &&
                                        targetHealth > 6
                                    ) {
                                        target.setTexture("targetImg", 1);
                                    } else if (
                                        targetHealth < 6 &&
                                        targetHealth > 0
                                    ) {
                                        target.setTexture("targetImg", 2);
                                    } else {
                                        target.destroy();
                                        helpText.setText(
                                            "Now, run into the\ncar while holding\n'e' to drive away safely."
                                        );
                                        helpText.x = 500;
                                        helpText.y = 400;
                                    }
                                });
                            }
                        }
                    }
                    shootable = false;
                }
            }

            if (gun.x > 6823 && gun.x < 7878 && gun.y > -1015 && gun.y < -135) {
                policeRoom.setAlpha(0.99);
                infoG.setAlpha(0.99);
            } else if (policeRoom.alpha !== 0) {
                policeRoom.setAlpha(0);
                infoG.setAlpha(0);
            }

            if (gun.x > 5746 && gun.x < 7315 && gun.y > 2762 && gun.y < 3132) {
                apartment.setAlpha(0.99);
                if (apartmentFloor === 0) {
                    if (chair.alpha !== 0.99) {
                        apartmentStairs.x = 5830;
                        apartmentStairs.y = 2850;
                        apartmentStairs.angle = 0;
                        apartmentColliders1.setAlpha(0.99);
                        apartmentStairs.setAlpha(0.99);
                        apartmentColliders1.children.each(function (collider) {
                            collider.enableBody(null, null, null, true, true);
                        }, this);
                        apartmentColliders2.children.each(function (collider) {
                            collider.disableBody(true, true);
                        }, this);
                    }
                } else if (apartmentFloor == 1) {
                    if (chair.alpha !== 0) {
                        apartmentStairs.angle = 180;
                        apartmentStairs.x = 5830;
                        apartmentStairs.y = 3065;
                        apartmentColliders1.setAlpha(0);
                        //apartmentStairs.setAlpha(0);
                        //apartmentStairs.disableBody(true,true);
                        apartmentColliders1.children.each(function (collider) {
                            collider.disableBody(true, true);
                        }, this);
                        apartmentColliders2.children.each(function (collider2) {
                            collider2.enableBody(null, null, null, true, true);
                            collider2.setAlpha(0.99);
                        }, this);
                    }
                }
            } else if (apartment.alpha !== 0) {
                apartment.setAlpha(0);
                apartmentColliders1.setAlpha(0);
                apartmentColliders2.setAlpha(0);
                apartmentStairs.setAlpha(0);
                apartmentFloor = 0;
            }

            if (gun.x > 6040 && gun.x < 7313 && gun.y > 3233 && gun.y < 3868) {
                if (clothesStuff.alpha !== 0.99) {
                    clothesStuff.setAlpha(0.99);
                    clothesGroup.setAlpha(0.99);
                }
            } else if (clothesStuff.alpha !== 0) {
                clothesStuff.setAlpha(0);
                clothesGroup.setAlpha(0);
                if (thingsInCart) {
                    stars = 5;
                }
            }

            if (gun.x > 6670 && gun.x < 7316 && gun.y > 4540 && gun.y < 5324) {
                if (clothesStuff.alpha !== 0.99) {
                    chineseRoom.setAlpha(0.99);
                    chineseRoomG.setAlpha(0.99);
                }
            } else if (chineseRoom.alpha !== 0) {
                chineseRoom.setAlpha(0);
                chineseRoomG.setAlpha(0);
            }
        }
    }

    end() {}
}

export default GameScene;
