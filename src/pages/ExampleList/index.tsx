import FillBox from "@/components/FillBox";
import { Grid } from "@mui/material";
import {
  ComponentType,
  LazyExoticComponent,
  lazy,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [exampleComponents, setExampleComponents] = useState<
    LazyExoticComponent<ComponentType>[]
  >([]);

  useEffect(() => {
    const components = getExampleComponents();
    setExampleComponents(components);
  }, []);

  const onGridClick = () => {
    // 跳转详情页
    navigate("/example-detail/start");
  };
  return (
    <FillBox sx={{ p: 3 }}>
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
              onClick={onGridClick}
            >
              <Component></Component>
            </Grid>
          );
        })}
      </Grid>
    </FillBox>
  );
};

export default ExampleList;
