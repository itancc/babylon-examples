import { PropsWithChildren, useEffect, useRef } from "react";
import FullBox from "../FullBox";
import { PrimitiveType } from "./PrimitiveType";
import { createAndLinkProgram } from "./ShaderProgram";
import { resizeCanvasToDisplaySize } from "./Resize";

export interface WebglSceneProps {
  primitiveType?: PrimitiveType;
  offset?: number;
  count: number;
  vertextSource: string;
  fragmentSource: string;
  attributeLocations?: { [key: string]: number };
}
const WebglScene = (props: PropsWithChildren<WebglSceneProps>) => {
  const {
    children,
    primitiveType = PrimitiveType.TRIANGLES,
    offset = 0,
    count,
    vertextSource,
    fragmentSource,
    attributeLocations,
  } = props;
  const sceneRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = sceneRef.current!;
    const gl = container.getContext("webgl2");
    if (!gl) return console.error("Webgl2 is not supported in your browser");
    createAndLinkProgram(gl, vertextSource, fragmentSource, attributeLocations);

    resizeCanvasToDisplaySize(container);
    // vao的处理
    gl.drawArrays(primitiveType, offset, count);
  }, []);
  return (
    <FullBox position="relative">
      <FullBox tag="canvas" ref={sceneRef}></FullBox>
      {children}
    </FullBox>
  );
};
export default WebglScene;
