import { Components, Theme } from "@mui/material";
import HarmonyOSSans from "@/assets/fonts/HarmonyOS_Sans_Regular.ttf";

export default function CssBaseline(): Components<Omit<Theme, "components">> {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        // body: {
        //   scrollbarColor: "#6b6b6b #2b2b2b",
        //   "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        //     width: "10px",
        //     height: "10px",
        //   },
        //   "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
        //     borderRadius: "10px",
        //     backgroundColor: "rgba(120, 120, 120, 0.8)",
        //     backgroundClip: "padding-box",
        //     border: "2px solid transparent",
        //   },
        //   "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
        //     borderRadius: "10px",
        //     backgroundColor: "rgba(120,120,120,0.3)",
        //     backgroundClip: "padding-box",
        //     border: "2px solid transparent",
        //   },
        //   "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
        //     {
        //       backgroundColor: "rgba(120, 120, 120, 1.0)",
        //     },
        //   "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
        //     {
        //       backgroundColor: "rgba(120, 120, 120, 0.4)",
        //     },
        //   "&::-webkit-scrollbar-track:hover, & *::-webkit-scrollbar-track:hover":
        //     {
        //       backgroundColor: "rgba(120, 120, 120, 0.4)",
        //     },
        //   "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
        //     backgroundColor: "rgba(120, 120, 120, 0.7)",
        //   },
        // },
        "@font-face": {
          fontFamily: "HarmonyOSSans",
          src: `url(${HarmonyOSSans})`,
          fontWeight: "normal",
          fontStyle: "normal",
          fontDisplay: "swap",
        },
      },
    },
  };
}
