import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { PropsWithChildren, createContext, useMemo, useState } from "react";

import ComponentOverrides from "./overrides";

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
          fontFamily: "HarmonyOSSans",
        },
        components: ComponentOverrides(),
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
          <CssBaseline enableColorScheme={true}></CssBaseline>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeCustomization;
