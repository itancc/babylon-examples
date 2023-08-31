import{r as v,j as x}from"./index-6648089b.js";import{E as w,S as g,A as h,V as u,M as S,a as f,b,T as j,r as U}from"./renderLoop-8c3222b6.js";import{F as E}from"./useExamples-d6662c4a.js";const F=`precision highp float;\r
attribute vec3 position;\r
attribute vec2 uv;\r
\r
uniform mat4 world;\r
uniform mat4 projection;\r
uniform mat4 view;\r
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
}`,C="/babylon-examples/assets/R-a5638292.jpg",B=d=>{const{oneFrame:i=!1}=d,t=v.useRef(null);return v.useEffect(()=>{const o=new w(t.current,!0),e=new g(o),s=new h("Camera",-Math.PI/2,Math.PI/3,8,new u(0,0,0),e);s.setTarget(u.Zero()),s.attachControl(t.current,!0);const r=S.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},e);f.ShadersStore.boxVertexShader=F,f.ShadersStore.boxFragmentShader=y;const a=new b("boxShader",e,{vertex:"box",fragment:"box"},{attributes:["position","uv"],uniforms:["view","projection","time","world","worldViewProjection"],samplers:["textureSampler"]}),p=new j(C,e);a.setTexture("textureSampler",p),a.wireframe=!1,r.material=a;let c=0;return r.material.onBindObservable.add(()=>{var n,l,m;c+=.005,(m=(l=(n=r==null?void 0:r.material)==null?void 0:n.getEffect)==null?void 0:l.call(n))==null||m.setFloat("time",c)}),U({engine:o,scene:e,container:t.current,oneFrame:i}),window.addEventListener("resize",()=>{o.resize()}),()=>{o.dispose()}},[i]),x.jsx(E,{tag:"canvas",ref:t})};export{B as default};
