import { PropsWithChildren, useEffect, useRef } from "react";
import { CanvasBox } from "@/components/FullBox";
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
import { uuid } from "@/utils/common";
import vertexSource from "./vertex.glsl?raw";
import fragmentSource from "./fragment.glsl?raw";
import waterMap from "@/assets/maps/R.jpg";

export interface WorldProps {
  id?: string;
}
const World = (props: PropsWithChildren<WorldProps>) => {
  const { id = uuid(), children } = props;
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

  return (
    <CanvasBox id={id} ref={worldRef}>
      {children}
    </CanvasBox>
  );
};

export default World;
