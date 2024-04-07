import{r as d,j as s}from"./index-BPyunkCa.js";import{F as f}from"./useOneFrame-BIO5UVYM.js";function x(r,e,n){const t=r.createShader(e);if(r.shaderSource(t,n),r.compileShader(t),r.getShaderParameter(t,r.COMPILE_STATUS))return t;console.log(r.getShaderInfoLog(t)),r.deleteShader(t)}function b(r,e,n){const t=r.createProgram();if(r.attachShader(t,e),r.attachShader(t,n),r.linkProgram(t),r.getProgramParameter(t,r.LINK_STATUS))return t;console.log(r.getProgramInfoLog(t)),r.deleteProgram(t)}function R(r,e){e=e||1;const n=r.clientWidth*e|0,t=r.clientHeight*e|0;return r.width!==n||r.height!==t?(r.width=n,r.height=t,!0):!1}const E=r=>{const e=d.useRef(null),{children:n,onMount:t}=r;return d.useEffect(()=>{const o=e.current,a=o.getContext("webgl2");a&&(a.enable(a.SAMPLES),t==null||t({container:o,gl:a,createShader:x,createProgram:b,resizeCanvasToDisplaySize:R}))}),s.jsxs(f,{position:"relative",children:[s.jsx(f,{tag:"canvas",ref:e}),n]})},P=E,T=`#version 300 es\r
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
}`,_=`#version 300 es\r
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
}`;function B(){const r=({gl:e,createProgram:n,createShader:t,resizeCanvasToDisplaySize:o})=>{const a=t(e,e.VERTEX_SHADER,T),u=t(e,e.FRAGMENT_SHADER,_),i=n(e,a,u),c=e.getAttribLocation(i,"a_position"),p=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,p);const m=[0,0,0,.5,.7,0];e.bufferData(e.ARRAY_BUFFER,new Float32Array(m),e.STATIC_DRAW);const h=e.createVertexArray();e.bindVertexArray(h),e.enableVertexAttribArray(c);const S=2,A=e.FLOAT;e.vertexAttribPointer(c,S,A,!1,0,0),o(e.canvas),e.viewport(0,0,e.canvas.width,e.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(i),e.bindVertexArray(h);const v=e.TRIANGLES;e.drawArrays(v,0,3)};return s.jsx(P,{onMount:r})}export{B as default};
