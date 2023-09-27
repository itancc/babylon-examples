import { Engine, Scene } from "@babylonjs/core";

export interface UseRnederLoopOptions {
  engine: Engine;
  scene: Scene;
  container: HTMLCanvasElement;
  oneFrame: boolean;
}
export const renderLoop = (
  options: UseRnederLoopOptions,
  callback?: () => void
) => {
  const { engine, scene, container, oneFrame } = options;
  engine.runRenderLoop(() => {
    scene.render();
    callback?.();
    if (oneFrame && scene.isReady()) {
      engine.stopRenderLoop();
    }
  });

  if (oneFrame) {
    // hover上去开始循环渲染
    container.addEventListener("mouseenter", () => {
      engine.runRenderLoop(() => {
        scene.render();
        callback?.();
      });
    });
    // hover离开停止渲染
    container.addEventListener("mouseleave", () => {
      engine.stopRenderLoop();
    });
  }
};
