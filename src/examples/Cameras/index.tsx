import BasicScene, { SceneActor } from "@/components/BasicScene";
import { MeshBuilder, Vector3 } from "@babylonjs/core";

const Cameras = () => {
  const onMount = ({ camera, scene }: SceneActor) => {
    scene.removeCamera(camera);
    scene.createDefaultLight();
    const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position = Vector3.Zero();
  };
  return <BasicScene onMount={onMount}></BasicScene>;
};

export default Cameras;
