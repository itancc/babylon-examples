import FullBox from "@/components/FullBox";
import { Grid } from "@mui/material";
import {
  ComponentType,
  LazyExoticComponent,
  lazy,
  useEffect,
  useState,
} from "react";

/** 根据路径自动生成异步组件 */
const getExampleComponents = () => {
  const exampleModules = import.meta.glob("../../examples/**/index.tsx");
  const exampleComponents = Object.entries(exampleModules).map(
    ([path, loader]) => {
      console.log(path, loader);
      return lazy(loader as () => Promise<{ default: ComponentType }>);
    }
  );
  return exampleComponents;
};

const ExampleList = () => {
  const [exampleComponents, setExampleComponents] = useState<
    LazyExoticComponent<ComponentType>[]
  >([]);

  useEffect(() => {
    const components = getExampleComponents();
    setExampleComponents(components);
  }, []);

  return (
    <FullBox sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {exampleComponents.map((Component, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              lg={3}
              height={300}
              sx={{ cursor: "pointer" }}
            >
              <Component></Component>
            </Grid>
          );
        })}
      </Grid>
    </FullBox>
  );
};

export default ExampleList;
