import BaseSecene from './BaseScene.js'

class PauseScene extends BaseSecene {
    constructor(config) {
        super('PauseScene', config);

        this.menu = [
            { scene: 'PlayScene', text: 'Continue' },
            { scene: 'MenuScene', text: 'Exit' }
        ]
    }

    create() {
        super.create();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this))

    }

    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;
        textGO.setInteractive();
        textGO.on('pointerover', () => textGO.setStyle({ fill: '#ff0' }));
        textGO.on('pointerout', () => textGO.setStyle({ fill: '#fff' }));
        textGO.on('pointerup', () => {

            if (menuItem.scene && menuItem.text === 'Continue') {
                //shutting down the pause scene and resuming the play scene
                this.scene.stop()
                this.scene.resume(menuItem.scene)
                
            } else {
                //Shutting PlayScene , Pause Scene and running menu
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
        });
    }
}

export default PauseScene