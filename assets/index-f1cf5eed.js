import{j as m}from"./index-271e146f.js";import{B as u,j as s,k as x,T as p}from"./index-8bb976bb.js";import{M as d}from"./meshBuilder-ba7f043c.js";import"./useOneFrame-8fa37e87.js";const f=`precision highp float;\r
attribute vec3 position;\r
attribute vec2 uv;\r
\r
uniform mat4 worldViewProjection;\r
uniform float time;\r
\r
varying vec2 vUv;\r
\r
void main() {\r
    vec3 v = position;\r
    v.y = v.y += sin(v.x * 4.0 + time * 3.0) * 0.2;\r
    gl_Position = worldViewProjection * vec4(v, 1.0);\r
\r
    vUv = uv;\r
}`,g=`precision highp float;\r
uniform float time;\r
uniform sampler2D textureSampler;\r
varying vec2 vUv;\r
vec3 colorA = vec3(0.912, 0.191, 0.652);\r
vec3 colorB = vec3(1.000, 0.777, 0.052);\r
void main() {\r
  vec3 color = mix(colorA, colorB, vUv.x);\r
  vec4 colorUv = texture2D(textureSampler, vUv);\r
  gl_FragColor = vec4(colorUv.x, colorUv.y, colorUv.z, 1.0);\r
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\r
}`,b="/babylon-examples/assets/R-a5638292.jpg",U=()=>{const v=c=>{const{scene:o}=c,r=d.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},o);s.ShadersStore.boxVertexShader=f,s.ShadersStore.boxFragmentShader=g;const t=new x("boxShader",o,{vertex:"box",fragment:"box"},{attributes:["position","uv"],uniforms:["view","projection","time","world","worldViewProjection"],samplers:["textureSampler"]}),l=new p(b,o);t.setTexture("textureSampler",l),t.wireframe=!1,r.material=t;let n=0;r.material.onBindObservable.add(()=>{var e,a,i;n+=.01,(i=(a=(e=r==null?void 0:r.material)==null?void 0:e.getEffect)==null?void 0:a.call(e))==null||i.setFloat("time",n)})};return m.jsx(u,{onMount:v})};export{U as default};
