import{r as c,j as a}from"./index-38e990c1.js";import{E as i,S as d,A as l,V as n,H as u,c as p,r as f}from"./renderLoop-89648f29.js";import{F as g}from"./useExamples-14612f59.js";import"./splatFileLoader-3cb5312c.js";const L=m=>{const{oneFrame:s=!1}=m,e=c.useRef(null);return c.useEffect(()=>{const r=new i(e.current,!0),t=new d(r),o=new l("Camera",-Math.PI/2,Math.PI/3,4,new n(0,0,0),t);return o.setTarget(n.Zero()),o.attachControl(e.current,!0),new u("light",new n(0,1,0),t),p.AppendAsync("./models/DamagedHelmet/","DamagedHelmet.gltf",t),f({engine:r,scene:t,container:e.current,oneFrame:s}),window.addEventListener("resize",()=>{r.resize()}),()=>{r.dispose()}},[s]),a.jsx(a.Fragment,{children:a.jsx(g,{tag:"canvas",ref:e})})};export{L as default};