import { PropsWithChildren, useEffect, useRef } from "react";
import FullBox from "./FullBox";
import {
  ArcRotateCamera,
  Engine,
  Nullable,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { useOneFrame } from "@/hooks/useOneFrame";

export interface BSceneActor {
  container: HTMLCanvasElement;
  scene: Scene;
  engine: Engine;
  camera: ArcRotateCamera;
}
export interface BSceneProps {
  /** 挂载完成 */
  onMount?: (actor: BSceneActor) => void;
  /** 自定义render方法 */
  onRender?: (actor: BSceneActor) => void;
  /** 挂载结束 */
  onUnmount?: (actor: BSceneActor) => void;
}

export const BScene = (props: PropsWithChildren<BSceneProps>) => {
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

    const actor = { scene, engine, camera, container };
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
