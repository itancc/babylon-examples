import { Components, Theme } from "@mui/material";
import HarmonyOSSans from "@/assets/fonts/HarmonyOS_Sans_Regular.ttf";

const fontText = `
@font-face {
    font-family: 'HarmonyOSSans';
    src: url(${HarmonyOSSans});
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`;
export default function CssBaseline(): Components<Omit<Theme, "components">> {
  return {
    MuiCssBaseline: {
      styleOverrides: fontText,
    },
  };
}
