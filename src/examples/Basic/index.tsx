import BasicScene, { SceneActor } from "@/components/BasicScene";
import { MeshBuilder } from "@babylonjs/core";

const Basic = () => {
  const onMount = (actor: SceneActor) => {
    const { scene } = actor;
    MeshBuilder.CreateBox("box", { size: 2 }, scene);
    scene.createDefaultEnvironment({
      createSkybox: true,
      createGround: true,
    });
    scene.createDefaultLight();
  };
  return <BasicScene onMount={onMount} oneFrame={true}></BasicScene>;
};

export default Basic;
