import{j as l}from"./index-BPyunkCa.js";import{B as c,M as f,E as n,b as u,a as m,V as e}from"./index-BwvpWiVZ.js";import{M as v}from"./meshBuilder-DHje3-WW.js";import"./useOneFrame-BIO5UVYM.js";const w=`#version 300 es\r
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
}`,d=`#version 300 es\r
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
    float line = step(0.5f, fract(5.0f * st.y + 1.4f * u_time));\r
    //mix函数根据line的值在两个颜色之间进行插值。如果line的值为1，那么颜色就是u_color，否则颜色就是vec4(0.16f, 0.28f, 0.39f, 0.05f)。\r
    vec4 color = mix(vec4(0.16f, 0.28f, 0.39f, 0.05f), vec4(u_color, 1.0f), line);\r
    FragColor = color;\r
}`,b=()=>{const t=({scene:o,camera:i})=>{i.radius=30,o.createDefaultLight();const a=[new e(23,0,0),new e(0,1,.1),new e(-4,20,.2)],s=v.CreateTube("tube",{path:a,radius:.5,sideOrientation:f.DOUBLESIDE},o);n.ShadersStore.flowFragmentShader=d,n.ShadersStore.flowVertexShader=w;const r=new u("flowMaterial",o,"flow",{attributes:["position","uv"],uniforms:["worldViewProjection","u_time","u_color"]});s.material=r,r.onBindObservable.add(()=>{r.setFloat("u_time",performance.now()/1e3),r.setColor3("u_color",new m(.37,.62,.93))})};return l.jsx(c,{onMount:t})};export{b as default};
