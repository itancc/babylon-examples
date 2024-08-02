import { BScene, BSceneActor } from "@/components/BScene";

import {
  Color3,
  Color4,
  Effect,
  Mesh,
  MeshBuilder,
  ShaderMaterial,
  Vector3,
} from "@babylonjs/core";
import FlowVertext from "./flow.vert?raw";
import FlowFragment from "./flow.frag?raw";

const FlowAnimation = () => {
  const onMount = ({ scene, camera }: BSceneActor) => {
    camera.radius = 30;
    scene.createDefaultLight();
    const path = [
      new Vector3(23.0, 0, 0.0),
      new Vector3(0, 1, 0.1),
      new Vector3(-4.0, 20, 0.2),
    ];
    scene.clearColor = new Color4(0.0, 0.0, 0.0, 1.0);
    // create  横向的圆柱体
    const tube = MeshBuilder.CreateTube(
      "tube",
      { path: path, radius: 0.5, sideOrientation: Mesh.DOUBLESIDE },
      scene
    );

    // flow animation shader
    Effect.ShadersStore["flowFragmentShader"] = FlowFragment;
    Effect.ShadersStore["flowVertexShader"] = FlowVertext;
    const flowMaterial = new ShaderMaterial("flowMaterial", scene, "flow", {
      attributes: ["position", "uv"],
      uniforms: ["worldViewProjection", "u_time", "u_color"],
      samplers: ["u_texture"],
      // 这里启动透明度混合
      needAlphaBlending: true,
      needAlphaTesting: true,
    });
    // const arrowsTexture = new Texture(
    //   "https://img95.699pic.com/xsj/08/se/qf.jpg%21/fh/300",
    //   scene
    // );
    // flowMaterial.setTexture("u_texture", arrowsTexture);
    tube.material = flowMaterial;

    flowMaterial.onBindObservable.add(() => {
      flowMaterial.setFloat("u_time", performance.now() / 1000);
      flowMaterial.setColor3("u_color", new Color3(0.37, 0.62, 0.93));
    });
  };

  return <BScene onMount={onMount}></BScene>;
};

export default FlowAnimation;
