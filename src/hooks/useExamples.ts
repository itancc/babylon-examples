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
export const useExamples = () => {
  const [components, setComponents] = useState<ExampleComponent[]>([]);
  useEffect(() => {
    const exampleModules = import.meta.glob("../examples/**/index.tsx");
    const exampleComponents = Object.entries(exampleModules).map(
      ([path, loader]) => {
        // 提取出组件名称
        const name = path.replace("../examples/", "").replace("/index.tsx", "");
        const component = lazy(
          loader as () => Promise<{
            default: JSXElementConstructor<ExampleCommonProps>;
          }>
        );
        return { name, component };
      }
    );

    setComponents(exampleComponents);
  }, []);

  return components;
};
