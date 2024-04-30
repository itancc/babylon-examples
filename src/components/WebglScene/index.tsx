import { PropsWithChildren, useEffect, useRef } from "react";
import FullBox from "../FullBox";
import { PrimitiveType } from "./PrimitiveType";
export interface WebglSceneActor {
  container: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  createShader: (
    gl: WebGL2RenderingContext,
    type: number,
    source: string
  ) => WebGLShader | undefined;
  createProgram: (
    gl: WebGL2RenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ) => WebGLProgram | undefined;
  resizeCanvasToDisplaySize: (
    canvas: HTMLCanvasElement,
    multiplier?: number
  ) => boolean;
}
export interface WebglSceneProps {
  /** 挂载完成 */
  onMount?: (actor: WebglSceneActor) => void;
  /** 自定义render方法 */
  onRender?: (actor: WebglSceneActor) => void;
  /** 挂载结束 */
  onUnmount?: (actor: WebglSceneActor) => void;
}

function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  multiplier?: number
) {
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

const WebglScene = (props: PropsWithChildren<WebglSceneProps>) => {
  const sceneRef = useRef<HTMLCanvasElement>(null);
  const { children, onMount } = props;
  useEffect(() => {
    const container = sceneRef.current!;
    const gl = container.getContext("webgl2");
    if (!gl) return;

    onMount?.({
      container,
      gl,
      createShader,
      createProgram,
      resizeCanvasToDisplaySize,
    });
  });
  return (
    <FullBox position="relative">
      <FullBox tag="canvas" ref={sceneRef}></FullBox>
      {children}
    </FullBox>
  );
};

export default WebglScene;
