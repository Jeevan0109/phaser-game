//create next tsx file 
'use client'
import 'phaser'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DinoGame() {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize your Phaser game here
            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                parent: 'dino-game',
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300, x: 0 },
                        debug: false
                    }
                },
                scene: {
                    preload: preload,
                    create: create,
                    update: update
                }
            };

            const game = new Phaser.Game(config);
        }
    }, []);


    function preload() { }
    function create() { }
    function update() { }


    return (<div id='dino-game'></div>);
}