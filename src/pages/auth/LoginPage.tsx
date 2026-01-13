import { Box, Typography, TextField } from "@mui/material";
import AppButton from "../../components/ui/AppButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/animations/PageTransition";

export default function LoginPage() {
  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let valid = true;

    // Shop name validation
    if (!shopName.trim()) {
      setNameError("Shop name must not be empty");
      valid = false;
    } else {
      setNameError("");
    }

    // Phone validation
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!/^\d+$/.test(phone)) {
      setPhoneError("Phone number must contain only digits");
      valid = false;
    } else if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleLogin = () => {
    if (!validate()) return;
    if (shopName === "admin" && phone === "1234567890") {
      navigate("/dashboard");
    } else {
      setPhoneError("Invalid shop name or phone number");
    }
  };

  return (
    <>
    <PageTransition>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: "#f6f5f3",
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
          <Typography
            variant="h5"
            sx={{ color: "#2563EB", fontWeight: 600, textAlign: "center" }}
          >
            Welcome to Digital Khata 🧾
          </Typography>
          <TextField
            label="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
            fullWidth
            autoFocus
          />

          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!phoneError}
            helperText={phoneError}
            fullWidth
            type="tel"
          />

          <AppButton fullWidth onClick={handleLogin}>
            
            Continue
          </AppButton>
        </Box>
      </Box>
    </PageTransition>
    </>
  );
}
