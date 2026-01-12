import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2563EB" },
    success: { main: "#16A34A" },
    error: { main: "#DC2626" },
  },
  shape: { borderRadius: 12 },
});

export default theme;
