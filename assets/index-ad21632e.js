import{r as p,j as h}from"./index-3231a192.js";import{E as S,S as b,A as E,V as f,M as R,a as g,b as j,T as y}from"./flowGraphConnection-a0a0aac8.js";import{F as U}from"./index-f3941564.js";function L(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,i=>{const n=Math.random()*16|0;return(i==="x"?n:n&3|8).toString(16)})}const M=`precision highp float;\r
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
}`,C=`precision highp float;\r
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
}`,F="/babylon-examples/assets/R-a5638292.jpg",T=i=>{const{id:n=L(),children:c}=i,t=p.useRef(null);return p.useEffect(()=>{var v,u;const e=new S(t.current,!0),r=new b(e),x=new E("Camera",-Math.PI/2,Math.PI/3,8,new f(0,0,0),r);x.setTarget(f.Zero()),x.attachControl(t.current,!0);const o=R.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},r);g.ShadersStore.boxVertexShader=M,g.ShadersStore.boxFragmentShader=C;const s=new j("boxShader",r,{vertex:"box",fragment:"box"},{attributes:["position","uv"],uniforms:["view","projection","time","world","worldViewProjection"],samplers:["textureSampler"]}),w=new y(F,r);s.setTexture("textureSampler",w),s.wireframe=!1,o.material=s;let l=0;return o.material.onBindObservable.add(()=>{var a,m,d;l+=.005,(d=(m=(a=o==null?void 0:o.material)==null?void 0:a.getEffect)==null?void 0:m.call(a))==null||d.setFloat("time",l)}),e.runRenderLoop(()=>{r.render(),r.isReady()&&e.stopRenderLoop()}),(v=t.current)==null||v.addEventListener("mouseenter",()=>{e.runRenderLoop(()=>{r.render()})}),(u=t.current)==null||u.addEventListener("mouseleave",()=>{e.stopRenderLoop()}),window.addEventListener("resize",()=>{e.resize()}),()=>{e.dispose()}},[]),h.jsx(U,{tag:"canvas",id:n,ref:t,children:c})};export{T as default};
