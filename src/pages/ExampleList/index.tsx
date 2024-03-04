import FullBox from "@/components/FullBox";
import { useExamples } from "@/hooks/useExamples";
import { OneFrameContext } from "@/hooks/useOneFrame";
import { Grid, Pagination } from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExampleList = () => {
  const navigate = useNavigate();
  const exampleComponents = useExamples();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const count = Math.ceil(exampleComponents.length / pageSize);

  const currentComponents = useMemo(() => {
    return exampleComponents.slice((page - 1) * pageSize, page * pageSize);
  }, [exampleComponents, page, pageSize]);

  const onPageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const onGridClick = (name: string) => {
    // 跳转详情页
    navigate(`/${name}`);
  };
  return (
    <OneFrameContext.Provider value={true}>
      <FullBox sx={{ px: 4, py: 2 }}>
        <Grid container spacing={2}>
          {currentComponents.map((Component, index) => {
            return (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                height={360}
                sx={{ cursor: "pointer" }}
                onDoubleClick={() => onGridClick(Component.name)}
              >
                <Component.component oneFrame={true}></Component.component>
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={count}
          variant="outlined"
          page={page}
          onChange={onPageChange}
          size="large"
          classes={{ root: "py-6", ul: "justify-center" }}
          shape="rounded"
        />
      </FullBox>
    </OneFrameContext.Provider>
  );
};

export default ExampleList;
