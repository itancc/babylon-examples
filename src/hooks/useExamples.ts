import {
  JSXElementConstructor,
  LazyExoticComponent,
  lazy,
  useEffect,
  useState,
} from "react";

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
  const [babylonComponents, setBabylonComponents] = useState<
    ExampleComponent[]
  >([]);

  useEffect(() => {
    const babylonModules = import.meta.glob("../examples/**/index.tsx");
    setBabylonComponents(readyComponents(babylonModules));
  }, []);

  return babylonComponents;
};
