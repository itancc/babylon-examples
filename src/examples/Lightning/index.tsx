import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Color3,
  Engine,
  GlowLayer,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";
import { renderLoop } from "@/utils/renderLoop";
import { ExampleCommonProps } from "@/hooks/useExamples";

/** todo 分形算法 */
const createBolt = () => {
  const points = [];
  const totalSegments = 10;
  const segmentLength = 10 / totalSegments;

  points.push(new Vector3(0, 0, 0));

  for (let i = 1; i < totalSegments; i++) {
    const xOffset = (Math.random() - 0.5) * 2;
    const zOffset = (Math.random() - 0.5) * 2;
    points.push(new Vector3(xOffset, segmentLength * i, zOffset));
  }

  points.push(new Vector3(0, 10, 0));
  return points;
};

const Lightning = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
  const worldRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const engine = new Engine(worldRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      25,
      new Vector3(0, 0, 0),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(new Vector3(0, 0, 15));
    camera.attachControl(worldRef.current, true);
    MeshBuilder.CreateGround(
      "box",
      { width: 5, height: 5, subdivisions: 100 },
      scene
    );

    // create a light, aiming 0,1,0 - meaning, to the sky
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // open
    // create lightning bolt
    const points = createBolt();
    const options = {
      path: points,
      radius: 0.02,
      cap: Mesh.CAP_ALL,
      updatable: true,
    };

    let bolt = MeshBuilder.CreateTube("bolt", options, scene);

    const material = new StandardMaterial("boltMaterial", scene);
    material.emissiveColor = new Color3(44 / 255, 89 / 255, 217 / 255);
    bolt.material = material;
    const gl = new GlowLayer("boltGlowLayer", scene);
    gl.addIncludedOnlyMesh(bolt);
    // 只渲染一帧场景用于预览
    renderLoop(
      {
        engine,
        scene,
        container: worldRef.current as HTMLCanvasElement,
        oneFrame,
      },
      () => {
        if (Math.random() < 0.01) {
          bolt = MeshBuilder.CreateTube("bolt", {
            path: createBolt(),
            radius: 0.02,
            cap: Mesh.CAP_ALL,
            instance: bolt,
          });
        }
      }
    );

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [oneFrame]);

  return <FullBox tag="canvas" ref={worldRef}></FullBox>;
};

export default Lightning;
