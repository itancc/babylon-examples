import{r as a,j as d}from"./index-3231a192.js";import{E as i,S as c,A as p,V as u,M as f}from"./flowGraphConnection-a0a0aac8.js";import{F as m}from"./index-f3941564.js";const w=()=>{const r=a.useRef(null);return a.useEffect(()=>{var s,o;const e=new i(r.current,!0),t=new c(e),n=new p("Camera",-Math.PI/2,Math.PI/3,8,new u(0,0,0),t);return n.setTarget(u.Zero()),n.attachControl(r.current,!0),f.CreateGround("box",{width:5,height:5,subdivisions:100,updatable:!0},t),e.runRenderLoop(()=>{t.render(),t.isReady()&&e.stopRenderLoop()}),(s=r.current)==null||s.addEventListener("mouseenter",()=>{e.runRenderLoop(()=>{t.render()})}),(o=r.current)==null||o.addEventListener("mouseleave",()=>{e.stopRenderLoop()}),window.addEventListener("resize",()=>{e.resize()}),()=>{e.dispose()}},[]),d.jsx(m,{tag:"canvas",ref:r})};export{w as default};
