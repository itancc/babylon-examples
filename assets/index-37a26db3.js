import{r as d,j as s}from"./index-f66d5ea3.js";import{F as f}from"./useOneFrame-55d8e1b3.js";function E(r,e,n){const t=r.createShader(e);if(r.shaderSource(t,n),r.compileShader(t),r.getShaderParameter(t,r.COMPILE_STATUS))return t;console.log(r.getShaderInfoLog(t)),r.deleteShader(t)}function P(r,e,n){const t=r.createProgram();if(r.attachShader(t,e),r.attachShader(t,n),r.linkProgram(t),r.getProgramParameter(t,r.LINK_STATUS))return t;console.log(r.getProgramInfoLog(t)),r.deleteProgram(t)}function T(r,e){e=e||1;const n=r.clientWidth*e|0,t=r.clientHeight*e|0;return r.width!==n||r.height!==t?(r.width=n,r.height=t,!0):!1}const _=r=>{const e=d.useRef(null),{children:n,onMount:t}=r;return d.useEffect(()=>{const o=e.current,a=o.getContext("webgl2");a&&(a.enable(a.SAMPLES),t==null||t({container:o,gl:a,createShader:E,createProgram:P,resizeCanvasToDisplaySize:T}))}),s.jsxs(f,{position:"relative",children:[s.jsx(f,{tag:"canvas",ref:e}),n]})},F=_,w=`#version 300 es\r
\r
// an attribute is an input (in) to a vertex shader.\r
// It will receive data from a buffer\r
in vec4 a_position;\r
\r
// all shaders have a main function\r
void main() {\r
\r
  // gl_Position is a special variable a vertex shader\r
  // is responsible for setting\r
    gl_Position = a_position;\r
}`,L=`#version 300 es\r
\r
// fragment shaders don't have a default precision so we need\r
// to pick one. highp is a good default. It means "high precision"\r
precision highp float;\r
\r
// we need to declare an output for the fragment shader\r
out vec4 outColor;\r
\r
void main() {\r
  // Just set the output to a constant redish-purple\r
    outColor = vec4(1, 0, 0.5f, 1);\r
}`;function B(){const r=({gl:e,createProgram:n,createShader:t,resizeCanvasToDisplaySize:o})=>{const a=t(e,e.VERTEX_SHADER,w),u=t(e,e.FRAGMENT_SHADER,L),i=n(e,a,u),c=e.getAttribLocation(i,"a_position"),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p);const m=[0,0,0,.5,.7,0];e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const h=e.createVertexArray();e.bindVertexArray(h),e.enableVertexAttribArray(c);const S=2,A=e.FLOAT,v=!1,x=0,b=0;e.vertexAttribPointer(c,S,A,v,x,b),o(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(i),e.bindVertexArray(h);const R=e.TRIANGLES;e.drawArrays(R,0,3)};return s.jsx(F,{onMount:r})}export{B as default};
