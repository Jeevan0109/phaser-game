import { Scene } from 'phaser'
//import bacground
import startbg from '@/assets/PhaserGame/bg.jpg'


class GameScene extends Scene {

    constructor() {
        super('IndexScene');
    }

    preload() {
        // preload assets
        this.load.image('main-bg', startbg.src);
    }

    create() {
        let bg = this.add.image(0, 0, 'main-bg').setOrigin(0, 0);
        // Ensure width and height are numbers
        const width = Number(this.sys.game.config.width);
        const height = Number(this.sys.game.config.height);
        bg.displayWidth = width;
        bg.displayHeight = height;

    }

    // update() {

    // }
}

export default GameScene