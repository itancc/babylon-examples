import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";
import BabylonScene, { BabylonSceneActor } from "@/components/BabylonScene";

const LoadModel = () => {
  const onMount = ({ scene, camera }: BabylonSceneActor) => {
    camera.radius = 4;
    scene.createDefaultLight();
    SceneLoader.AppendAsync(
      "/models/DamagedHelmet/",
      "DamagedHelmet.gltf",
      scene
    );
  };
  return <BabylonScene onMount={onMount}></BabylonScene>;
};

export default LoadModel;
