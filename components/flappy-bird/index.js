'use client'

import { useEffect } from "react";
import Phaser, { Physics } from 'phaser';
import PreloadScene from './PreloadScene';
import PlayScene from './PlayScene';
import MenuScene from './MenuScene';
import ScoreScene from './ScoreScene';
import PauseScene from './PauseScene';
export default function FlappyBird() {

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const WIDTH = 800;
            const HEIGHT = 600;
            const BIRD_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 }
            const SHARED_CONFIG = {
                width: WIDTH,
                height: HEIGHT,
                startPosition: BIRD_POSITION
            }

            const Scenes = [PreloadScene, MenuScene, ScoreScene,PlayScene,PauseScene];
            const createScenes = Scene => new Scene(SHARED_CONFIG);
            const initScenes = () => Scenes.map(createScenes);

            // Initialize your Phaser game here
            const config = {
                //WebGL Web graphics library JS api for rendering 2d and 3d graphics
                type: Phaser.AUTO,
                parent: 'phaser-game',
                ...SHARED_CONFIG,
                background: '#000000',
                pixelArt:true,
                physics: {
                    // arcade is physics plugin and manages physics simulation
                    default: 'arcade',
                    arcade: {
                        debug: false
                    }
                },
                scale: {
                    // Fit to window
                    // mode: Phaser.Scale.FIT,
                    // Center vertically and horizontally
                    autoCenter: Phaser.Scale.CENTER_BOTH
                },
                scene: initScenes(),
            };

            const game = new Phaser.Game(config);

            return () => { game.destroy(true) };
        }
    }, []);


    return (
        <div id="phaser-game" style={{ width: '100vw', height: '100vh' }}>

        </div>
    );
}