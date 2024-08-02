import{j as s}from"./index-Blp4GZFy.js";import{B as f,b as c,M as u,E as n,c as m,a as v,V as o}from"./index-B_n6poPi.js";import{M as d}from"./meshBuilder-BU1imhMT.js";import"./useOneFrame-C5PZoj1R.js";const p=`#version 300 es\r
\r
precision highp float;\r
\r
in vec3 position;\r
in vec2 uv;\r
\r
uniform mat4 worldViewProjection;\r
\r
out vec2 vUv;\r
void main() {\r
    vec4 p = vec4(position, 1.f);\r
    vUv = uv;\r
    gl_Position = worldViewProjection * p;\r
}`,w=`#version 300 es\r
precision mediump float;\r
\r
uniform vec3 u_color; // 虚线的颜色\r
uniform float u_time; // 时间\r
in vec2 vUv;\r
out vec4 FragColor;\r
\r
void main() {\r
    vec2 st = vUv;\r
    //fract函数返回了st.y + u_time的小数部分，step函数则检查这个值是否大于0.1，如果是，返回1，否则返回0。这样，line的值就在0和1之间变化，形成了一种类似于虚线的效果\r
    // 0.5f是阈值，可以调整虚线的密度, 5.0f是频率，可以调整虚线的宽度, 1.4f是速度，可以调整虚线的移动速度\r
    float line = step(0.5f, fract(5.0f * st.y + 1.4f * u_time));\r
    //mix函数根据line的值在两个颜色之间进行插值。如果line的值为1，那么颜色就是u_color，否则颜色就是vec4(0.16f, 0.28f, 0.39f, 0.05f)。\r
    vec4 color = mix(vec4(0.16f, 0.28f, 0.39f, 0.4f), vec4(u_color, 1.0f), line);\r
    FragColor = color;\r
}`,S=()=>{const t=({scene:r,camera:i})=>{i.radius=30,r.createDefaultLight();const a=[new o(23,0,0),new o(0,1,.1),new o(-4,20,.2)];r.clearColor=new c(0,0,0,1);const l=d.CreateTube("tube",{path:a,radius:.5,sideOrientation:u.DOUBLESIDE},r);n.ShadersStore.flowFragmentShader=w,n.ShadersStore.flowVertexShader=p;const e=new m("flowMaterial",r,"flow",{attributes:["position","uv"],uniforms:["worldViewProjection","u_time","u_color"],samplers:["u_texture"],needAlphaBlending:!0,needAlphaTesting:!0});l.material=e,e.onBindObservable.add(()=>{e.setFloat("u_time",performance.now()/1e3),e.setColor3("u_color",new v(.37,.62,.93))})};return s.jsx(f,{onMount:t})};export{S as default};
