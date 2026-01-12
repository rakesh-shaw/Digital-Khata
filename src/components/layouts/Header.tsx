import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#2563EB" }}>
          Digital Khata
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
