import{j as m}from"./index-BW5Jh9XW.js";import{B as u,E as s,c as x,T as p}from"./BScene-CgPBqGcX.js";import{M as d}from"./meshBuilder-CEo-uAEu.js";import"./useOneFrame-Bz6Quxjr.js";const f=`precision highp float;\r
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
}`,S="/babylon-examples/assets/R-Coye8kRe.jpg",j=()=>{const c=v=>{const{scene:o}=v,r=d.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},o);s.ShadersStore.boxVertexShader=f,s.ShadersStore.boxFragmentShader=g;const t=new x("boxShader",o,{vertex:"box",fragment:"box"},{attributes:["position","uv"],uniforms:["view","projection","time","world","worldViewProjection"],samplers:["textureSampler"]}),l=new p(S,o);t.setTexture("textureSampler",l),t.wireframe=!1,r.material=t;let n=0;r.material.onBindObservable.add(()=>{var e,i,a;n+=.01,(a=(i=(e=r==null?void 0:r.material)==null?void 0:e.getEffect)==null?void 0:i.call(e))==null||a.setFloat("time",n)})};return m.jsx(u,{onMount:c})};export{j as default};