import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Color3,
  Constants,
  Engine,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import FullBox from "@/components/FullBox";
import { renderLoop } from "@/utils/renderLoop";
import { ExampleCommonProps } from "@/hooks/useExamples";
import "@babylonjs/loaders";
import iconSvg from "@/assets/images/location.svg";

const Billboard = (props: ExampleCommonProps) => {
  const { oneFrame = false } = props;
  const worldRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const engine = new Engine(worldRef.current, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      25,
      new Vector3(0, 0, 0),
      scene
    );

    // This targets the camera to scene origin
    camera.setTarget(new Vector3(0, 0, 15));
    camera.attachControl(worldRef.current, true);
    // create a light, aiming 0,1,0 - meaning, to the sky
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN: {
          const mesh = pointerInfo.pickInfo?.pickedMesh;
          if (mesh) {
            camera.zoomOn([mesh]);
          }
          console.log(pointerInfo);
          break;
        }
      }
    });

    // create the 3D GUI Manager

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
    iconMesh.position = new Vector3(1, 4, 1);

    // 只渲染一帧场景用于预览
    renderLoop({
      engine,
      scene,
      container: worldRef.current as HTMLCanvasElement,
      oneFrame,
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });
    // Inspector.Show(scene, {});

    return () => {
      engine.dispose();
    };
  }, [oneFrame]);

  return <FullBox tag="canvas" ref={worldRef}></FullBox>;
};

export default Billboard;
