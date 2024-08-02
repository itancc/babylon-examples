import { Effect, MeshBuilder, ShaderMaterial, Texture } from "@babylonjs/core";
import vertexSource from "./start.vert?raw";
import fragmentSource from "./start.frag?raw";
import waterMap from "@/assets/images/R.jpg";
import { BScene, BSceneActor } from "@/components/BScene";

const World = () => {
  const onMount = (actor: BSceneActor) => {
    const { scene } = actor;
    // 相机半径设置成8
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
      time += 0.01;
      box?.material?.getEffect?.()?.setFloat("time", time);
    });
  };
  return <BScene onMount={onMount}></BScene>;
};

export default World;
