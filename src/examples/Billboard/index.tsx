import {
  Color3,
  Constants,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import iconSvg from "@/assets/images/location.svg";
import BabylonScene, { BabylonSceneActor } from "@/components/BabylonScene";

const Billboard = () => {
  const onMount = ({ scene, camera }: BabylonSceneActor) => {
    camera.radius = 15;
    scene.createDefaultLight();
    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN: {
          const mesh = pointerInfo.pickInfo?.pickedMesh;
          if (mesh) {
            camera.zoomOn([mesh]);
          }
          break;
        }
      }
    });
    const iconMesh = MeshBuilder.CreatePlane("icon", {
      size: 3,
      sideOrientation: Mesh.DOUBLESIDE,
    });
    const material = new StandardMaterial("iconMaterial");
    const texture = new Texture(
      iconSvg,
      scene,
      false,
      true,
      Constants.TEXTURE_TRILINEAR_SAMPLINGMODE
    );

    material.disableLighting = true;
    material.opacityTexture = texture;
    material.emissiveColor.copyFrom(Color3.FromHexString("#FFC26B"));
    iconMesh.material = material;
    iconMesh.billboardMode = Mesh.BILLBOARDMODE_ALL;
    // iconMesh.setEnabled(false);
    iconMesh.position = Vector3.Zero();
  };

  return <BabylonScene onMount={onMount}></BabylonScene>;
};

export default Billboard;
