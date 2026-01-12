import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";

import AppButton from "../../components/ui/AppButton";
// import type { Customer } from "../dashboard/DashboardPage";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (customer: any) => void;
}

export default function AddCustomerDialog({
  open,
  onClose,
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validate = () => {
    let valid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("Name must not be empty");
      valid = false;
    } else {
      setNameError("");
    }

    // Phone validation (optional)
    if (phone) {
      if (!/^\d+$/.test(phone)) {
        setPhoneError("Only numbers are allowed");
        valid = false;
      } else if (phone.length !== 10) {
        setPhoneError("Phone number must be 10 digits");
        valid = false;
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const newCustomer: any = {
      id: crypto.randomUUID(),
      name: name.trim(),
      phone: phone || undefined,
      balance: 0,
    };

    onAdd(newCustomer);
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setNameError("");
    setPhoneError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Customer</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
            autoFocus
            fullWidth
          />

          <TextField
            label="Phone (optional)"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            error={!!phoneError}
            helperText={phoneError}
            inputProps={{ maxLength: 10 }}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <AppButton color="secondary" onClick={handleClose}>
          Cancel
        </AppButton>
        <AppButton onClick={handleAdd}>Add</AppButton>
      </DialogActions>
    </Dialog>
  );
}
