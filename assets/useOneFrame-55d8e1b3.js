import{r as t,j as _,t as b,p as u,v as e}from"./index-f66d5ea3.js";const y=t.forwardRef((o,n)=>{const{tag:s="div",...a}=o;return _.jsx(b,{component:s,width:"100%",height:"100%",ref:n,...a})});function p(o){return Object.entries(o).map(([n,s])=>{const a=n.replace("../examples/","").replace("/index.tsx","").replace("/",":"),r=t.lazy(s);return{name:a,component:r}})}const C=()=>{const{pathname:o}=u(),n=o.split("/")[1]||"babylon",[s,a]=t.useState([]),[r,l]=t.useState([]),[i,m]=t.useState([]);return t.useEffect(()=>{a(p(Object.assign({"../examples/babylon/Basic/index.tsx":()=>e(()=>import("./index-ec45e854.js"),["assets/index-ec45e854.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/meshBuilder-fabf0bf8.js"]),"../examples/babylon/Billboard/index.tsx":()=>e(()=>import("./index-b0fbfd24.js"),["assets/index-b0fbfd24.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/meshBuilder-fabf0bf8.js","assets/splatFileLoader-67433217.js"]),"../examples/babylon/Lightning/index.tsx":()=>e(()=>import("./index-d9edc565.js"),["assets/index-d9edc565.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/meshBuilder-fabf0bf8.js"]),"../examples/babylon/LoadModel/index.tsx":()=>e(()=>import("./index-b7a9363c.js"),["assets/index-b7a9363c.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/splatFileLoader-67433217.js"]),"../examples/babylon/Rain/index.tsx":()=>e(()=>import("./index-83b6bafc.js"),["assets/index-83b6bafc.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/meshBuilder-fabf0bf8.js"]),"../examples/babylon/Start/index.tsx":()=>e(()=>import("./index-7c07cd46.js"),["assets/index-7c07cd46.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css","assets/index-fe6f640a.js","assets/meshBuilder-fabf0bf8.js"])}))),l(p(Object.assign({"../examples/webgpu/Triangle/index.tsx":()=>e(()=>import("./index-9c368c87.js"),["assets/index-9c368c87.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css"])}))),m(p(Object.assign({"../examples/webgl/Triangle/index.tsx":()=>e(()=>import("./index-37a26db3.js"),["assets/index-37a26db3.js","assets/index-f66d5ea3.js","assets/index-bdaf6f10.css"])})))},[]),{babylon:s,webgpu:r,webgl:i}[n]},x=t.createContext(!1),w=()=>t.useContext(x);export{y as F,x as O,w as a,C as u};
