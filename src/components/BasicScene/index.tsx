import { ArcRotateCamera, Engine, Scene, Vector3 } from "@babylonjs/core";
import FullBox from "../FullBox";
import { PropsWithChildren, useEffect, useRef } from "react";
import { Nullable } from "@/utils/types";
import { useOneFrame } from "@/hooks/useOneFrame";

export interface SceneActor {
  scene: Scene;
  engine: Engine;
  camera: ArcRotateCamera;
}
export interface BasicSceneProps {
  /** 挂载完成 */
  onMount?: (actor: SceneActor) => void;
  /** 自定义render方法 */
  onRender?: (actor: SceneActor) => void;
  /** 挂载结束 */
  onUnmount?: (actor: SceneActor) => void;
}
const BasicScene = (props: PropsWithChildren<BasicSceneProps>) => {
  const { children, onMount, onRender, onUnmount } = props;
  const sceneRef = useRef<HTMLCanvasElement>(null);
  const oneFrame = useOneFrame();
  useEffect(() => {
    const container = sceneRef.current;
    if (!container) throw new Error("container is required!");
    const engine = new Engine(container, true);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      8,
      Vector3.Zero(),
      scene
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(container, true);

    const actor = { scene, engine, camera };
    onMount?.(actor);

    engine.runRenderLoop(() => {
      onRender?.(actor) ?? scene.render();
      if (oneFrame && scene.isReady()) {
        engine.stopRenderLoop();
      }
    });
    let onFrameMouseEnterEvent: Nullable<() => void>;
    let onFrameMouseLeaveEvent: Nullable<() => void>;
    if (oneFrame) {
      onFrameMouseEnterEvent = () => {
        engine.runRenderLoop(() => {
          onRender?.(actor) ?? scene.render();
        });
      };
      onFrameMouseLeaveEvent = () => {
        engine.stopRenderLoop();
      };
      container.addEventListener("mouseenter", onFrameMouseEnterEvent);
      container.addEventListener("mouseleave", onFrameMouseLeaveEvent);
    }

    window.addEventListener("resize", () => {
      engine.resize();
    });
    return () => {
      onUnmount?.(actor) ?? (scene.dispose(), engine.dispose());
      if (onFrameMouseEnterEvent) {
        container.removeEventListener("mouseenter", onFrameMouseEnterEvent);
      }
      if (onFrameMouseLeaveEvent) {
        container.removeEventListener("mouseleave", onFrameMouseLeaveEvent);
      }
    };
  });

  return (
    <FullBox position="relative">
      <FullBox tag="canvas" ref={sceneRef}></FullBox>
      {children}
    </FullBox>
  );
};

export default BasicScene;
