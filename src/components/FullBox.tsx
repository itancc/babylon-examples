import { styled } from "@mui/material";

export const Box = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.paper,
}));

export const CanvasBox = styled("canvas")({
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
});
