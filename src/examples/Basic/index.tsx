import BabylonScene, { BabylonSceneActor } from "@/components/BabylonScene";
import { MeshBuilder } from "@babylonjs/core";

const Basic = () => {
  const onMount = (actor: BabylonSceneActor) => {
    const { scene } = actor;
    MeshBuilder.CreateBox("box", { size: 2 }, scene);
    scene.createDefaultEnvironment({
      createSkybox: true,
      createGround: true,
    });
    scene.createDefaultLight();
  };
  return <BabylonScene onMount={onMount}></BabylonScene>;
};

export default Basic;
