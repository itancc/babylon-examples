import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Effect,
  Engine,
  MeshBuilder,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";
import vertexSource from "./vertex.glsl?raw";
import fragmentSource from "./fragment.glsl?raw";
import waterMap from "@/assets/images/R.jpg";
import { ExampleCommonProps } from "@/hooks/useExamples";
import { renderLoop } from "@/utils/renderLoop";

const World = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
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
    const box = MeshBuilder.CreateGround(
      "box",
      { width: 5, height: 5, subdivisions: 100, updatable: true },
      scene
    );

    Effect.ShadersStore["boxVertexShader"] = vertexSource;
    Effect.ShadersStore["boxFragmentShader"] = fragmentSource;

    const material = new ShaderMaterial(
      "boxShader",
      scene,
      {
        vertex: "box",
        fragment: "box",
      },
      {
        attributes: ["position", "uv"],
        uniforms: [
          "view",
          "projection",
          "time",
          "world",
          "worldViewProjection",
        ],
        samplers: ["textureSampler"],
      }
    );
    const amigaTexture = new Texture(waterMap, scene);
    material.setTexture("textureSampler", amigaTexture);
    // material.backFaceCulling = false;
    // 是否网格化
    material.wireframe = false;
    box.material = material;
    let time = 0;
    box.material.onBindObservable.add(() => {
      time += 0.005;
      box?.material?.getEffect?.()?.setFloat("time", time);
    });

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

  return <FullBox tag="canvas" ref={worldRef}></FullBox>;
};

export default World;
