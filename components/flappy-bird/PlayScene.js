import BaseScene from './BaseScene.js'
import { useState } from 'react'

let PIPES_TO_RENDER = 4; // ok


class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config);
        this.totalDelta = null;
        this.bird = null
        this.pipes = null;
        this.pipeHorizontalDistance = 0;
        this.pipeVerticalDistanceRange = [150, 250]
        this.pipeHorizontalDistanceRange = [500, 600]
        this.flapVelocity = 300
        this.VELOCITY = 200;
        this.isPaused = false;

        //difficulties
        this.currentDifficulty = 'easy';
        this.difficulties = {
            'easy': {
                pipeHorizontalDistanceRange: [300, 350],
                pipeVerticalDistanceRange: [150, 200]
            },
            'normal': {
                pipeHorizontalDistanceRange: [280, 330],
                pipeVerticalDistanceRange: [140, 190]
            },
            'hard': {
                pipeHorizontalDistanceRange: [250, 310],
                pipeVerticalDistanceRange: [120, 170]
            }
        }

        //score 
        this.score = 0;
        this.scoreText = '';
        this.bestScoreText = '';

    }
    //loading assets, such as images, music , animations ....
    preload() {
    }

    // create variable 
    create() {
        this.currentDifficulty = 'easy'
        // this.createBG();
        super.create();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.createPause();
        this.handleInputs();
        this.listenToEvents();
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
            ///24fps default, it will play animation consiting of 24 times in 1 seconds
            frameRate: 8,
            //repeat infiitely
            repeat: -1
        })

        this.bird.play('fly');
    }


    update(time, delta) {
        this.checkGameStatus();
        this.recylePipes();
    }

    listenToEvents() {
        if (this.pauseEvent) { return; }
        this.pauseEvent = this.events.on('resume', () => {
            //unpaused the game 
            this.initialTime = 3;
            this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions)
                .setOrigin(0.5);

            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            })

        });
    }

    countDown() {
        this.initialTime--;
        this.countDownText.setText('Fly in: ' + this.initialTime);
        if (this.initialTime <= 0) {
            this.isPaused = false
            //empty string 
            this.countDownText.setText('');
            this.physics.resume();

            this.timedEvent.remove();
        }
    }

    createPause() {
        this.isPaused = false;
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause-btn')
            .setScale(3)
            .setOrigin(1);

        pauseButton.setInteractive();
        pauseButton.on('pointerdown', () => {
            this.isPaused = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        })

    }


    createScore() {
        this.score = 0;
        const bsetScore = localStorage.getItem('best-score');
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000', fontStyle: 'bold' })
        this.bestScoreText = this.add.text(16, 48, `Best Score: ${bsetScore || 0}`, { fontSize: '18px', fill: '#000', fontStyle: 'bold' })

    }
    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)

    }

    checkGameStatus() {


        if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
            this.gameOver()
        }

    }

    createBG() {
        let bg = this.add.image(0, 0, 'sky-bg').setOrigin(0, 0);
        const width = Number(this.config.width);
        const height = Number(this.config.height);
        bg.displayWidth = width;
        bg.displayHeight = height;

    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
        .setFlipX(true)
        .setOrigin(0)
        .setScale(3);
        this.bird.setBodySize(this.bird.width ,this.bird.height - 6)
        // this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0)
        this.bird.body.gravity.y = 600
        this.bird.setCollideWorldBounds(true)

    }

    createPipes() {

        this.pipes = this.physics.add.group();


        for (let i = 0; i < PIPES_TO_RENDER; i++) {

            const upperPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 1)
            const lowerPipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0, 0)
            this.placePipe(upperPipe, lowerPipe)
        }

        this.pipes.setVelocityX(-200);
    }

    handleInputs() {

        this.input.on('pointerdown', this.flap, this)

        this.input.keyboard.on('keydown-SPACE', this.flap, this)

    }

    flap() {
        if (this.isPaused) { return; }
        this.bird.body.velocity.y = -this.flapVelocity
    }

    increaseScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    setBestScore() {
        const getBestScoreText = localStorage.getItem('best-score');
        const bestScore = getBestScoreText && parseInt(getBestScoreText, 10);

        if (!bestScore || this.score > bestScore) {
            localStorage.setItem('best-score', this.score);
        }

    }

    gameOver() {
        // this.bird.x = this.config.startPosition.x
        // this.bird.y = this.config.startPosition.y
        // this.bird.body.velocity.y = 0
        this.physics.pause();
        this.bird.setTint(0xEE4824)

        this.setBestScore();
        // one second delay and restart game using time event 
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        })
    }

    placePipe(uPipe, lPipe) {

        const difficulty = this.difficulties[this.currentDifficulty];

        let rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange)

        const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance)

        const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange)

        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPosition

        lPipe.x = uPipe.x
        lPipe.y = uPipe.y + pipeVerticalDistance
    }

    recylePipes() {

        const tempPipes = [];
        this.pipes.getChildren().forEach((pipe) => {
            if (pipe.getBounds().right <= 0) {
                //recyle pipes
                //get here uper and lower that are out of the bound
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.placePipe(tempPipes[0], tempPipes[1]);
                    this.increaseScore();
                    this.setBestScore();
                    this.increaseDifficulty();

                }

            }
        })
    }


    increaseDifficulty() {
        if(this.score === 1){
            this.currentDifficulty = 'normal'
        }

        if(this.score === 3){
            this.currentDifficulty = 'hard'
        }
    }

    getRightMostPipe() {

        let rightMostX = 0;
        this.pipes.getChildren().forEach(function (pipe) {
            rightMostX = Math.max(pipe.x, rightMostX)
        })
        return rightMostX;
    }

}

export default PlayScene