import 'phaser'

class BaseScene extends Phaser.Scene {
    constructor(key, config,canGoBack) {
        super(key);
        this.config = config
        this.canGoBack = canGoBack
        this.screenCenter = [config.width / 2, config.height / 2]
        this.fontSize = 34;
        this.lineHeight = 42;
        this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#fff' }
    }


    create() {
        let bg = this.add.image(0, 0, 'sky-bg').setOrigin(0);
        // const width = Number(this.config.width);
        // const height = Number(this.config.height);
        // bg.displayWidth = width;
        // bg.displayHeight = height;

        // const video = this.add.video(0, 0, 'background_video').setOrigin(0.0);
        //video.play(true); // Play the video and loop it
        //  const width = Number(this.config.width);
        // const height = Number(this.config.height);
        // video.displayWidth = 1280;
        // video.displayHeight = 600;


        if (this.config.canGoBack) {
            
            const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
                .setOrigin(1)
                .setScale(2)
                .setInteractive();

            backButton.on('pointerup', () => {
                this.scene.start('MenuScene')
            })
        }

    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;
        menu.forEach((menuItem) => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text,
                this.fontOptions
            ).setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem);
        })
    }
}

export default BaseScene