import 'phaser'
// import birdSprite from '@/assets/flapp-bird-assets/bird3.png'
import pipeSprite from '@/assets/flapp-bird-assets/pipe.png'
import pause from '@/assets/flapp-bird-assets/pause.png'
import backbutton from '@/assets/flapp-bird-assets/back.png'
// import bg from '@/assets/PhaserGame/bg.jpg'
import bg from '@/assets/flapp-bird-assets/sky.png'
// import bgVideo from '@/assets/flapp-bird-assets/videos/newbg.mp4'; // Replace with your video path
import bird from '@/assets/flapp-bird-assets/birdSprite.png'

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }


    preload() {
        this.load.image('sky-bg', bg.src);
        // this.load.video('background_video', bgVideo);

        // this.load.image('bird', birdSprite.src);
        // pipe 
        this.load.image('pipe', pipeSprite.src)
        // load pause.png
        this.load.image('pause-btn', pause.src)
        //back button
        this.load.image('back', backbutton.src)
        //bird sprite
        this.load.spritesheet('bird', bird.src, {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        this.scene.start('MenuScene')
    }
}

export default PreloadScene