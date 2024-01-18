import{r as m,j as i}from"./index-b962cb9a.js";import{F as l}from"./useExamples-b7544e13.js";import{E as p,S as d,A as v,V as c,H as x,bD as S,o as g,bE as h,r as C}from"./renderLoop-08bda372.js";import{M as F}from"./meshBuilder-078fd9b0.js";const w=`#version 300 es\r
\r
precision mediump float;\r
\r
in vec2 vUV;\r
uniform float u_time;\r
uniform vec2 screenSize;\r
uniform sampler2D textureSampler;\r
\r
out vec4 FragColor;\r
// 2D随机噪声函数\r
vec2 random2(vec2 st) {\r
    st = vec2(dot(st, vec2(127.1f, 311.7f)), dot(st, vec2(269.5f, 183.3f)));\r
    return -1.0f + 2.0f * fract(sin(st) * 43758.5453123f);\r
}\r
\r
// 2D噪声函数\r
float noise(vec2 st) {\r
    vec2 i = floor(st);\r
    vec2 f = fract(st);\r
\r
    vec2 u = f * f * (3.0f - 2.0f * f);\r
\r
    return mix(mix(dot(random2(i + vec2(0.0f, 0.0f)), f - vec2(0.0f, 0.0f)), dot(random2(i + vec2(1.0f, 0.0f)), f - vec2(1.0f, 0.0f)), u.x), mix(dot(random2(i + vec2(0.0f, 1.0f)), f - vec2(0.0f, 1.0f)), dot(random2(i + vec2(1.0f, 1.0f)), f - vec2(1.0f, 1.0f)), u.x), u.y);\r
}\r
\r
void main() {\r
    vec2 st = gl_FragCoord.xy / screenSize.xy;\r
    vec4 baseColor = texture(textureSampler, vUV);\r
    st.x *= screenSize.x / screenSize.y;\r
    float n = noise(st - u_time);\r
    FragColor = baseColor + vec4(vec3(n), 0.0f);\r
}`,R=u=>{const{oneFrame:f=!1}=u,s=m.useRef(null);return m.useEffect(()=>{const t=new p(s.current,!0);console.log(t.getCaps().supportComputeShaders);const r=new d(t),n=new v("Camera",-Math.PI/2,Math.PI/3,4,new c(0,0,0),r);n.setTarget(c.Zero()),n.attachControl(s.current,!0),new x("light",new c(0,1,0),r),S.CreateAsync("rain",r,!0).then(e=>{e.systems[0].updateSpeed=.01,e.start(),r.registerBeforeRender(()=>{for(const a of e.systems)a.emitter.x=n.position.x,a.emitter.y=n.position.y,a.emitter.z=n.position.z})}),F.CreateBox("box",{size:1},r),g.ShadersStore.rainFragmentShader=w;const o=new h("rain post process","rain",["screenSize","sceneSampler","u_time"],null,1,n);return o.onApply=function(e){e.setFloat2("screenSize",o.width,o.height),e.setFloat("u_time",performance.now()/1e3),e.setTextureFromPostProcess("sceneSampler",o)},window.addEventListener("resize",()=>{t.resize()}),C({engine:t,scene:r,container:s.current,oneFrame:f}),()=>{t.dispose()}},[f]),i.jsx(i.Fragment,{children:i.jsx(l,{tag:"canvas",ref:s})})};export{R as default};
