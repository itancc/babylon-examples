import FullBox from "@/components/FullBox";
import { useExamples } from "@/hooks/useExamples";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExampleList = () => {
  const navigate = useNavigate();
  const exampleComponents = useExamples();

  const onGridClick = (name: string) => {
    // 跳转详情页
    navigate(`/${name}`);
  };
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
              onClick={() => onGridClick(Component.name)}
            >
              <Component.component oneFrame={true}></Component.component>
            </Grid>
          );
        })}
      </Grid>
    </FullBox>
  );
};

export default ExampleList;
