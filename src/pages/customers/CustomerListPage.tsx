import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AppCard from "../../components/ui/AppCard";
import AppButton from "../../components/ui/AppButton";
import AppDialog from "../../components/ui/AppDialog";
import PageTransition from "../../components/animations/PageTransition";

const initialCustomers = [
  { name: "Ramesh Kumar", due: 1200, type: "due" as "due" | "advance" },
  { name: "Suresh Patel", due: 850, type: "advance" as "due" | "advance" },
  { name: "Anita Sharma", due: 450, type: "due" as "due" | "advance" },
  { name: "Sunita Verma", due: 950, type: "due" as "due" | "advance" },
];

export default function CustomerListPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);

  const handleOpenDialog = (customerName: string) => {
    setSelectedCustomer(customerName);
    setCreditAmount(0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
  };

  const handleAddCredit = () => {
    if (!selectedCustomer || creditAmount <= 0) return;

    setCustomers(prev =>
      prev.map(c =>
        c.name === selectedCustomer
          ? { ...c, due: c.due - creditAmount }
          : c
      )
    );

    handleCloseDialog();
  };

  return (
    <PageTransition>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ mb: 3, color: "#2563EB", fontWeight: 600 }}>
          Customers
        </Typography>

        <Box>
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <AppCard
                clickable
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                  borderLeft: `6px solid ${customer.type === "due" ? "#FF7F50" : "#4CAF50"}`,
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3, transition: "all 0.3s" },
                }}
              >
                <Typography>
                  {customer.type === "due"
                    ? `Due from ${customer.name}`
                    : `Advance to ${customer.name}`}: <strong>₹{customer.due}</strong>
                </Typography>
                <AppButton
                  size="small"
                  color="success"
                  onClick={() => handleOpenDialog(customer.name)}
                >
                  Add Credit
                </AppButton>
              </AppCard>
            </motion.div>
          ))}
        </Box>

        {/* Add Credit Modal */}
        <AppDialog
          open={openDialog}
          title={`Add Credit / Adjust Amount`}
          onClose={handleCloseDialog}
          actions={
            <>
              <AppButton color="secondary" onClick={handleCloseDialog}>
                Cancel
              </AppButton>
              <AppButton color="primary" onClick={handleAddCredit}>
                Submit
              </AppButton>
            </>
          }
        >
          <Typography sx={{ mb: 1 }}>
            {selectedCustomer
              ? `Enter amount for ${
                  customers.find(c => c.name === selectedCustomer)?.type === "due"
                    ? "collection from"
                    : "advance to"
                } ${selectedCustomer}`
              : ""}
          </Typography>
          <input
            type="number"
            value={creditAmount}
            onChange={e => setCreditAmount(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </AppDialog>
      </Box>
    </PageTransition>
  );
}
