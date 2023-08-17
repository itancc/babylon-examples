import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { PropsWithChildren, createContext, useMemo, useState } from "react";

import HarmonyOSSans from "@/assets/fonts/HarmonyOS_Sans_Regular.ttf";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ThemeCustomization = ({ children }: PropsWithChildren) => {
  // 系统偏好设置
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "SmileySans",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'SmileySans';
                    src: url(${HarmonyOSSans}) format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
            `,
          },
        },
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
