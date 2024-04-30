import { logPrefix } from "./constants";

export const createAndLinkProgram = (
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
  attributeLocations?: { [key: string]: number }
) => {
  const vertextShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertextShader, vertexSource);
  gl.compileShader(vertextShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertextShader);
  gl.attachShader(program, fragmentShader);

  if (attributeLocations) {
    for (const attribute in attributeLocations) {
      if (attributeLocations.hasOwnProperty(attribute)) {
        gl.bindAttribLocation(
          program,
          attributeLocations[attribute],
          attribute
        );
      }
    }
  }
  gl.linkProgram(program);
  // 如果program链接成功，不进行检查，可提高性能？
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteShader(vertextShader);
    gl.deleteShader(fragmentShader);
    return program;
  }

  let log = gl.getShaderInfoLog(vertextShader);
  if (log && log.length > 0) {
    console.error(`${logPrefix}vertex shader compile error: ${log}`);
  }
  log = gl.getShaderInfoLog(fragmentShader);
  if (log && log.length > 0) {
    console.error(`${logPrefix}fragment shader compile error: ${log}`);
  }
  log = gl.getProgramInfoLog(program);
  if (log && log.length > 0) {
    console.error(`${logPrefix}program link error: ${log}`);
  }
  gl.deleteShader(vertextShader);
  gl.deleteShader(fragmentShader);
  gl.deleteProgram(program);
};
