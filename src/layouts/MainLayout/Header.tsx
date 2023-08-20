import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useContext } from "react";
import { ColorModeContext } from "@/themes";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const onThemeChange = () => {
    colorMode.toggleColorMode();
  };
  return (
    <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography variant="h6">Babylon Examples</Typography>
          <TextField
            size="small"
            placeholder="搜索"
            sx={{ marginLeft: 4 }}
          ></TextField>
        </Box>
        {/* 暗黑模式 */}
        <IconButton sx={{ ml: 1 }} onClick={onThemeChange} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
