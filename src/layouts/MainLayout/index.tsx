import { Outlet } from "react-router-dom";
import { Box, CssBaseline, styled } from "@mui/material";
import Header from "./Header";

const Main = styled("main")(({ theme }) => ({
  marginTop: "64px",
  height: "calc(100vh - 64px)",
  width: "100%",
  overflow: "auto",
  [theme.breakpoints.down("sm")]: {
    marginTop: "56px",
    height: "calc(100vh - 56px)",
  },
}));

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header */}
      <Header></Header>
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
