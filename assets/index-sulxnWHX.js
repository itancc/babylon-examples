import{j as l}from"./index-BW5Jh9XW.js";import{B as u,E as a,c as d}from"./BScene-CgPBqGcX.js";import{M as f}from"./meshBuilder-CEo-uAEu.js";import"./useOneFrame-Bz6Quxjr.js";const v=`#version 300 es\r
\r
precision mediump float;\r
in vec3 position;\r
\r
uniform mat4 worldViewProjection;\r
\r
void main() {\r
    \r
    // 什么密度\r
    gl_Position = worldViewProjection * vec4(position, 1.0f);\r
\r
}`,p=`#version 300 es\r
\r
precision mediump float;\r
\r
uniform vec3 cameraDirection;\r
uniform vec3 cameraPosition;\r
\r
out vec4 fragColor;\r
\r
void main() {\r
    fragColor = vec4(cameraDirection + cameraPosition, 1.0f);\r
}`;function P(){const c=s=>{const{scene:r}=s;r.createDefaultLight();const m=f.CreateBox("cloudBox",{size:2},r);a.ShadersStore.volumetricCloudVertexShader=v,a.ShadersStore.volumetricCloudFragmentShader=p;const e=new d("volumetricCloudMaterial",r,"volumetricCloud",{attributes:["position"],uniforms:["worldViewProjection","cameraPosition","cameraDirection"],needAlphaBlending:!0,needAlphaTesting:!0});m.material=e,r.registerBeforeRender(()=>{var t,n;const o=(t=r.activeCamera)==null?void 0:t.position,i=(n=r.activeCamera)==null?void 0:n.getForwardRay().direction;!o||!i||(e.setVector3("cameraPosition",o),e.setVector3("cameraDirection",i))})};return l.jsx(u,{onMount:c})}export{P as default};
