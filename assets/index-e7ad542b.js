import{r as l,j as a}from"./index-f6844419.js";import{F as d}from"./useOneFrame-74a39d05.js";const g=(n,r)=>{l.useEffect(()=>{const t=n();return()=>{t instanceof Promise?t.then(e=>e&&e()):t&&t()}},r)},x=({children:n})=>{const r=l.useRef(null);return g(async()=>{if(!navigator.gpu)return console.error("WebGPU is not supported in your browser");const e=await(await navigator.gpu.requestAdapter()).requestDevice(),s=r.current.getContext("webgpu"),c=navigator.gpu.getPreferredCanvasFormat();s.configure({device:e,format:c});const i=e.createShaderModule({label:"our hardcoded red triangle shaders",code:`
        @vertex fn vs(
          @builtin(vertex_index) vertexIndex : u32
        ) -> @builtin(position) vec4f {
          let pos = array(
            vec2f( 0.0,  0.5),  // top center
            vec2f(-0.5, -0.5),  // bottom left
            vec2f( 0.5, -0.5)   // bottom right
          );
  
          return vec4f(pos[vertexIndex], 0.0, 1.0);
        }
  
        @fragment fn fs() -> @location(0) vec4f {
          return vec4f(1, 0, 0, 1);
        }
      `}),f=e.createRenderPipeline({label:"our hardcoded red triangle pipeline",layout:"auto",vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:c}]}}),p={label:"our basic canvas renderPass",colorAttachments:[{clearValue:[.3,.3,.3,1],loadOp:"clear",storeOp:"store",view:s.getCurrentTexture().createView()}]};function v(){const u=e.createCommandEncoder({label:"our encoder"}),o=u.beginRenderPass(p);o.setPipeline(f),o.draw(3),o.end();const m=u.finish();e.queue.submit([m])}v()},[]),a.jsxs(d,{position:"relative",children:[a.jsx(d,{tag:"canvas",ref:r}),n]})},b=x;function y(){return a.jsx(b,{})}export{y as default};
