import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Engine,
  Scene,
  SceneLoader,
  Vector3,
  HemisphericLight,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";

import { ExampleCommonProps } from "@/hooks/useExamples";
import { renderLoop } from "@/utils/renderLoop";
import "@babylonjs/loaders";

const ModelLoading = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
  const worldRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const engine = new Engine(worldRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      4,
      new Vector3(0, 0, 0),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    camera.attachControl(worldRef.current, true);

    // 创建环境光
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    SceneLoader.Append(
      "./models/DamagedHelmet/",
      "DamagedHelmet.gltf",
      scene,
      () => {}
    );
    // 只渲染一帧场景用于预览
    renderLoop({
      engine,
      scene,
      container: worldRef.current as HTMLCanvasElement,
      oneFrame,
    });
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [oneFrame]);

  return (
    <>
      <FullBox tag="canvas" ref={worldRef}></FullBox>
    </>
  );
};

export default ModelLoading;
