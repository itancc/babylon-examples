import { useEffect, useRef } from "react";
import {
  AbstractMesh,
  ActionManager,
  ArcRotateCamera,
  Color3,
  Engine,
  ExecuteCodeAction,
  HemisphericLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";
import { renderLoop } from "@/utils/renderLoop";
import { ExampleCommonProps } from "@/hooks/useExamples";
import "@babylonjs/loaders";
// import { Inspector } from "@babylonjs/inspector";
const Interaction = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
  const worldRef = useRef<HTMLCanvasElement>(null);
  const outlineMesh = useRef<AbstractMesh>();
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
    // create a light, aiming 0,1,0 - meaning, to the sky
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // add test glb model

    SceneLoader.AppendAsync("./models/Test/", "interaction.glb", scene, () => {
      const node = scene.getNodeById("strnd");
      const meshes = node?.getChildMeshes();
      if (meshes) {
        camera.zoomOn(meshes);
        meshes.forEach((mesh) => {
          mesh.actionManager = new ActionManager(scene);
          mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
              if (outlineMesh.current) {
                outlineMesh.current.renderOutline = false;
              }
              outlineMesh.current = mesh;
              mesh.renderOutline = true;
              mesh.outlineColor = new Color3(0, 1, 0);
              mesh.outlineWidth = 5;
            })
          );
        });
      }
    });
    // SceneLoader.Append("./models/DamagedHelmet/", "DamagedHelmet.gltf", scene);
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
    // Inspector.Show(scene, {});

    return () => {
      engine.dispose();
    };
  }, [oneFrame]);

  return <FullBox tag="canvas" ref={worldRef}></FullBox>;
};

export default Interaction;
