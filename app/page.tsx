import Image from "next/image";
//import dynamic 
import dynamic from "next/dynamic";

const MainGame = dynamic(() => import('@/components/phaser-game/MainScene'), {
  ssr: false,
});

//reference from udemy course 
// const FlappyBird = dynamic(() => import('@/components/flappy-bird/index'), {
//   ssr: false,
// });

export default function Home() {
  return (
    <div>
      {/* <MainGame /> */}
      {/* <FlappyBird /> */}
    </div>
  );
}
