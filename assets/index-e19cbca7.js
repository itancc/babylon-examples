import{r as m,j as x}from"./index-38e990c1.js";import{E as g,S as w,A as h,V as u,m as d,n as S,T as b,r as U}from"./renderLoop-89648f29.js";import{M as j}from"./meshBuilder-e61ae9ed.js";import{F as E}from"./useExamples-14612f59.js";const F=`precision highp float;\r
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
}`,y=`precision highp float;\r
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
}`,C="/babylon-examples/assets/R-a5638292.jpg",R=f=>{const{oneFrame:i=!1}=f,t=m.useRef(null);return m.useEffect(()=>{const o=new g(t.current,!0),e=new w(o),s=new h("Camera",-Math.PI/2,Math.PI/3,8,new u(0,0,0),e);s.setTarget(u.Zero()),s.attachControl(t.current,!0);const r=j.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},e);d.ShadersStore.boxVertexShader=F,d.ShadersStore.boxFragmentShader=y;const a=new S("boxShader",e,{vertex:"box",fragment:"box"},{attributes:["position","uv"],uniforms:["view","projection","time","world","worldViewProjection"],samplers:["textureSampler"]}),p=new b(C,e);a.setTexture("textureSampler",p),a.wireframe=!1,r.material=a;let c=0;return r.material.onBindObservable.add(()=>{var n,l,v;c+=.005,(v=(l=(n=r==null?void 0:r.material)==null?void 0:n.getEffect)==null?void 0:l.call(n))==null||v.setFloat("time",c)}),U({engine:o,scene:e,container:t.current,oneFrame:i}),window.addEventListener("resize",()=>{o.resize()}),()=>{o.dispose()}},[i]),x.jsx(E,{tag:"canvas",ref:t})};export{R as default};
