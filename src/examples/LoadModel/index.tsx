import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";
import BasicScene, { SceneActor } from "@/components/BasicScene";

const LoadModel = () => {
  const onMount = ({ scene, camera }: SceneActor) => {
    camera.radius = 4;
    scene.createDefaultLight();
    SceneLoader.AppendAsync(
      "./models/DamagedHelmet/",
      "DamagedHelmet.gltf",
      scene
    );
  };
  return <BasicScene onMount={onMount}></BasicScene>;
};

export default LoadModel;
