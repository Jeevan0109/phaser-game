'use client'
import { useEffect } from 'react';
import Phaser from 'phaser';
import IndexScene from './GameScene.';

const Game = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize your Phaser game here
      const config = {
        type: Phaser.AUTO,
        parent: 'phaser-game',
        width: window.innerWidth,
        height: window.innerHeight,
        background: '#ffffff',
        scale: {
          // Fit to window
          mode: Phaser.Scale.FIT,
          // Center vertically and horizontally
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [IndexScene],

      };
      const game = new Phaser.Game(config);

      return () => { game.destroy(true) };
    }
  }, []);
  //root id="phaser-game"
  return <div id="phaser-game" style={{ width: '100vw', height: '100vh' }}></div>
};

export default Game;
