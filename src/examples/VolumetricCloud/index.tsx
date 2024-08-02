import { BScene, BSceneActor } from "@/components/BScene";
import { Effect, MeshBuilder, ShaderMaterial } from "@babylonjs/core";
import VolumetricCloudVert from "./volumetricCloud.vert?raw";
import VolumetricCloudFrag from "./volumetricCloud.frag?raw";

export default function VolumetricCloud() {
  const onMount = (actor: BSceneActor) => {
    const { scene } = actor;
    scene.createDefaultLight();
    const volumetricCloudBox = MeshBuilder.CreateBox(
      "cloudBox",
      { size: 2 },
      scene
    );

    Effect.ShadersStore["volumetricCloudVertexShader"] = VolumetricCloudVert;
    Effect.ShadersStore["volumetricCloudFragmentShader"] = VolumetricCloudFrag;

    const material = new ShaderMaterial(
      "volumetricCloudMaterial",
      scene,
      "volumetricCloud",
      {
        attributes: ["position"],
        uniforms: ["worldViewProjection", "cameraPosition", "cameraDirection"],
        needAlphaBlending: true,
        needAlphaTesting: true,
      }
    );

    volumetricCloudBox.material = material;

    scene.registerBeforeRender(() => {
      const cameraPosition = scene.activeCamera?.position;
      const cameraDirection = scene.activeCamera?.getForwardRay().direction;
      if (!cameraPosition || !cameraDirection) return;
      material.setVector3("cameraPosition", cameraPosition);
      material.setVector3("cameraDirection", cameraDirection);
    });
  };

  return <BScene onMount={onMount}></BScene>;
}
