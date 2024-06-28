import {
  Effect,
  MeshBuilder,
  PostProcess,
  Vector3,
  ParticleHelper,
} from "@babylonjs/core";
import RainFragmentShader from "./rain.frag?raw";

import BabylonScene, { BabylonSceneActor } from "@/components/BabylonScene";

const Rain = () => {
  const onMount = (actor: BabylonSceneActor) => {
    const { scene, camera } = actor;
    // create environment light
    scene.createDefaultLight();

    // use particle system to create rain
    ParticleHelper.CreateAsync("rain", scene, true).then((set) => {
      set.systems[0].updateSpeed = 0.01;
      set.start();
      scene.registerBeforeRender(() => {
        for (const sys of set.systems) {
          (sys.emitter as Vector3).x = camera.position.x;
          (sys.emitter as Vector3).y = camera.position.y;
          (sys.emitter as Vector3).z = camera.position.z;
        }
      });
    });
    // create a box
    MeshBuilder.CreateBox("box", { size: 1 }, scene);

    Effect.ShadersStore["rainFragmentShader"] = RainFragmentShader;

    const postProcess = new PostProcess(
      "rain post process",
      "rain",
      ["screenSize", "sceneSampler", "u_time"],
      null,
      1.0,
      camera
    );
    postProcess.onApply = function (effect) {
      effect.setFloat2("screenSize", postProcess.width, postProcess.height);
      effect.setFloat("u_time", performance.now() / 1000);
      effect.setTextureFromPostProcess("sceneSampler", postProcess);
    };
  };
  return <BabylonScene onMount={onMount}> </BabylonScene>;
};

export default Rain;
