import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";

interface FullBoxProps extends BoxProps {
  tag?: keyof JSX.IntrinsicElements;
}
const FullBox = forwardRef((props: FullBoxProps, ref) => {
  const { tag = "div", ...restProps } = props;
  return (
    <Box
      component={tag}
      width="100%"
      height="100%"
      ref={ref}
      {...restProps}
    ></Box>
  );
});
export default FullBox;
