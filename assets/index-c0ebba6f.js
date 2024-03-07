import{j as a}from"./index-fbf0be82.js";import{B as c,by as f,j as m,bz as u}from"./index-f907f330.js";import{M as v}from"./meshBuilder-1a2bbce2.js";import"./useOneFrame-f065a704.js";const l=`#version 300 es\r
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
}`,y=()=>{const s=i=>{const{scene:r,camera:n}=i;r.createDefaultLight(),f.CreateAsync("rain",r,!0).then(e=>{e.systems[0].updateSpeed=.01,e.start(),r.registerBeforeRender(()=>{for(const o of e.systems)o.emitter.x=n.position.x,o.emitter.y=n.position.y,o.emitter.z=n.position.z})}),v.CreateBox("box",{size:1},r),m.ShadersStore.rainFragmentShader=l;const t=new u("rain post process","rain",["screenSize","sceneSampler","u_time"],null,1,n);t.onApply=function(e){e.setFloat2("screenSize",t.width,t.height),e.setFloat("u_time",performance.now()/1e3),e.setTextureFromPostProcess("sceneSampler",t)}};return a.jsx(c,{onMount:s,children:" "})};export{y as default};
