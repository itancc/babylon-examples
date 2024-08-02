import { SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders";
import { BScene, BSceneActor } from "@/components/BScene";

const LoadModel = () => {
  const onMount = ({ scene, camera }: BSceneActor) => {
    camera.radius = 4;
    scene.createDefaultLight();
    SceneLoader.AppendAsync(
      `${import.meta.env.BASE_URL}/models/DamagedHelmet/`,
      "DamagedHelmet.gltf",
      scene
    );
  };
  return <BScene onMount={onMount}></BScene>;
};

export default LoadModel;
