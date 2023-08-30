import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Engine,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";

const RainEffect = () => {
  const worldRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const engine = new Engine(worldRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      8,
      new Vector3(0, 0, 0),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    camera.attachControl(worldRef.current, true);
    MeshBuilder.CreateGround(
      "box",
      { width: 5, height: 5, subdivisions: 100, updatable: true },
      scene
    );

    // 只渲染一帧场景用于预览

    engine.runRenderLoop(() => {
      scene.render();
      if (scene.isReady()) {
        engine.stopRenderLoop();
      }
    });

    // hover上去开始循环渲染
    worldRef.current?.addEventListener("mouseenter", () => {
      engine.runRenderLoop(() => {
        scene.render();
      });
    });
    // hover离开停止渲染
    worldRef.current?.addEventListener("mouseleave", () => {
      engine.stopRenderLoop();
    });
    // 取消循环渲染
    //  engine.stopRenderLoop();
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <FullBox tag="canvas" ref={worldRef}></FullBox>;
};

export default RainEffect;
