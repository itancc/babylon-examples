import{r as u,j as p}from"./index-7a5f133a.js";import{E as w,S as g,A as f,V as a,H as L,M as m,a as M,C,G as b,r as x}from"./renderLoop-33e00bb4.js";import{M as c}from"./meshBuilder-43bb173a.js";import{F as A}from"./useExamples-8de662f8.js";const d=()=>{const n=[];n.push(new a(0,0,0));for(let t=1;t<10;t++){const e=(Math.random()-.5)*2,r=(Math.random()-.5)*2;n.push(new a(e,1*t,r))}return n.push(new a(0,10,0)),n},j=n=>{const{oneFrame:i=!1}=n,s=u.useRef(null);return u.useEffect(()=>{const t=new w(s.current,!0),e=new g(t),r=new f("Camera",-Math.PI/2,Math.PI/3,25,new a(0,0,0),e);r.setTarget(new a(0,0,15)),r.attachControl(s.current,!0),c.CreateGround("box",{width:5,height:5,subdivisions:100},e),new L("light",new a(0,1,0),e);const h={path:d(),radius:.02,cap:m.CAP_ALL,updatable:!0};let o=c.CreateTube("bolt",h,e);const l=new M("boltMaterial",e);return l.emissiveColor=new C(44/255,89/255,217/255),o.material=l,new b("boltGlowLayer",e).addIncludedOnlyMesh(o),x({engine:t,scene:e,container:s.current,oneFrame:i},()=>{Math.random()<.01&&(o=c.CreateTube("bolt",{path:d(),radius:.02,cap:m.CAP_ALL,instance:o}))}),window.addEventListener("resize",()=>{t.resize()}),()=>{t.dispose()}},[i]),p.jsx(A,{tag:"canvas",ref:s})};export{j as default};
