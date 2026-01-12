import { Box, Typography, TextField } from "@mui/material";
import AppButton from "../../components/ui/AppButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/animations/PageTransition";

export default function LoginPage() {
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (shopName && phone) {
      navigate("/dashboard");
    } else {
      alert("Please enter both fields");
    }
  };

  return (
    <PageTransition>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "#F3F4F6",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: "#2563EB", fontWeight: 600, textAlign: "center" }}>
            Welcome to Digital Khata
          </Typography>

          <TextField
            label="Shop Name"
            variant="outlined"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            type="tel"
          />

          <AppButton fullWidth onClick={handleLogin}>
            Continue
          </AppButton>
        </Box>
      </Box>
    </PageTransition>
  );
}
