import {
  Color3,
  GlowLayer,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import BasicScene, { SceneActor } from "@/components/BasicScene";

/** todo 分形算法 */
const createBolt = () => {
  const points = [];
  const totalSegments = 10;
  const segmentLength = 10 / totalSegments;

  points.push(new Vector3(0, 0, 0));

  for (let i = 1; i < totalSegments; i++) {
    const xOffset = (Math.random() - 0.5) * 2;
    const zOffset = (Math.random() - 0.5) * 2;
    points.push(new Vector3(xOffset, segmentLength * i, zOffset));
  }

  points.push(new Vector3(0, 10, 0));
  return points;
};

const Lightning = () => {
  let bolt: Mesh;
  const onMount = ({ scene, camera }: SceneActor) => {
    camera.radius = 25;
    scene.createDefaultLight();
    MeshBuilder.CreateGround(
      "box",
      { width: 5, height: 5, subdivisions: 100 },
      scene
    );

    const points = createBolt();
    const options = {
      path: points,
      radius: 0.02,
      cap: Mesh.CAP_ALL,
      updatable: true,
    };

    bolt = MeshBuilder.CreateTube("bolt", options, scene);
    const material = new StandardMaterial("boltMaterial", scene);
    material.emissiveColor = new Color3(44 / 255, 89 / 255, 217 / 255);
    bolt.material = material;
    const gl = new GlowLayer("boltGlowLayer", scene);
    gl.addIncludedOnlyMesh(bolt);
  };
  const onRender = () => {
    if (Math.random() < 0.01) {
      bolt = MeshBuilder.CreateTube("bolt", {
        path: createBolt(),
        radius: 0.02,
        cap: Mesh.CAP_ALL,
        instance: bolt,
      });
    }
  };
  return <BasicScene onMount={onMount} onRender={onRender}></BasicScene>;
};

export default Lightning;
