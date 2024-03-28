import {
  JSXElementConstructor,
  LazyExoticComponent,
  lazy,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

export interface ExampleComponent {
  name: string;
  component: LazyExoticComponent<JSXElementConstructor<ExampleCommonProps>>;
}
export interface ExampleCommonProps {
  oneFrame?: boolean;
}

function readyComponents(modules: Record<string, () => Promise<unknown>>) {
  return Object.entries(modules).map(([path, loader]) => {
    // 提取出组件名称
    const name = path
      .replace("../examples/", "")
      .replace("/index.tsx", "")
      .replace("/", ":");
    const component = lazy(
      loader as () => Promise<{
        default: JSXElementConstructor<ExampleCommonProps>;
      }>
    );
    return { name, component };
  });
}

export const useExamples = () => {
  const { pathname } = useLocation();
  const routeName = pathname.split("/")[1] || "babylon";
  const [babylonComponents, setBabylonComponents] = useState<
    ExampleComponent[]
  >([]);
  const [webgpuComponents, setWebgpuComponents] = useState<ExampleComponent[]>(
    []
  );
  const [webglComponents, setWebglComponents] = useState<ExampleComponent[]>(
    []
  );

  useEffect(() => {
    const babylonModules = import.meta.glob("../examples/babylon/**/index.tsx");
    setBabylonComponents(readyComponents(babylonModules));

    const webgpuModules = import.meta.glob("../examples/webgpu/**/index.tsx");
    setWebgpuComponents(readyComponents(webgpuModules));

    const webglComponents = import.meta.glob("../examples/webgl/**/index.tsx");
    setWebglComponents(readyComponents(webglComponents));
  }, []);

  const routeComponents = {
    babylon: babylonComponents,
    webgpu: webgpuComponents,
    webgl: webglComponents,
  } as const;

  return routeComponents[routeName as keyof typeof routeComponents];
};
