import FullBox from "@/components/FullBox";
import {
  ArcRotateCamera,
  Effect,
  Engine,
  HemisphericLight,
  MeshBuilder,
  PostProcess,
  Scene,
  Vector3,
  ParticleHelper,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import RainFragmentShader from "./rain.fragment.glsl?raw";
import { ExampleCommonProps } from "@/hooks/useExamples";
import { renderLoop } from "@/utils/renderLoop";

const Rain = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
  const sceneRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const engine = new Engine(sceneRef.current, true);
    console.log(engine.getCaps().supportComputeShaders);
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
    camera.attachControl(sceneRef.current, true);

    // create environment light
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // use particle system to create rain
    ParticleHelper.CreateAsync("rain", scene, true).then((set) => {
      set.systems[0].updateSpeed = 0.01;
      set.start();
      scene.registerBeforeRender(() => {
        for (const sys of set.systems) {
          (sys.emitter as Vector3).x = camera.position.x;
          (sys.emitter as Vector3).y = camera.position.y;
          (sys.emitter as Vector3).z = camera.position.z;
        }
      });
    });
    // create a box
    MeshBuilder.CreateBox("box", { size: 1 }, scene);

    Effect.ShadersStore["rainFragmentShader"] = RainFragmentShader;

    const postProcess = new PostProcess(
      "rain post process",
      "rain",
      ["screenSize", "sceneSampler", "u_time"],
      null,
      1.0,
      camera
    );
    postProcess.onApply = function (effect) {
      effect.setFloat2("screenSize", postProcess.width, postProcess.height);
      effect.setFloat("u_time", performance.now() / 1000);
      effect.setTextureFromPostProcess("sceneSampler", postProcess);
    };

    window.addEventListener("resize", () => {
      engine.resize();
    });

    renderLoop({
      engine,
      scene,
      container: sceneRef.current as HTMLCanvasElement,
      oneFrame,
    });

    return () => {
      engine.dispose();
    };
  }, [oneFrame]);
  return (
    <>
      <FullBox tag="canvas" ref={sceneRef}></FullBox>
    </>
  );
};

export default Rain;
