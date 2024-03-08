/// <reference types="vite/client" />
import "@webgpu/types";
import { GPU } from "@webgpu/types";

/** 解决lib.dom.d.ts与 @webgpu/types的冲突问题  */
declare global {
  interface Navigator {
    gpu: GPU;
  }
}
