import { PropsWithChildren, useRef } from "react";
import FullBox from "../FullBox";
import { useAsyncEffect } from "@/hooks/useAsyncEffect";

const WebGPUScene = ({ children }: PropsWithChildren) => {
  const sceneRef = useRef<HTMLCanvasElement>(null);

  useAsyncEffect(async () => {
    if (!navigator.gpu)
      return console.error("WebGPU is not supported in your browser");
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter!.requestDevice();
    const container = sceneRef.current!;
    const context = container.getContext("webgpu")!;
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
      device,
      format: presentationFormat,
    });
    const module = device.createShaderModule({
      label: "our hardcoded red triangle shaders",
      code: `
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
      `,
    });

    const pipeline = device.createRenderPipeline({
      label: "our hardcoded red triangle pipeline",
      layout: "auto",
      vertex: {
        module,
        entryPoint: "vs",
      },
      fragment: {
        module,
        entryPoint: "fs",
        targets: [{ format: presentationFormat }],
      },
    });

    const renderPassDescriptor = {
      label: "our basic canvas renderPass",
      colorAttachments: [
        {
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
          view: context.getCurrentTexture().createView(),
        },
      ],
    };

    function render() {
      // make a command encoder to start encoding commands
      const encoder = device.createCommandEncoder({ label: "our encoder" });
      const pass = encoder.beginRenderPass(renderPassDescriptor);
      pass.setPipeline(pipeline);
      pass.draw(3); // call our vertex shader 3 times.
      pass.end();

      const commandBuffer = encoder.finish();
      device.queue.submit([commandBuffer]);
    }

    render();
  }, []);
  return (
    <FullBox position="relative">
      <FullBox tag="canvas" ref={sceneRef}></FullBox>
      {children}
    </FullBox>
  );
};

export default WebGPUScene;
